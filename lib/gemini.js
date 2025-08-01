// ✅ Gemini Client Setup – Server-side ONLY
import { GoogleGenerativeAI } from "@google/generative-ai";

// ✅ Gemini client ko initialize karo (server env variable use karke)
export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
