import React, { useState } from 'react';
import { ViewState } from './types';
import { SavingsCalculator } from './components/SavingsCalculator';
import { ChatAssistant } from './components/ChatAssistant';
import { EducationSection } from './components/EducationSection';
import { VoiceAssistant } from './components/VoiceAssistant';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.CALCULATOR:
        return <SavingsCalculator />;
      case ViewState.CHAT:
        return (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Asistente Virtual Financiero</h2>
            <ChatAssistant />
          </div>
        );
      case ViewState.VOICE:
        return (
           <div className="max-w-2xl mx-auto py-10">
              <VoiceAssistant />
           </div>
        );
      case ViewState.LEARN:
        return (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Centro de Aprendizaje</h2>
                <p className="text-slate-600">Domina tus finanzas personales con estos conceptos clave para adquirir tu vivienda.</p>
            </div>
            <EducationSection />
          </div>
        );
      case ViewState.HOME:
      default:
        return (
          <div className="space-y-12">
            {/* Hero Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-100 rounded-full opacity-50 blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-emerald-100 rounded-full opacity-50 blur-2xl"></div>
                
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                    Tu sueño de tener <span className="text-blue-600">casa propia</span> <br/> comienza con un plan.
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                    Aprende a gestionar tu dinero, calcula tu capacidad de ahorro y recibe asesoría experta con inteligencia artificial.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <button 
                        onClick={() => setCurrentView(ViewState.CALCULATOR)}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:-translate-y-1"
                    >
                        Calcular Ahorro
                    </button>
                    <button 
                        onClick={() => setCurrentView(ViewState.VOICE)}
                        className="px-8 py-3 bg-white text-slate-700 border border-slate-300 font-semibold rounded-lg hover:bg-slate-50 transition flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                             <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                        </svg>
                        Hablar con Manuela (IA)
                    </button>
                </div>
            </div>

            {/* Feature Teasers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div 
                    onClick={() => setCurrentView(ViewState.LEARN)}
                    className="cursor-pointer group bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition"
                >
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-emerald-700 transition">Aprende Finanzas</h3>
                    <p className="text-slate-500 text-sm">Guías sobre ahorro, crédito e inversión.</p>
                </div>

                <div 
                    onClick={() => setCurrentView(ViewState.CHAT)}
                    className="cursor-pointer group bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition"
                >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-blue-700 transition">Chat Inteligente</h3>
                    <p className="text-slate-500 text-sm">Pregunta cualquier duda financiera 24/7.</p>
                </div>

                <div 
                    onClick={() => setCurrentView(ViewState.CALCULATOR)}
                    className="cursor-pointer group bg-white p-6 rounded-xl border border-slate-200 hover:shadow-lg transition"
                >
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-purple-700 transition">Calculadora</h3>
                    <p className="text-slate-500 text-sm">Proyecta tu plan de ahorro mensual.</p>
                </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentView(ViewState.HOME)}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-slate-800 hidden sm:block">EduFinanzas</span>
          </div>

          <nav className="flex items-center space-x-1 sm:space-x-4">
            <button 
              onClick={() => setCurrentView(ViewState.LEARN)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${currentView === ViewState.LEARN ? 'bg-slate-100 text-blue-700' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Aprender
            </button>
            <button 
              onClick={() => setCurrentView(ViewState.CALCULATOR)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${currentView === ViewState.CALCULATOR ? 'bg-slate-100 text-blue-700' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Calculadora
            </button>
            <button 
              onClick={() => setCurrentView(ViewState.CHAT)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition ${currentView === ViewState.CHAT ? 'bg-slate-100 text-blue-700' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Chat
            </button>
            <button 
              onClick={() => setCurrentView(ViewState.VOICE)}
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition ${currentView === ViewState.VOICE ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:text-indigo-600'}`}
            >
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span className="hidden sm:inline">Voz IA</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 w-full">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-slate-500 text-sm">
          <p>© 2024 Educación Financiera y Ahorro. Todos los derechos reservados.</p>
          <p className="mt-2 text-xs">Las proyecciones son estimadas y no garantizan resultados futuros. Consulte con su entidad financiera.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;