import React from 'react';
import { ClassificationResult } from '../types';

interface InterpretationDetailsProps {
  result: ClassificationResult | null;
}

const InterpretationDetails: React.FC<InterpretationDetailsProps> = ({ result }) => {
  if (!result) return null;

  const { interpretation } = result;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-blue-50 px-6 py-4 border-b border-blue-100 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-700">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        <h2 className="text-lg font-semibold text-slate-900">Clinical Interpretation</h2>
      </div>
      
      <div className="p-6 space-y-8">
        
        {/* Meaning Section */}
        <div className="bg-blue-50/30 rounded-lg p-4 border border-blue-100/50">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></span>
            Meaning
          </h4>
          <div className="space-y-1">
             {interpretation.meaning.map((text, i) => (
               <p key={i} className="text-slate-700">{text}</p>
             ))}
          </div>
        </div>

        {/* Possible Causes - Grid Layout */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mr-2"></span>
            Possible Causes
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {interpretation.causes.map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-md p-3 text-sm text-slate-700 flex items-start border border-slate-100">
                <svg className="w-4 h-4 text-slate-400 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps - Checklist */}
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2"></span>
            General Next Steps
          </h4>
          <ul className="space-y-2">
            {interpretation.nextSteps.map((item, idx) => (
              <li key={idx} className="flex items-start text-slate-700 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-emerald-500 mr-2 shrink-0">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

       {/* Safety Note Footer */}
       <div className="bg-orange-50 px-6 py-4 border-t border-orange-100 flex items-start gap-3">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-600 shrink-0 mt-0.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <div className="text-xs text-slate-600">
           {interpretation.safetyNote.map((note, idx) => (
             <p key={idx}>{note}</p>
           ))}
        </div>
      </div>
    </div>
  );
};

export default InterpretationDetails;