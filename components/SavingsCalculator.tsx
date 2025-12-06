import React, { useState } from 'react';

export const SavingsCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(150000000); // 150M COP default
  const [percent, setPercent] = useState<number>(30); // 30% default
  const [currentSavings, setCurrentSavings] = useState<number>(5000000); // 5M COP
  const [monthlyContribution, setMonthlyContribution] = useState<number>(1000000); // 1M COP

  const targetAmount = propertyValue * (percent / 100);
  const remaining = Math.max(0, targetAmount - currentSavings);
  const monthsToGoal = monthlyContribution > 0 ? Math.ceil(remaining / monthlyContribution) : Infinity;
  const years = Math.floor(monthsToGoal / 12);
  const leftoverMonths = monthsToGoal % 12;

  const formatCOP = (val: number) => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
        <h2 className="text-2xl font-bold flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Calculadora de Cuota Inicial
        </h2>
        <p className="opacity-90 mt-1">Planifica tu camino hacia tu vivienda propia</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Valor de la Vivienda (COP)</label>
            <input
              type="range"
              min="80000000"
              max="1000000000"
              step="5000000"
              value={propertyValue}
              onChange={(e) => setPropertyValue(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="mt-2 flex justify-between items-center">
                <input 
                    type="number" 
                    value={propertyValue}
                    onChange={(e) => setPropertyValue(Number(e.target.value))}
                    className="border border-slate-300 rounded px-2 py-1 text-slate-900 w-full"
                />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Porcentaje Cuota Inicial ({percent}%)</label>
            <div className="flex gap-2">
              {[10, 20, 30, 40].map((p) => (
                <button
                  key={p}
                  onClick={() => setPercent(p)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium border ${
                    percent === p
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-emerald-400'
                  }`}
                >
                  {p}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Ahorros Actuales</label>
             <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-slate-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="block w-full rounded-md border-slate-300 pl-7 py-2 border focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  placeholder="0"
                />
              </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Ahorro Mensual Posible</label>
             <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-slate-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="block w-full rounded-md border-slate-300 pl-7 py-2 border focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  placeholder="0"
                />
              </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-slate-50 rounded-xl p-6 flex flex-col justify-center space-y-6">
          <div>
            <span className="text-slate-500 text-sm font-medium uppercase tracking-wide">Meta Cuota Inicial</span>
            <div className="text-3xl font-bold text-slate-900 mt-1">{formatCOP(targetAmount)}</div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 mt-4">
              <div 
                className="bg-emerald-600 h-2.5 rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (currentSavings / targetAmount) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-right">
              {Math.min(100, (currentSavings / targetAmount) * 100).toFixed(1)}% completado
            </p>
          </div>

          <div className="border-t border-slate-200 pt-6">
            <span className="text-slate-500 text-sm font-medium uppercase tracking-wide">Tiempo estimado</span>
            <div className="flex items-baseline gap-2 mt-1">
                {monthlyContribution <= 0 ? (
                    <span className="text-red-500 font-medium">Define un ahorro mensual</span>
                ) : remaining <= 0 ? (
                     <span className="text-emerald-600 font-bold text-xl">¡Meta Alcanzada! 🎉</span>
                ) : (
                    <>
                        <span className="text-4xl font-extrabold text-slate-900">{monthsToGoal}</span>
                        <span className="text-slate-600 font-medium">meses</span>
                    </>
                )}
            </div>
            {monthlyContribution > 0 && remaining > 0 && (
                <p className="text-sm text-slate-500 mt-2">
                    Serán aproximadamente <strong>{years} años y {leftoverMonths} meses</strong> ahorrando {formatCOP(monthlyContribution)} mensuales.
                </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};