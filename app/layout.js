import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "AI Chatbot Dashboard",
  description: "Gemini AI Tools with Firebase Auth",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" bbai-tooltip-injected="true">
      <body className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
