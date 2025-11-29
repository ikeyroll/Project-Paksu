import React from 'react';
import { ClassificationResult, ABGValues } from '../types';

interface ClassificationResultProps {
  result: ClassificationResult | null;
  inputs: ABGValues;
}

const ClassificationResultCard: React.FC<ClassificationResultProps> = ({ result }) => {
  if (!result) return null;

  // Determine styles based on category
  const isNormal = result.categoryCode === 'N';
  // Use Green for Normal, Blue for others, Red for severe/mixed could be added if desired
  // Prompt requested "blue white and green" scheme.
  const theme = isNormal ? 'emerald' : 'blue'; 
  
  const bgClass = isNormal ? 'bg-emerald-50' : 'bg-blue-50';
  const textClass = isNormal ? 'text-emerald-800' : 'text-blue-800';
  const circleClass = isNormal ? 'bg-emerald-200 text-emerald-800' : 'bg-blue-200 text-blue-800';
  const iconColor = isNormal ? 'text-emerald-600' : 'text-blue-600';

  return (
    <div className={`rounded-xl shadow-sm border border-slate-200 overflow-hidden ${bgClass}`}>
      <div className="p-6">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Primary Classification</h3>
        
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h2 className={`text-3xl font-bold ${isNormal ? 'text-emerald-700' : 'text-blue-900'} leading-tight`}>
              {result.disorderName}
            </h2>
            <div className={`flex items-start mt-3 space-x-2 ${textClass}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 mt-0.5 shrink-0 ${iconColor}`}>
                {isNormal ? (
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                )}
              </svg>
              <p className="font-medium text-base">
                {result.description}
              </p>
            </div>
          </div>
          
          <div className={`${circleClass} w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shrink-0 ml-4`}>
            {result.categoryCode}
          </div>
        </div>

        {!isNormal && result.abnormalFeatures.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200/50">
             <p className="text-sm text-slate-600">
               <span className="font-semibold text-slate-700">Features: </span>
               {result.abnormalFeatures.join(', ')}
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassificationResultCard;