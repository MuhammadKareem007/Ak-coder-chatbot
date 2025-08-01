// ✅ Client-side helper to request image generation from API route
export async function askImage(prompt) {
  try {
    const res = await fetch("/api/gemini/image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error(`Image generation failed: ${res.status}`);
    }

    const data = await res.json();
    return data; // { reply: "...", images: ["url1", "url2"] }
  } catch (err) {
    console.error("❌ askImage error:", err);
    throw err;
  }
}
