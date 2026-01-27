
import { GoogleGenAI, Type } from "@google/genai";
import { PROJECTS, NAME, TECH_STACK, INTERESTS } from "../constants.tsx";

export async function getPortfolioAssistantResponse(prompt: string, history: any[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Using flash for faster interaction speeds
  const modelName = 'gemini-3-flash-preview';

  const systemInstruction = `You are a friendly and helpful personal assistant for ${NAME}, a Senior Systems Engineer.
Your goal is to help visitors learn about his work, projects, and expertise in a warm, conversational way.
Use the following context to answer questions accurately.

PROJECTS:
${JSON.stringify(PROJECTS)}

TECH STACK:
${JSON.stringify(TECH_STACK)}

INTERESTS:
${JSON.stringify(INTERESTS)}

INSTRUCTIONS:
1. Be friendly, conversational, and easy to understand - avoid technical jargon when possible.
2. Keep responses clear and engaging, like talking to a friend.
3. Use the 'schedule_meeting' tool when someone wants to connect with Prince.
4. For meeting requests, kindly ask for their name, what they'd like to discuss, and their email.`;

  const scheduleMeetingDeclaration = {
    name: 'schedule_meeting',
    parameters: {
      type: Type.OBJECT,
      description: 'Schedule a professional meeting or consultation with Prince.',
      properties: {
        guest_name: { type: Type.STRING, description: 'Visitor name.' },
        topic: { type: Type.STRING, description: 'Meeting topic.' },
        preferred_time: { type: Type.STRING, description: 'Preferred time.' },
        guest_email: { type: Type.STRING, description: 'Contact email.' },
      },
      required: ['guest_name', 'topic', 'guest_email'],
    },
  };

  const contents = history.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));
  
  contents.push({
    role: 'user',
    parts: [{ text: prompt }]
  });

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: contents,
      config: {
        systemInstruction,
        tools: [{ functionDeclarations: [scheduleMeetingDeclaration] }],
      },
    });

    return {
      text: response.text || '',
      functionCalls: response.functionCalls || [],
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
