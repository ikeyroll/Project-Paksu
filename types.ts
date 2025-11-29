export interface ABGValues {
  pH: string;
  pCO2: string;
  pO2: string;
  HCO3: string;
  baseExcess: string;
}

export type CategoryCode = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'N' | '?';

export interface InterpretationData {
  meaning: string[];
  causes: string[];
  nextSteps: string[];
  safetyNote: string[];
}

export interface ClassificationResult {
  categoryCode: CategoryCode;
  disorderName: string;
  description: string;
  abnormalFeatures: string[];
  interpretation: InterpretationData;
}
