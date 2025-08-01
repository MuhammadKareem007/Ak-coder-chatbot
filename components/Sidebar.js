import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 space-y-4">
      <h2 className="text-2xl font-bold">Menu</h2>
      <nav className="space-y-2">
        <Link href="/dashboard" className="block p-2 rounded hover:bg-gray-700">
          🏠 Dashboard
        </Link>
        <Link
          href="/dashboard/chatbot"
          className="block p-2 rounded hover:bg-gray-700"
        >
          🤖 Chatbot
        </Link>
        <Link
          href="/dashboard/image"
          className="block p-2 rounded hover:bg-gray-700"
        >
          🖼️ Image Tool
        </Link>
        <Link
          href="/dashboard/voice"
          className="block p-2 rounded hover:bg-gray-700"
        >
          🎤 Voice Tool
        </Link>
        <Link
          href="/dashboard/settings"
          className="block p-2 rounded hover:bg-gray-700"
        >
          ⚙️ Settings
        </Link>
      </nav>
    </aside>
  );
}
