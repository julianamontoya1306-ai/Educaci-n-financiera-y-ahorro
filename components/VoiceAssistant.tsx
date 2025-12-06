import React, { useRef, useState, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { VOICE_MODEL_NAME, VOICE_SYSTEM_INSTRUCTION } from '../constants';
import { createBlob, decode, decodeAudioData } from '../utils/audioUtils';

export const VoiceAssistant: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTalking, setIsTalking] = useState(false); // Visual indicator for model speaking
  
  // Refs for audio handling to avoid re-renders
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<Promise<any> | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (scriptProcessorRef.current) {
        scriptProcessorRef.current.disconnect();
        scriptProcessorRef.current = null;
    }
    if (inputAudioContextRef.current) {
      inputAudioContextRef.current.close();
      inputAudioContextRef.current = null;
    }
    if (outputAudioContextRef.current) {
      outputAudioContextRef.current.close();
      outputAudioContextRef.current = null;
    }
    // Stop all playing sources
    sourcesRef.current.forEach(source => {
      try { source.stop(); } catch(e) {}
    });
    sourcesRef.current.clear();
    
    sessionRef.current = null;
    setIsConnected(false);
    setIsTalking(false);
  };

  useEffect(() => {
    return () => cleanup();
  }, []);

  const startCall = async () => {
    setError(null);
    nextStartTimeRef.current = 0; // Reset timing cursor
    
    try {
      // Initialize Audio Contexts
      // Intentamos 16kHz, pero si el navegador fuerza 48kHz, lo detectaremos después
      inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      // Ensure contexts are running (vital for some browsers)
      if (inputAudioContextRef.current.state === 'suspended') {
        await inputAudioContextRef.current.resume();
      }
      if (outputAudioContextRef.current.state === 'suspended') {
        await outputAudioContextRef.current.resume();
      }

      const inputCtx = inputAudioContextRef.current;
      const outputCtx = outputAudioContextRef.current;
      const outputNode = outputCtx.createGain();
      outputNode.connect(outputCtx.destination);

      // Get Microphone Access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      /* 
      ========================================================================
      API KEY CONFIGURADA
      ========================================================================
      */
      const API_KEY = "AIzaSyAxeadxQfVwn0JgAmK1Dik6xc_I3YuYazM"; 
      /* ======================================================================== */

      const ai = new GoogleGenAI({ apiKey: API_KEY });

      // Connect to Gemini Live
      const sessionPromise = ai.live.connect({
        model: VOICE_MODEL_NAME,
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }, // Kore is usually female/soft
          },
          systemInstruction: VOICE_SYSTEM_INSTRUCTION,
        },
        callbacks: {
          onopen: () => {
            console.log('Voice session opened');
            setIsConnected(true);
            
            // Setup Input Processing (Mic -> Model)
            const source = inputCtx.createMediaStreamSource(stream);
            
            // ScriptProcessor para capturar audio crudo
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessorRef.current = scriptProcessor;
            
            // GainNode con ganancia 0 para evitar feedback (eco)
            // Conectamos: Mic -> ScriptProcessor -> SilenceNode -> Speakers
            // El ScriptProcessor necesita estar conectado a un destino para funcionar, pero no queremos oírnos a nosotros mismos.
            const silenceNode = inputCtx.createGain();
            silenceNode.gain.value = 0;

            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              
              // IMPORTANTE: Pasamos el sampleRate REAL del contexto. 
              // Si el navegador usa 48000Hz, le decimos a Gemini que es 48000Hz.
              const pcmBlob = createBlob(inputData, inputCtx.sampleRate);
              
              // Send audio chunk
              if (sessionRef.current) {
                sessionRef.current.then((session) => {
                  session.sendRealtimeInput({ media: pcmBlob });
                });
              }
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(silenceNode);
            silenceNode.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Handle Audio Output (Model -> Speakers)
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            
            if (base64Audio) {
              setIsTalking(true);
              nextStartTimeRef.current = Math.max(
                nextStartTimeRef.current,
                outputCtx.currentTime
              );

              const audioBuffer = await decodeAudioData(
                decode(base64Audio),
                outputCtx,
                24000,
                1
              );

              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputNode);
              
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
                // Simple check: if no sources playing, stop animation
                if (sourcesRef.current.size === 0) {
                    setIsTalking(false);
                }
              });

              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            // Handle Interruption
            const interrupted = message.serverContent?.interrupted;
            if (interrupted) {
              console.log('Model interrupted');
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setIsTalking(false);
            }
          },
          onclose: () => {
            console.log('Voice session closed');
            cleanup();
          },
          onerror: (e) => {
            console.error('Voice session error', e);
            setError('Error en la conexión de voz. Verifica tu conexión a internet.');
            cleanup();
          }
        }
      });

      sessionRef.current = sessionPromise;

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al iniciar la llamada.");
      cleanup();
    }
  };

  const endCall = () => {
    cleanup();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center space-y-8 animate-in fade-in duration-500">
      <div className="relative">
        <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isConnected ? 'bg-indigo-100' : 'bg-slate-100'}`}>
           {/* Pulsing Effect */}
           {isConnected && (
            <div className={`absolute inset-0 rounded-full border-4 border-indigo-400 opacity-20 ${isTalking ? 'animate-ping' : ''}`}></div>
           )}
           <div className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300 ${isConnected ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-slate-300'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
           </div>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-800">
          {isConnected ? 'Hablando con Manuela' : 'Llamada con Manuela'}
        </h3>
        <p className="text-slate-500 mt-2 max-w-md mx-auto">
          {isConnected 
            ? 'Escuchando... Háblale de tus planes de ahorro o deudas.' 
            : 'Conecta con nuestra asesora paisa IA para una conversación natural en tiempo real.'}
        </p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
          {error}
        </div>
      )}

      {!isConnected ? (
        <button
          onClick={startCall}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold shadow-lg transition transform hover:-translate-y-1 hover:shadow-xl flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Iniciar Llamada
        </button>
      ) : (
        <button
          onClick={endCall}
          className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold shadow-lg transition transform hover:-translate-y-1"
        >
          Terminar Llamada
        </button>
      )}
    </div>
  );
};