"use client";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-6">
      {/* ✅ Stylish Header */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-white rounded-xl shadow-lg p-6 mb-8">
        <h1 className="text-4xl font-extrabold mb-2">
          🎉 Welcome to AI Dashboard
        </h1>
        <p className="text-lg opacity-90">
          Explore the power of <span className="font-semibold">Gemini AI</span>{" "}
          tools!
        </p>
      </div>

      {/* ✅ Features Section */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        {/* ✅ Chatbot Card */}
        <Link href="/dashboard/chatbot">
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all cursor-pointer">
            <h2 className="text-xl font-bold text-gray-900 mb-2">🤖 Chatbot</h2>
            <p className="text-gray-600 text-sm">
              Ask Gemini anything and get smart, human‑like answers instantly.
            </p>
          </div>
        </Link>

        {/* ✅ Image Tool Card */}
        <Link href="/dashboard/image">
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-xl hover:border-purple-400 hover:-translate-y-1 transition-all cursor-pointer">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              🖼️ Image Tool
            </h2>
            <p className="text-gray-600 text-sm">
              Generate creative edits or transform images with AI assistance.
            </p>
          </div>
        </Link>

        {/* ✅ Voice Tool Card */}
        <Link href="/dashboard/voice">
          <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-xl hover:border-pink-400 hover:-translate-y-1 transition-all cursor-pointer">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              🎤 Voice Tool
            </h2>
            <p className="text-gray-600 text-sm">
              Convert, translate, or enhance speech with advanced AI voice tech.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
