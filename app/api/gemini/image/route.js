import { NextResponse } from "next/server";
import { genAI } from "@/lib/gemini";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "❌ Prompt is required" }, { status: 400 });
    }

    // ✅ Gemini ka text model use kar rahe hain (fallback mode)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // ✅ Gemini se response lo (image description ke liye)
    const result = await model.generateContent(
      `Create an AI-generated image description for: ${prompt}`
    );

    const reply = result.response.text();

    // 🚨 Yahan pe filhal dummy image URL send kar rahe hain (fallback ke liye)
    // ✅ Jab Imagen-3.0 model enable ho jaye to yahan real Base64 images send karenge
    const dummyImage = "https://placehold.co/600x400?text=AI+Image";

    return NextResponse.json({ reply, images: [dummyImage] });
  } catch (error) {
    console.error("❌ Gemini Image API Error:", error);
    return NextResponse.json({ error: "Image generation failed" }, { status: 500 });
  }
}
