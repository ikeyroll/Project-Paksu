
import React from 'react';
import { AbgInputData } from '../types';
import { NORMAL_RANGES } from '../constants';
import { Info, AlertCircle } from 'lucide-react';

interface InputFormProps {
  data: AbgInputData;
  onChange: (field: keyof AbgInputData, value: string) => void;
  onSubmit: () => void;
}

const InputField: React.FC<{
  label: string;
  name: keyof AbgInputData;
  value: string;
  unit?: string;
  range?: [number, number];
  type?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, name, value, unit, range, type = "number", placeholder = "0.00", onChange }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1 flex items-center justify-between">
      <span>{label}</span>
      {range && (
        <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
          Ref: {range[0]} - {range[1]}
        </span>
      )}
    </label>
    <div className="relative rounded-md shadow-sm">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        step="any"
        className="block w-full rounded-md border-slate-300 pl-3 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2.5 border"
        placeholder={placeholder}
      />
      {unit && (
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <span className="text-slate-500 sm:text-sm">{unit}</span>
        </div>
      )}
    </div>
  </div>
);

export const InputForm: React.FC<InputFormProps> = ({ data, onChange, onSubmit }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(name as keyof AbgInputData, value);
  };

  const isFormValid = 
    data.ph !== '' && 
    data.pco2 !== '' && 
    data.po2 !== '' && 
    data.hco3 !== '' && 
    data.baseExcess !== '';

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
        <div className="bg-blue-100 p-2 rounded-lg">
          <Info className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-slate-800">Parameters</h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-2">
        <section>
          <div className="grid grid-cols-1 gap-y-2">
            <InputField label="pH" name="ph" value={data.ph} range={NORMAL_RANGES.ph} onChange={handleChange} />
            <InputField label="pCO₂" name="pco2" value={data.pco2} unit="mmHg" range={NORMAL_RANGES.pco2} onChange={handleChange} />
            <InputField label="pO₂" name="po2" value={data.po2} unit="mmHg" range={NORMAL_RANGES.po2} onChange={handleChange} />
            <InputField label="HCO₃" name="hco3" value={data.hco3} unit="mmol/L" range={NORMAL_RANGES.hco3} onChange={handleChange} />
            <InputField label="Base Excess" name="baseExcess" value={data.baseExcess} unit="mmol/L" range={NORMAL_RANGES.baseExcess} onChange={handleChange} />
          </div>
        </section>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        {!isFormValid && (
            <div className="flex items-center gap-2 text-amber-600 text-sm mb-3 bg-amber-50 p-2 rounded">
                <AlertCircle className="w-4 h-4" />
                <span>Please fill in all fields.</span>
            </div>
        )}
        <button
          onClick={onSubmit}
          disabled={!isFormValid}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium shadow-sm transition-all
            ${!isFormValid 
              ? 'bg-slate-300 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
            }`}
        >
          Interpret ABG
        </button>
      </div>
    </div>
  );
};
