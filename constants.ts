import { NormalRanges, InterpretationData } from './types';

export const NORMAL_RANGES: NormalRanges = {
  ph: [7.35, 7.45],
  pco2: [35, 45],
  po2: [75, 100],
  hco3: [22, 26],
  baseExcess: [-3, 3],
};

export const INTERPRETATIONS: Record<string, InterpretationData> = {
  A: {
    meaning: "Acute Respiratory Acidosis indicates that the lungs are not removing enough CO₂ (hypoventilation), causing blood acidity to rise. The kidneys have not yet had time to retain bicarbonate to compensate.",
    causes: [
      "Airway obstruction (e.g., foreign body, severe asthma)",
      "CNS depression (e.g., opioids, sedatives)",
      "Neuromuscular impairment (e.g., Guillain-Barré, Myasthenia Gravis)",
      "Acute lung disease (e.g., Pneumonia, Pulmonary Edema)"
    ],
    nextSteps: [
      "Assess airway patency and respiratory rate",
      "Check for signs of narcosis or muscle weakness",
      "Consider assisted ventilation (BiPAP or Intubation) if severe"
    ]
  },
  B: {
    meaning: "Chronic Respiratory Acidosis suggests long-standing hypoventilation. The body has compensated by retaining bicarbonate in the kidneys to normalize pH.",
    causes: [
      "COPD (Chronic Obstructive Pulmonary Disease)",
      "Obesity Hypoventilation Syndrome (OHS)",
      "Chronic neuromuscular disorders",
      "Severe kyphoscoliosis"
    ],
    nextSteps: [
      "Avoid excessive oxygen therapy (target SaO₂ 88-92% in COPD)",
      "Treat acute exacerbations (bronchodilators, steroids)",
      "Evaluate need for home non-invasive ventilation"
    ]
  },
  C: {
    meaning: "Chronic Metabolic Alkalosis involves an excess of bicarbonate or loss of acid. It is often maintained by volume depletion or chloride deficiency.",
    causes: [
      "Diuretic therapy (Thiazides/Loop diuretics)",
      "Vomiting or Nasogastric (NG) suction",
      "Hyperaldosteronism",
      "Severe hypokalemia"
    ],
    nextSteps: [
      "Assess fluid volume status",
      "Check electrolytes (Cl-, K+, Mg2+)",
      "Consider stopping diuretics or replacing volume/electrolytes"
    ]
  },
  D: {
    meaning: "Acute Respiratory Alkalosis is caused by hyperventilation, blowing off too much CO₂, leading to a rise in pH.",
    causes: [
      "Acute anxiety or panic attack",
      "Pain or fever",
      "Pulmonary Embolism (early sign)",
      "Early Sepsis",
      "Salicylate toxicity (early)"
    ],
    nextSteps: [
      "Treat underlying cause (analgesia, anxiolysis, antipyretics)",
      "Rule out Pulmonary Embolism and Sepsis",
      "Do NOT ask patient to breathe into a paper bag"
    ]
  },
  E: {
    meaning: "Chronic Respiratory Alkalosis suggests long-term hyperventilation. The kidneys have compensated by excreting bicarbonate to lower the pH.",
    causes: [
      "Pregnancy (normal physiological change)",
      "Chronic liver disease / Cirrhosis",
      "High altitude residence",
      "Hyperthyroidism"
    ],
    nextSteps: [
      "Evaluate for underlying chronic conditions",
      "Usually does not require acute correction",
      "Review medication list"
    ]
  },
  F: {
    meaning: "Chronic Metabolic Acidosis indicates a persistent acid load or bicarbonate loss. The respiratory system is compensating by blowing off CO₂.",
    causes: [
      "Chronic Kidney Disease (CKD)",
      "Renal Tubular Acidosis (RTA)",
      "Chronic diarrhea / ileostomy losses"
    ],
    nextSteps: [
      "Check renal function (BUN/Creatinine)",
      "Calculate Anion Gap to narrow differential",
      "Consider oral bicarbonate supplementation if indicated"
    ]
  },
  G: {
    meaning: "Acute Metabolic Acidosis is a dangerous drop in pH due to acid production or massive bicarbonate loss. Immediate investigation is required.",
    causes: [
      "Lactic Acidosis (Sepsis, Shock, Ischemia)",
      "Diabetic Ketoacidosis (DKA)",
      "Toxins (Methanol, Ethylene Glycol, Aspirin)",
      "Severe diarrhea"
    ],
    nextSteps: [
      "Calculate Anion Gap immediately",
      "Check Glucose, Lactate, and Ketones",
      "Treat underlying cause (Fluid resuscitation, Insulin, Dialysis)"
    ]
  },
  N: {
    meaning: "All primary acid-base parameters are within normal physiological limits.",
    causes: [
      "Normal healthy physiology",
      "Perfectly compensated mixed disorder (less likely without clinical suspicion)"
    ],
    nextSteps: [
      "Clinical correlation required",
      "No specific acid-base management needed"
    ]
  },
  X: {
    meaning: "Complex or Mixed Disorder. The values do not fit a simple primary pattern, suggesting multiple simultaneous pathologies.",
    causes: [
      "Combined pathology (e.g., COPD patient with Diuretics)",
      "Cardiac arrest (mixed metabolic and respiratory acidosis)",
      "Severe Sepsis with multi-organ failure"
    ],
    nextSteps: [
      "Expert review required",
      "Identify dominant disorder based on clinical context",
      "Treat life-threatening abnormalities first"
    ]
  }
};
