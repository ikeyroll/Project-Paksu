import { ABGValues, CategoryCode, ClassificationResult } from './types';
import { CATEGORY_DESCRIPTIONS, INTERPRETATION_TEMPLATES } from './constants';

export const classifyABG = (values: ABGValues): ClassificationResult => {
  const pH = parseFloat(values.pH);
  const pCO2 = parseFloat(values.pCO2);
  const pO2 = parseFloat(values.pO2); // Included in logic for completeness if needed, but mainly display
  const HCO3 = parseFloat(values.HCO3);
  const BE = parseFloat(values.baseExcess);

  let category: CategoryCode = '?';
  let name = 'Unclassified or mixed pattern';

  // Rule 1: Normal
  if (
    pH >= 7.35 && pH <= 7.45 &&
    pCO2 >= 35 && pCO2 <= 45 &&
    BE >= -3 && BE <= 3
  ) {
    category = 'N';
    name = 'Normal acid base status';
  }
  // Rule 2: Resp Acidosis
  else if (pH < 7.35 && pCO2 > 45) {
    if (HCO3 <= 26) {
      category = 'A';
      name = 'Acute respiratory acidosis';
    } else {
      category = 'B';
      name = 'Chronic respiratory acidosis';
    }
  }
  // Rule 3: Met Acidosis
  // Note: Prompt says "If pH < 7.35 and (HCO3 < 22 or Base Excess < -3)"
  else if (pH < 7.35 && (HCO3 < 22 || BE < -3)) {
    if (BE < -10) {
      category = 'G';
      name = 'Acute metabolic acidosis';
    } else {
      category = 'F';
      name = 'Chronic metabolic acidosis';
    }
  }
  // Rule 4: Resp Alkalosis
  else if (pH > 7.45 && pCO2 < 35) {
    if (HCO3 <= 26) {
      category = 'D';
      name = 'Acute respiratory alkalosis';
    } else {
      category = 'E';
      name = 'Chronic respiratory alkalosis';
    }
  }
  // Rule 5: Met Alkalosis
  else if (pH > 7.45 && HCO3 > 26) {
    category = 'C';
    name = 'Chronic metabolic alkalosis';
  }
  // Rule 6: Default is ? (Already set)

  const abnormalFeatures = getAbnormalFeatures(pH, pCO2, HCO3, BE);

  return {
    categoryCode: category,
    disorderName: name,
    description: CATEGORY_DESCRIPTIONS[category],
    abnormalFeatures,
    interpretation: INTERPRETATION_TEMPLATES[category],
  };
};

const getAbnormalFeatures = (pH: number, pCO2: number, HCO3: number, BE: number): string[] => {
  const features: string[] = [];

  if (pH < 7.35) features.push('pH low');
  else if (pH > 7.45) features.push('pH high');

  if (pCO2 < 35) features.push('pCO2 low');
  else if (pCO2 > 45) features.push('pCO2 high');

  if (HCO3 < 22) features.push('HCO3 low');
  else if (HCO3 > 26) features.push('HCO3 high');

  if (BE < -3) features.push('Base Excess negative');
  else if (BE > 3) features.push('Base Excess positive');

  if (features.length === 0) features.push('None');

  return features;
};
