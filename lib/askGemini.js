// ✅ Client-side helper to call our /api/gemini route securely

export async function askGemini(prompt) {
  try {
    const res = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error(`AI request failed: ${res.status}`);
    }

    const data = await res.json();
    return data.reply; // ✅ Sirf AI ka text reply return karega
  } catch (err) {
    console.error("❌ askGemini error:", err);
    throw err;
  }
}
