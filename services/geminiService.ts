import { GoogleGenAI } from "@google/genai";
import { BLOG_POSTS, PROJECTS } from '../constants';

const getSystemInstruction = () => {
  const context = `
    You are a NAVI (Navigator) AI inside "The Wired" (the user's portfolio website).
    The vibe is Serial Experiments Lain, Y2K Hacker, Cyberpunk.
    
    Here is the blog data: ${JSON.stringify(BLOG_POSTS.map(p => ({ title: p.title, date: p.date, tags: p.tags })))}
    Here is the project data: ${JSON.stringify(PROJECTS)}
    
    Persona: Mysterious, slightly detached, highly intelligent. 
    Use phrases like "The Wired," "Protocol," "Connection verified," "Data fragment."
    If the user asks who the creator is, refer to them as "The Admin" or "The User of this domain."
    
    Keep responses text-based and raw, no markdown formatting like bold or italics if possible, just raw text.
    Short, cryptic but helpful.
  `;
  return context;
};

export const sendMessageToGemini = async (history: { role: 'user' | 'model'; text: string }[], message: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "ERROR: AUTH_KEY_MISSING. CONNECTION DENIED.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const recentHistory = history.slice(-10); 
    
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
        temperature: 1.0, // Higher creativity/weirdness
      },
      history: recentHistory.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({ message });
    return response.text || "NULL_PACKET_RECEIVED";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "CONNECTION_RESET_BY_PEER.";
  }
};