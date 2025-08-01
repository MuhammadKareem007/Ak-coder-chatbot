"use client";
import { useState } from "react";
import { askImage } from "@/lib/askImage";

export default function ImageToolPage() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError("");
    setMessages((prev) => [...prev, { role: "user", text: prompt }]);

    try {
      const { reply, images } = await askImage(prompt);
      setMessages((prev) => [...prev, { role: "bot", text: reply, images }]);
    } catch (err) {
      console.error(err);
      setError("⚠️ AI failed to generate image.");
    }

    setPrompt("");
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          🖼️ AI Image Editing Assistant
        </h1>

        <div className="space-y-4 h-[450px] overflow-y-auto">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center mt-20">
              💬 Describe what you want the image to look like...
            </p>
          )}

          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-900"
                }`}
              >
                <p>{m.text}</p>
                {m.images?.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt="Generated"
                    className="mt-3 rounded-xl shadow-md"
                  />
                ))}
              </div>
            </div>
          ))}

          {loading && (
            <div className="text-gray-500 text-sm italic">
              ⏳ Generating image...
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="A sunset over mountain lake in watercolor style"
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
          />
          <button
            disabled={loading}
            onClick={handleGenerate}
            className={`px-5 py-2 rounded-xl font-medium ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "..." : "Generate"}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
}
