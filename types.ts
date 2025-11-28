
export interface AbgInputData {
  ph: string;
  pco2: string;
  po2: string;
  hco3: string;
  baseExcess: string;
}

export interface ClassificationResult {
  code: string;
  name: string;
  abnormalities: string[];
}

export interface NormalRanges {
  ph: [number, number];
  pco2: [number, number];
  po2: [number, number];
  hco3: [number, number];
  baseExcess: [number, number];
}

export enum AbgCategory {
  A = 'Acute Respiratory Acidosis',
  B = 'Chronic Respiratory Acidosis',
  C = 'Chronic Metabolic Alkalosis',
  D = 'Acute Respiratory Alkalosis',
  E = 'Chronic Respiratory Alkalosis',
  F = 'Chronic Metabolic Acidosis',
  G = 'Acute Metabolic Acidosis',
  N = 'Normal',
  X = 'Mixed/Unclassified Pattern'
}

export interface InterpretationData {
  meaning: string;
  causes: string[];
  nextSteps: string[];
}