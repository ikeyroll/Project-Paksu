import React from 'react';
import { BookOpen, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { INTERPRETATIONS } from '../constants';

interface AiAnalysisProps {
  code: string | null;
}

export const AiAnalysis: React.FC<AiAnalysisProps> = ({ code }) => {
  if (!code) return null;

  const data = INTERPRETATIONS[code] || INTERPRETATIONS['X'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
        <div className="flex items-center gap-2">
            <div className="bg-blue-100 p-1.5 rounded-md">
                <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Clinical Interpretation</h2>
        </div>
      </div>

      <div className="p-6 flex-1 overflow-y-auto">
        <div className="space-y-6">
            
            {/* Meaning */}
            <section>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    Meaning
                </h3>
                <p className="text-slate-700 leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                    {data.meaning}
                </p>
            </section>

            {/* Possible Causes */}
            <section>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Possible Causes
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {data.causes.map((cause, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-600 bg-slate-50 p-2.5 rounded border border-slate-100">
                            <ArrowRight className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                            <span>{cause}</span>
                        </li>
                    ))}
                </ul>
            </section>

             {/* Next Steps */}
             <section>
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    General Next Steps
                </h3>
                <div className="space-y-2">
                    {data.nextSteps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span>{step}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
      </div>
      
      {/* Static Disclaimer */}
      <div className="bg-slate-50 p-3 text-xs text-slate-500 border-t border-slate-100 rounded-b-xl flex gap-2 items-center">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
        <span>Interpretations are general guides. Always correlate with clinical history.</span>
      </div>
    </div>
  );
};
