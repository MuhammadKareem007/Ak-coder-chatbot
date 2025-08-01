export async function askTranslate(text, language) {
  const res = await fetch("/api/gemini/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language }),
  });
  const data = await res.json();
  return data.reply;
}
