import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    // ✅ API key secure tarike se env se lo
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return new Response(JSON.stringify({ reply: text }), { status: 200 });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return new Response(JSON.stringify({ error: "Gemini failed to respond" }), {
      status: 500,
    });
  }
}
