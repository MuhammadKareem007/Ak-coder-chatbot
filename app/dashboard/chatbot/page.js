"use client";
import { useState, useRef, useEffect } from "react";
import { askGemini } from "@/lib/askGemini";

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // ✅ Ask Gemini safely
  const handleAsk = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // ✅ Show "Thinking..."
    setMessages((prev) => [...prev, { sender: "bot", text: "⏳ Thinking..." }]);

    try {
      const reply = await askGemini(userMessage.text);

      // ✅ Replace "Thinking..." with AI reply
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: "bot", text: reply || "⚠️ No response from AI." },
      ]);
    } catch (error) {
      console.error("❌ Gemini API Error:", error);
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { sender: "bot", text: "⚠️ Error: Unable to get a response." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto-scroll latest message into view
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Proper code block rendering
  const renderMessageText = (text) => {
    const codeRegex = /```([\s\S]*?)```/g;

    if (codeRegex.test(text)) {
      return text.split(codeRegex).map((part, i) =>
        i % 2 === 1 ? (
          <pre
            key={i}
            className="bg-gray-900 text-green-300 text-sm font-mono p-3 rounded-lg overflow-x-auto mb-2"
          >
            {part.trim()}
          </pre>
        ) : (
          <span key={i} className="whitespace-pre-line">
            {part}
          </span>
        )
      );
    }
    return <span className="whitespace-pre-line">{text}</span>;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 font-sans">
      {/* ✅ Chat container */}
      <div className="flex flex-col w-full max-w-lg h-[600px] bg-white shadow-xl rounded-2xl overflow-hidden">
        {/* ✅ Header */}
        <header className="bg-blue-600 text-white text-lg font-bold p-4 text-center shadow">
          🤖 Gemini Chatbot
        </header>

        {/* ✅ Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center mt-20">
              💬 Start chatting with Gemini...
            </p>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl shadow-sm text-[15px] leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                }`}
              >
                {renderMessageText(msg.text)}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* ✅ Input box */}
        <div className="p-3 border-t bg-gray-50 flex gap-2">
          <input
            className="flex-1 border border-gray-300 p-2 rounded-full px-4 
                       focus:outline-none focus:ring-2 focus:ring-blue-400 
                       text-gray-900 placeholder-gray-500"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            disabled={loading}
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className={`px-5 py-2 rounded-full font-semibold shadow transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
