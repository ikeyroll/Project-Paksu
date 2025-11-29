import React from 'react';
import { ABGValues } from '../types';

interface InputFormProps {
  values: ABGValues;
  onChange: (field: keyof ABGValues, value: string) => void;
  onInterpret: () => void;
  onCopy: () => void;
  canCopy: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ values, onChange, onInterpret, onCopy, canCopy }) => {
  const inputFields = [
    { id: 'pH', label: 'pH', placeholder: '0.00', ref: '7.35 - 7.45', step: '0.01', unit: '' },
    { id: 'pCO2', label: 'pCO2', placeholder: '0.00', ref: '35 - 45', step: '1', unit: 'mmHg' },
    { id: 'pO2', label: 'pO2', placeholder: '0.00', ref: '75 - 100', step: '1', unit: 'mmHg' },
    { id: 'HCO3', label: 'HCO3', placeholder: '0.00', ref: '22 - 26', step: '1', unit: 'mmol/L' },
    { id: 'baseExcess', label: 'Base Excess', placeholder: '0.00', ref: '-3 - 3', step: '1', unit: 'mmol/L' },
  ];

  const isEmpty = Object.values(values).some(v => v === '');

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden h-full flex flex-col">
      <div className="bg-blue-50/50 px-6 py-4 border-b border-blue-100 flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-600">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <h2 className="text-lg font-semibold text-slate-800">Parameters</h2>
      </div>
      
      <div className="p-6 space-y-5 flex-1">
        {inputFields.map((field) => (
          <div key={field.id} className="flex flex-col">
            <div className="flex justify-between items-center mb-1.5">
              <label htmlFor={field.id} className="block text-sm font-medium text-slate-700">
                {field.label}
              </label>
              <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500 ring-1 ring-inset ring-slate-500/10">
                Ref: {field.ref}
              </span>
            </div>
            <div className="relative rounded-md shadow-sm">
              <input
                type="number"
                id={field.id}
                step={field.step}
                value={values[field.id as keyof ABGValues]}
                onChange={(e) => onChange(field.id as keyof ABGValues, e.target.value)}
                placeholder={field.placeholder}
                className="block w-full rounded-md border-0 py-2.5 pl-3 pr-16 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              {field.unit && (
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span className="text-slate-500 sm:text-sm">{field.unit}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Validation Message Style */}
        {isEmpty && (
          <div className="rounded-md bg-orange-50 p-3 mt-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-orange-800">Please fill in all fields.</p>
              </div>
            </div>
          </div>
        )}

        <div className="pt-2 space-y-3">
          <button
            onClick={onInterpret}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-base"
          >
            Interpret ABG
          </button>
          
          <button
            onClick={onCopy}
            disabled={!canCopy}
            className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors focus:outline-none ${
              canCopy
                ? 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                : 'text-slate-400 cursor-not-allowed'
            }`}
          >
            {canCopy ? 'Copy Results to Clipboard' : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputForm;