"use client";
import { useState } from "react";
import { askGemini } from "@/lib/askGemini";

export default function VoiceToolPage() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("French");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const reply = await askGemini(
        `Translate this text to ${language}: ${text}`
      );
      setResponse(reply);
    } catch (err) {
      console.error(err);
      setResponse("⚠️ Translation failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8">
        {/* ✅ Title */}
        <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          🎤 AI Voice & Text Translator
        </h1>

        {/* ✅ Textarea */}
        <textarea
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 placeholder-gray-400 shadow-sm"
          placeholder="✍️ Enter text to translate..."
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* ✅ Language Dropdown */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-gray-700 font-medium">
            🌍 Choose Language:
          </label>
          <select
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>French</option>
            <option>Spanish</option>
            <option>Urdu</option>
            <option>Chinese</option>
            <option>Arabic</option>
            <option>German</option>
          </select>
        </div>

        {/* ✅ Translate Button */}
        <button
          onClick={handleTranslate}
          disabled={loading}
          className={`mt-5 w-full px-5 py-3 rounded-xl font-semibold text-lg transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white shadow-md"
          }`}
        >
          {loading ? "⏳ Translating..." : "🚀 Translate"}
        </button>

        {/* ✅ Response Box */}
        {response && (
          <div className="mt-6 p-5 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              ✅ AK Coder Translation:
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap font-[Inter]">
              {response}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
