
import { GoogleGenAI } from "@google/genai";
import { AbgInputData, ClassificationResult } from "../types";

// Safety check for API key presence
const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getAbgInterpretation = async (
  input: AbgInputData,
  classification: ClassificationResult
): Promise<string> => {
  if (!API_KEY) {
    return "Error: API Key is missing. Please configure the environment.";
  }

  const prompt = `
You are a clinical decision-support assistant for Malaysian healthcare settings.
Analyze this ABG result:

pH: ${input.ph}
pCO2: ${input.pco2}
PO2: ${input.po2}
HCO3: ${input.hco3}
Base Excess: ${input.baseExcess}

Classified pattern: ${classification.name}
Category code: ${classification.code}

1. Explain in simple medical language what this ABG pattern means.
2. List possible causes.
3. Suggest general next steps the medical team should consider (monitoring, repeat ABG, supportive steps).
4. Do not give drug doses or specific prescriptions.
5. Add a safety disclaimer: The final clinical decision must follow hospital protocols and specialist review.

Format the output using Markdown. Use bolding for key terms.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // Speed over deep reasoning for this task
      }
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to retrieve AI interpretation. Please check your connection or API limit.";
  }
};
