import React from 'react';
import { ClassificationResult } from '../types';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

interface ResultCardProps {
  result: ClassificationResult | null;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  if (!result) return null;

  const isNormal = result.code === 'N';
  const isCritical = ['A', 'G', 'D'].includes(result.code); // Acute conditions

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className={`p-6 ${isNormal ? 'bg-emerald-50' : isCritical ? 'bg-red-50' : 'bg-slate-50'}`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-1">Primary Classification</h3>
            <h2 className={`text-2xl sm:text-3xl font-bold ${isNormal ? 'text-emerald-700' : isCritical ? 'text-red-700' : 'text-slate-800'}`}>
              {result.name}
            </h2>
          </div>
          <div className={`
            flex items-center justify-center w-12 h-12 rounded-full font-bold text-xl shadow-sm
            ${isNormal ? 'bg-emerald-200 text-emerald-800' : isCritical ? 'bg-red-200 text-red-800' : 'bg-slate-200 text-slate-700'}
          `}>
            {result.code}
          </div>
        </div>

        {result.abnormalities.length > 0 && (
          <div className="mt-4 p-3 bg-white/60 rounded-lg border border-slate-200/50">
            <h4 className="text-xs font-semibold text-slate-500 uppercase mb-2">Key Abnormalities</h4>
            <div className="flex flex-wrap gap-2">
              {result.abnormalities.map((abn, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                  <AlertTriangle className="w-3 h-3" />
                  {abn}
                </span>
              ))}
            </div>
          </div>
        )}
         {isNormal && (
          <div className="mt-4 flex items-center gap-2 text-emerald-700 font-medium">
            <CheckCircle className="w-5 h-5" />
            <span>Values are within normal physiological limits.</span>
          </div>
         )}
      </div>
    </div>
  );
};