import React from 'react';

const TopicCard: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition p-6">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
    </div>
    <div className="text-slate-600 text-sm leading-relaxed space-y-2">
      {children}
    </div>
  </div>
);

export const EducationSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      <TopicCard 
        title="Crear un Plan de Ahorro"
        icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
        }
      >
        <ul className="list-disc list-inside space-y-1">
            <li><strong>Define tu meta:</strong> El valor de la vivienda y la cuota inicial (usualmente 30%).</li>
            <li><strong>Presupuesta:</strong> Usa la regla 50/30/20. 50% necesidades, 30% gustos, 20% ahorro.</li>
            <li><strong>Automatiza:</strong> Programa transferencias automáticas a tu cuenta de ahorros apenas recibas tu salario.</li>
            <li><strong>Sé realista:</strong> Es mejor ahorrar poco pero constante, que mucho un mes y nada al siguiente.</li>
        </ul>
      </TopicCard>

      <TopicCard 
        title="Reducir Gastos Hormiga"
        icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
            </svg>
        }
      >
        <p>Los gastos pequeños diarios suman grandes cantidades al año. Identifícalos:</p>
        <ul className="list-disc list-inside mt-2">
            <li>Café diario fuera de casa ($5.000 x 20 días = $100.000/mes).</li>
            <li>Suscripciones de streaming que no usas.</li>
            <li>Domicilios frecuentes. Cocinar en casa ahorra hasta un 60%.</li>
            <li>Compras impulsivas por internet. Aplica la regla de las 24 horas antes de comprar.</li>
        </ul>
      </TopicCard>

      <TopicCard 
        title="CDTs, FICs y Cuentas AFC"
        icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
        }
      >
        <ul className="space-y-2">
            <li><strong>CDT:</strong> Certificado de Depósito a Término. Bajo riesgo, rentabilidad fija. Ideal para no gastar el dinero ahorrado.</li>
            <li><strong>FICs:</strong> Fondos de Inversión Colectiva. Diversifican tu dinero en varios activos. Riesgo variable.</li>
            <li><strong>Cuenta AFC:</strong> Ahorro para el Fomento de la Construcción. Tiene beneficios tributarios (reduce retención en la fuente) si se usa para vivienda.</li>
        </ul>
      </TopicCard>

      <TopicCard 
        title="Mejorar Vida Crediticia"
        icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        }
      >
        <p>Tu puntaje en Datacrédito/TransUnion es vital para un crédito hipotecario:</p>
        <ul className="list-decimal list-inside mt-2">
            <li>Paga tus obligaciones antes de la fecha límite.</li>
            <li>No uses más del 50% del cupo de tus tarjetas de crédito.</li>
            <li>Ten un plan de telefonía o internet a tu nombre para generar historial.</li>
            <li>Evita solicitar muchos créditos en poco tiempo (huella de consulta).</li>
        </ul>
      </TopicCard>
    </div>
  );
};