import { NextResponse } from "next/server";
import { genAI } from "@/lib/gemini";

export async function POST(req) {
  try {
    const { text, language } = await req.json();
    if (!text || !language) {
      return NextResponse.json(
        { error: "Text & Language are required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(
      `Translate this text to ${language}: ${text}`
    );

    return NextResponse.json({ reply: result.response.text() });
  } catch (error) {
    console.error("❌ Translate API Error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
