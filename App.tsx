
import React, { useState, useRef } from 'react';
import { InputForm } from './components/InputForm';
import { ResultCard } from './components/ResultCard';
import { AiAnalysis } from './components/AiAnalysis';
import { AbgInputData, ClassificationResult } from './types';
import { classifyAbg } from './services/abgLogic';
import { Stethoscope } from 'lucide-react';

const INITIAL_DATA: AbgInputData = {
  ph: '',
  pco2: '',
  po2: '',
  hco3: '',
  baseExcess: '',
};

const App: React.FC = () => {
  const [inputData, setInputData] = useState<AbgInputData>(INITIAL_DATA);
  const [result, setResult] = useState<ClassificationResult | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (field: keyof AbgInputData, value: string) => {
    setInputData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // 1. Rule-based Classification
    const classification = classifyAbg(inputData);
    setResult(classification);
    
    // Scroll to results on mobile
    setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">ABG Interpretation Assistant</h1>
                <span className="text-xs text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Beta</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 xl:col-span-4">
            <InputForm 
              data={inputData} 
              onChange={handleInputChange} 
              onSubmit={handleSubmit}
            />
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6" ref={resultsRef}>
            {result ? (
              <>
                <ResultCard result={result} />
                <div className="h-fit min-h-[400px]">
                    <AiAnalysis code={result.code} />
                </div>
              </>
            ) : (
               /* Empty State / Placeholder */
               <div className="h-full flex flex-col items-center justify-center bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-400 min-h-[400px]">
                  <ActivityIconPlaceholder />
                  <h3 className="mt-4 text-lg font-medium text-slate-600">Ready to Analyze</h3>
                  <p>Enter patient ABG values on the left to generate a classification and clinical interpretation.</p>
               </div>
            )}
          </div>
        </div>
      </main>

      {/* Safety Disclaimer Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-medium text-slate-300 mb-2">
            ⚠️ Academic Use Only
          </p>
          <p className="text-xs max-w-2xl mx-auto leading-relaxed opacity-80">
            This application was developed as an educational instrument for the Master's curriculum of Helmie Hussein. 
            It is intended solely for academic demonstration and simulation purposes. 
            The algorithms and interpretations presented herein should not be utilized for clinical diagnosis or patient management 
            and do not supersede professional medical judgment or established hospital protocols.
          </p>
        </div>
      </footer>
    </div>
  );
};

const ActivityIconPlaceholder = () => (
    <svg className="w-24 h-24 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export default App;
