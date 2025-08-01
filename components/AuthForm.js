"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      // ✅ Get Firebase ID token
      const token = await userCredential.user.getIdToken();

      // ✅ Save token in cookie for middleware
      document.cookie = `firebaseToken=${token}; path=/`;

      // ✅ Redirect to dashboard
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError("⚠️ Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 border border-gray-200"
      >
        {/* ✅ Title */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {isLogin ? "Welcome Back 👋" : "Create Account ✨"}
        </h2>

        {/* ✅ Error */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
        )}

        {/* ✅ Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="your@email.com"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-900"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* ✅ Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-500 text-gray-900"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* ✅ Submit Button */}
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all duration-300">
          {isLogin ? "Login" : "Sign Up"}
        </button>

        {/* ✅ Switch to Login/Register */}
        <p
          className="mt-4 text-center text-sm text-blue-600 cursor-pointer hover:underline"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "✨ Create an account"
            : "🔑 Already have an account? Login"}
        </p>
      </form>
    </div>
  );
}
