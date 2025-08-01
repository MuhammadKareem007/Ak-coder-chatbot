"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);

  // ✅ Track login/logout state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      document.cookie = "firebaseToken=; Max-Age=0; path=/";
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="flex justify-between items-center bg-white shadow px-6 py-3">
      <h1 className="text-xl font-bold text-gray-900">AI Dashboard</h1>

      <div className="flex items-center gap-4">
        {/* ✅ Show email if logged in */}
        {user && (
          <span className="text-gray-700 font-medium">{user.email}</span>
        )}

        {/* ✅ Conditional buttons */}
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
