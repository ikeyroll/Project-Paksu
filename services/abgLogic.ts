import { AbgInputData, ClassificationResult, AbgCategory } from '../types';
import { NORMAL_RANGES } from '../constants';

export const classifyAbg = (data: AbgInputData): ClassificationResult => {
  const pH = Number(data.ph);
  const pCO2 = Number(data.pco2);
  const HCO3 = Number(data.hco3);
  const BE = Number(data.baseExcess);

  let code = 'X';
  let name: string = AbgCategory.X;
  const abnormalities: string[] = [];

  // Identify abnormalities for display
  if (pH < NORMAL_RANGES.ph[0]) abnormalities.push(`Acidemia (pH ${pH})`);
  else if (pH > NORMAL_RANGES.ph[1]) abnormalities.push(`Alkalemia (pH ${pH})`);

  if (pCO2 < NORMAL_RANGES.pco2[0]) abnormalities.push(`Hypocapnia (pCO₂ ${pCO2})`);
  else if (pCO2 > NORMAL_RANGES.pco2[1]) abnormalities.push(`Hypercapnia (pCO₂ ${pCO2})`);

  if (HCO3 < NORMAL_RANGES.hco3[0]) abnormalities.push(`Low HCO₃ (${HCO3})`);
  else if (HCO3 > NORMAL_RANGES.hco3[1]) abnormalities.push(`High HCO₃ (${HCO3})`);
  
  // Logic Implementation
  // 1. Normal
  if (
    pH >= 7.35 && pH <= 7.45 &&
    pCO2 >= 35 && pCO2 <= 45 &&
    BE >= -3 && BE <= 3
  ) {
    code = 'N';
    name = AbgCategory.N;
  }
  // 2. Acidosis Check
  else if (pH < 7.35) {
    // Respiratory Acidosis
    if (pCO2 > 45) {
      if (HCO3 <= 26) {
        code = 'A';
        name = AbgCategory.A;
      } else {
        code = 'B';
        name = AbgCategory.B;
      }
    }
    // Metabolic Acidosis
    else if (HCO3 < 22 || BE < -3) {
      if (BE < -10) {
        code = 'G';
        name = AbgCategory.G;
      } else {
        code = 'F';
        name = AbgCategory.F;
      }
    }
  }
  // 3. Alkalosis Check
  else if (pH > 7.45) {
    // Respiratory Alkalosis
    if (pCO2 < 35) {
      if (HCO3 <= 26) {
        code = 'D';
        name = AbgCategory.D;
      } else {
        code = 'E';
        name = AbgCategory.E;
      }
    }
    // Metabolic Alkalosis
    else if (HCO3 > 26) {
      code = 'C';
      name = AbgCategory.C;
    }
  }

  // Fallback for compensated states or mixed disorders
  if (code === 'X' && abnormalities.length > 0) {
     if (pH >= 7.35 && pH <= 7.45) {
        name = 'Compensated or Mixed Disorder';
     }
  }

  return {
    code,
    name,
    abnormalities,
  };
};
