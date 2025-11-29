import React, { useState } from 'react';
import InputForm from './components/InputForm';
import ClassificationResultCard from './components/ClassificationResult';
import InterpretationDetails from './components/InterpretationDetails';
import EmptyState from './components/EmptyState';
import { ABGValues, ClassificationResult } from './types';
import { classifyABG } from './utils';

const App: React.FC = () => {
  const [values, setValues] = useState<ABGValues>({
    pH: '',
    pCO2: '',
    pO2: '',
    HCO3: '',
    baseExcess: ''
  });

  const [result, setResult] = useState<ClassificationResult | null>(null);

  const handleInputChange = (field: keyof ABGValues, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleInterpret = () => {
    // Basic validation to ensure inputs are not empty
    if (!values.pH || !values.pCO2 || !values.HCO3 || !values.baseExcess) {
      alert("Please fill in all fields (pO2 is optional for calculation but good for records).");
      return;
    }
    const classification = classifyABG(values);
    setResult(classification);
  };

  const handleCopy = () => {
    if (!result) return;

    const textToCopy = `
ABG Interpretation Assistant Results
------------------------------------
Classification: [${result.categoryCode}] ${result.disorderName}
Values: pH ${values.pH} | pCO2 ${values.pCO2} | pO2 ${values.pO2 || '-'} | HCO3 ${values.HCO3} | BE ${values.baseExcess}

Abnormal Features:
${result.abnormalFeatures.join(', ')}

Meaning:
${result.interpretation.meaning.map(s => '- ' + s).join('\n')}

Possible Causes:
${result.interpretation.causes.map(s => '- ' + s).join('\n')}

Next Steps:
${result.interpretation.nextSteps.map(s => '- ' + s).join('\n')}

Safety Note:
${result.interpretation.safetyNote.map(s => '- ' + s).join('\n')}
    `.trim();

    navigator.clipboard.writeText(textToCopy)
      .then(() => alert('Results copied to clipboard'))
      .catch(() => alert('Failed to copy results'));
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar/Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center space-x-3">
          <div className="bg-blue-600 rounded-lg p-1.5">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none">ABG Interpretation Assistant</h1>
          </div>
          <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded ml-2">BETA</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:items-start">
          
          {/* Left Column - Inputs */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <InputForm 
              values={values} 
              onChange={handleInputChange} 
              onInterpret={handleInterpret} 
              onCopy={handleCopy}
              canCopy={!!result}
            />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-8 space-y-6">
            {!result ? (
              <EmptyState />
            ) : (
              <>
                <ClassificationResultCard result={result} inputs={values} />
                <InterpretationDetails result={result} />
              </>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-amber-400 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            <span>Academic Use Only</span>
          </div>
          <p className="text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
             This application was developed as an educational instrument for the Master's curriculum of Helmie Hussein. It is intended solely for academic demonstration and simulation purposes. The algorithms and interpretations presented herein should not be utilized for clinical diagnosis or patient management and do not supersede professional medical judgment or established hospital protocols.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;