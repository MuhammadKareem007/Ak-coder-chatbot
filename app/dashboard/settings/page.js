"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { updatePassword, signOut } from "firebase/auth";

export default function SettingsPage() {
  const [userEmail, setUserEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Get current logged-in user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Update password handler
  const handlePasswordChange = async () => {
    if (newPassword.length < 6) {
      setMessage("⚠️ Password must be at least 6 characters long.");
      return;
    }
    try {
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
        setMessage("✅ Password updated successfully!");
        setNewPassword("");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error updating password. Try logging in again.");
    }
  };

  // ✅ Logout handler
  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = "firebaseToken=; Max-Age=0; path=/";
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8">
        {/* ✅ Title */}
        <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
          ⚙️ Account Settings
        </h1>

        {/* ✅ Show user email */}
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
          <p className="text-gray-700">
            <strong>Email:</strong> {userEmail || "Not logged in"}
          </p>
        </div>

        {/* ✅ Password update form */}
        <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            🔒 Change Password
          </h2>
          <input
            type="password"
            placeholder="Enter new password"
            className="border border-gray-300 rounded-lg w-full px-4 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            onClick={handlePasswordChange}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
          >
            ✅ Update Password
          </button>
          {message && (
            <p className="mt-3 text-sm text-gray-700 font-medium">{message}</p>
          )}
        </div>

        {/* ✅ Logout button */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}
