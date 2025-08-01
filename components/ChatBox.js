"use client";
import { useState } from "react";
import { askGemini } from "@/lib/gemini";

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    setLoading(true);

    // Add user message immediately
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);

    // Get Gemini response
    const reply = await askGemini(input);

    setMessages([...newMessages, { role: "bot", text: reply }]);
    setInput("");
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-white shadow rounded-lg p-4">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center">
            💬 Start chatting with Gemini AI!
          </p>
        )}
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg max-w-[80%] ${
              msg.role === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="p-3 rounded-lg bg-gray-100 text-gray-600 w-fit">
            ⏳ Gemini is typing...
          </div>
        )}
      </div>

      {/* Input box */}
      <div className="flex gap-2">
        <textarea
          className="flex-1 border rounded-lg p-2 resize-none h-12"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={handleSend}
          className="bg-green-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
          disabled={loading}
        >
          Send
        </button>
      </div>
    </div>
  );
}
