import { CategoryCode, InterpretationData } from './types';

export const CATEGORY_DESCRIPTIONS: Record<CategoryCode, string> = {
  N: 'ABG is within usual reference ranges with no clear primary acid base disorder.',
  A: 'Acute hypoventilation pattern with high pCO2 and low pH with minimal renal compensation.',
  B: 'Chronic hypoventilation with raised pCO2 and raised HCO3 suggesting renal compensation.',
  C: 'Metabolic alkalosis with raised HCO3 and positive Base Excess often with some respiratory compensation.',
  D: 'Acute hyperventilation with low pCO2 and high pH with limited metabolic compensation.',
  E: 'Chronic respiratory alkalosis with low pCO2 and raised HCO3 suggesting renal adaptation.',
  F: 'Metabolic acidosis with low HCO3 and negative Base Excess which may be chronic or partially compensated.',
  G: 'Severe metabolic acidosis with marked base deficit typical of acute lactic or ketoacidosis.',
  '?': 'Pattern does not fit a single simple primary disorder so consider a mixed or compensated state.',
};

export const INTERPRETATION_TEMPLATES: Record<CategoryCode, InterpretationData> = {
  N: {
    meaning: [
      'All major acid-base parameters are within standard reference ranges.',
      'Oxygenation should be interpreted in the context of FiO2.'
    ],
    causes: [
      'Normal physiological state.',
      'A fully compensated complex mixed disorder (rare).',
      'Early stages of disease before biochemical changes are evident.'
    ],
    nextSteps: [
      'Correlate with clinical history and examination.',
      'Review oxygenation status separately.',
      'No specific acid-base management required currently.'
    ],
    safetyNote: [
      'A normal ABG does not rule out all pathology (e.g. carbon monoxide poisoning, acute coronary syndrome).'
    ]
  },
  A: {
    meaning: [
      'Significant accumulation of CO2 causing acidity (Respiratory Acidosis).',
      'The kidneys have not yet retained enough bicarbonate to compensate (Acute).'
    ],
    causes: [
      'Acute exacerbation of COPD or Asthma.',
      'Central respiratory depression (e.g., opiates, sedatives, neurological event).',
      'Airway obstruction (foreign body, severe croup).',
      'Neuromuscular failure (e.g., Guillain-Barré crisis, Myasthenia Gravis).'
    ],
    nextSteps: [
      'Assess airway patency and respiratory effort immediately.',
      'Check oxygen saturation and deliver controlled oxygen.',
      'Review medication chart for sedating agents.',
      'Consider assisted ventilation (NIV or intubation) if patient is tiring or obtunded.',
      'Consult respiratory or intensive care team.'
    ],
    safetyNote: [
      'Rapid rise in pCO2 can cause CO2 narcosis and coma. Monitor consciousness closely.'
    ]
  },
  B: {
    meaning: [
      'Long-standing retention of CO2 (Respiratory Acidosis).',
      'The kidneys have retained bicarbonate to buffer the pH toward normal (Chronic/Compensated).'
    ],
    causes: [
      'Chronic Obstructive Pulmonary Disease (COPD).',
      'Obesity Hypoventilation Syndrome (Pickwickian syndrome).',
      'Severe kyphoscoliosis or chronic restrictive lung disease.'
    ],
    nextSteps: [
      'Identify if this represents the patient’s baseline (compare with old ABGs).',
      'Avoid over-oxygenation which may worsen hypercapnia in CO2 retainers.',
      'Treat underlying infection or bronchospasm.',
      'Encourage physiotherapy and clearance of secretions.'
    ],
    safetyNote: [
      'Do not aim for a completely normal pCO2 if the patient is chronically adapted.'
    ]
  },
  C: {
    meaning: [
      'Primary increase in serum bicarbonate causing high pH.',
      'Respiratory compensation (hypoventilation) may cause a mild rise in pCO2.'
    ],
    causes: [
      'Loss of acid via vomiting or nasogastric drainage.',
      'Diuretic therapy (furosemide/thiazides) causing contraction alkalosis.',
      'Hypokalaemia or mineralocorticoid excess.',
      'Excessive administration of bicarbonate.'
    ],
    nextSteps: [
      'Assess volume status (dehydration is common).',
      'Check and replace electrolytes, especially Potassium and Magnesium.',
      'Review diuretic medications.',
      'Consider IV fluid rehydration with Normal Saline if not contraindicated.'
    ],
    safetyNote: [
      'Severe alkalosis can cause arrhythmias and seizures. Monitor ECG and electrolytes.'
    ]
  },
  D: {
    meaning: [
      'Excessive washout of CO2 causing high pH (Respiratory Alkalosis).',
      'Short duration means kidneys haven\'t excreted bicarbonate yet (Acute).'
    ],
    causes: [
      'Hyperventilation due to anxiety or pain.',
      'Early sepsis (common sign).',
      'Hypoxia driving respiratory rate.',
      'Pulmonary embolism.',
      'Salicylate toxicity (early phase).'
    ],
    nextSteps: [
      'Treat pain and reassure the patient.',
      'Screen for sepsis and pulmonary embolism.',
      'Check oxygenation; hypoxia is a potent driver of hyperventilation.',
      'Do NOT use paper bag re-breathing (unsafe if hypoxia is the cause).'
    ],
    safetyNote: [
      'Sudden hyperventilation is a red flag for pulmonary embolism or impending sepsis.'
    ]
  },
  E: {
    meaning: [
      'Long-term low pCO2 levels.',
      'Kidneys have excreted bicarbonate to lower pH toward normal (Chronic).'
    ],
    causes: [
      'Pregnancy (progesterone effect).',
      'Chronic liver disease / Cirrhosis.',
      'Residents of high altitude.',
      'Chronic neurological conditions.'
    ],
    nextSteps: [
      'Review medical history for chronic liver or lung conditions.',
      'Check pregnancy status if applicable.',
      'Usually requires no specific acute intervention for the acid-base disorder itself.'
    ],
    safetyNote: [
      'Ensure the low pCO2 is not an acute change superimposed on a chronic condition.'
    ]
  },
  F: {
    meaning: [
      'Deficit of bicarbonate causing low pH.',
      'Lack of severe base deficit suggests either a chronic state or a milder acidosis.'
    ],
    causes: [
      'Renal Tubular Acidosis (Types 1, 2, or 4).',
      'Chronic Renal Failure.',
      'Diarrhea (loss of bicarbonate).',
      'Recovery phase of treated ketoacidosis.'
    ],
    nextSteps: [
      'Check Renal Profile (Urea, Creatinine, Electrolytes).',
      'Calculate Anion Gap to narrow differential diagnosis.',
      'Review history for diarrhea or fistula losses.',
      'Discuss with nephrology if renal cause suspected.'
    ],
    safetyNote: [
      'Chronic acidosis can lead to bone demineralization and muscle wasting over time.'
    ]
  },
  G: {
    meaning: [
      'Low pH and low HCO3 with strongly negative Base Excess are consistent with significant metabolic acidosis.',
      'Respiratory compensation may or may not be complete depending on the pCO2 value.'
    ],
    causes: [
      'Sepsis related lactic acidosis which is common in Malaysian emergency and intensive care.',
      'Diabetic ketoacidosis in patients with poorly controlled diabetes.',
      'Acute kidney injury with reduced acid excretion.',
      'Toxin or drug exposure for example methanol or salicylate ingestion.'
    ],
    nextSteps: [
      'Assess airway breathing and circulation.',
      'Review blood pressure heart rate and mental status.',
      'Look for sepsis dehydration or toxin exposure.',
      'Repeat ABG after initial treatment or if the patient deteriorates.',
      'Discuss early with senior or intensive care teams according to local policy.'
    ],
    safetyNote: [
      'This pattern suggests a serious disorder. Management must follow hospital protocols and specialist advice.'
    ]
  },
  '?': {
    meaning: [
      'Values do not fit the classic simple definitions of primary disorders.',
      'Likely represents a mixed disorder (e.g., Metabolic Acidosis + Respiratory Alkalosis).'
    ],
    causes: [
      'Cardiac arrest or profound shock (Mixed Acidosis).',
      'Sepsis with multi-organ failure.',
      'Salicylate poisoning (Mixed Resp Alkalosis + Met Acidosis).',
      'Patient on mechanical ventilation with complex settings.'
    ],
    nextSteps: [
      'Re-check the validity of the ABG sample (venous vs arterial).',
      'Assess the patient globally (ABC approach).',
      'Calculate Anion Gap and Delta Ratio if possible.',
      'Escalate immediately to a specialist or consultant.'
    ],
    safetyNote: [
      'Mixed disorders often indicate critically ill patients with multiple active pathologies.'
    ]
  }
};
