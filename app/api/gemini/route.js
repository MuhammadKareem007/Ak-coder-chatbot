import { NextResponse } from "next/server";
import { genAI } from "@/lib/gemini";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);

    return NextResponse.json({ reply: result.response.text() });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    return NextResponse.json(
      { reply: "⚠️ AI request failed." },
      { status: 500 }
    );
  }
}
