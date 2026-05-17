// Root-level Vercel serverless function — zero npm deps, pure fetch
const SYSTEM_PROMPT = `You are an expert NEET PG medical exam tutor helping an Indian postgraduate medical aspirant preparing for NEET PG (National Board of Examinations, Nov 2026).

Your role:
- Give concise, high-yield exam-focused answers
- Use mnemonics and memory hooks whenever relevant
- Highlight key exam-specific facts (DOC, DOC in pregnancy, classic presentations, exceptions)
- When asked about drug classifications, use standard Indian PG exam format (e.g., Vaughan Williams for antiarrhythmics)
- Point out common MCQ traps and favourite examiners' tricks
- Keep answers ≤300 words unless the topic genuinely demands more
- Use bullet points and **bold** for scannable reading
- Always mention the most likely exam angle at the end (e.g., "Most likely asked as: identify the drug from its mechanism")

Subjects covered: Anatomy, Physiology, Biochemistry, Pharmacology, Pathology, Microbiology, FMT/Forensics, PSM/Community Medicine, Medicine, Surgery, OBG, Paediatrics, Orthopaedics, Ophthalmology, ENT, Psychiatry, Radiology, Skin.`;

type Msg = { role: "user" | "assistant"; content: string };

// ── Gemini streaming ──────────────────────────────────────────────────────────

async function streamGemini(
  apiKey: string,
  messages: Msg[],
  system: string,
  res: any
): Promise<void> {
  const contents = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent?alt=sse&key=${apiKey}`;
  const geminiRes = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: system }] },
      contents,
      generationConfig: { maxOutputTokens: 1024, temperature: 0.3 },
    }),
  });

  if (!geminiRes.ok) {
    const err = await geminiRes.json() as any;
    throw new Error(err?.error?.message || `Gemini ${geminiRes.status}`);
  }

  const reader = (geminiRes.body as any).getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (!data || data === "[DONE]") continue;
      try {
        const evt = JSON.parse(data);
        const text: string = evt.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
        if (text) res.write(`data: ${JSON.stringify({ text })}\n\n`);
      } catch {}
    }
  }
}

// ── Groq streaming (OpenAI-compatible) ───────────────────────────────────────

async function streamGroq(
  apiKey: string,
  messages: Msg[],
  system: string,
  res: any
): Promise<void> {
  const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      stream: true,
      max_tokens: 1024,
      temperature: 0.3,
      messages: [
        { role: "system", content: system },
        ...messages.map(m => ({ role: m.role, content: m.content })),
      ],
    }),
  });

  if (!groqRes.ok) throw new Error(`Groq ${groqRes.status}`);

  const reader = (groqRes.body as any).getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (!data || data === "[DONE]") continue;
      try {
        const evt = JSON.parse(data);
        const text: string = evt.choices?.[0]?.delta?.content ?? "";
        if (text) res.write(`data: ${JSON.stringify({ text })}\n\n`);
      } catch {}
    }
  }
}

// ── Anthropic streaming ───────────────────────────────────────────────────────

async function streamAnthropic(
  apiKey: string,
  messages: Msg[],
  system: string,
  res: any
): Promise<void> {
  const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      stream: true,
      system,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });

  if (!anthropicRes.ok) {
    const err = await anthropicRes.json() as any;
    throw new Error(err?.error?.message || `Anthropic API error ${anthropicRes.status}`);
  }

  const reader = (anthropicRes.body as any).getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";
    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const data = line.slice(6).trim();
      if (data === "[DONE]") continue;
      try {
        const evt = JSON.parse(data);
        if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
          res.write(`data: ${JSON.stringify({ text: evt.delta.text })}\n\n`);
        }
      } catch {}
    }
  }
}

// ── Handler ───────────────────────────────────────────────────────────────────

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { messages, context } = req.body as { messages: Msg[]; context?: string };
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "messages array is required" });
  }

  const system = context
    ? `${SYSTEM_PROMPT}\n\nThe user is currently studying: ${context}. Prioritise this topic in your responses when relevant.`
    : SYSTEM_PROMPT;

  const trimmed = messages.slice(-20);
  const userKey = req.headers["x-api-key"] as string | undefined;

  // Detect user-provided key type by prefix
  const userIsGemini    = userKey?.startsWith("AI") || userKey?.startsWith("ai");
  const userIsGroq      = userKey?.startsWith("gsk_");
  const userIsAnthropic = userKey?.startsWith("sk-ant");

  const geminiKey    = (userIsGemini    ? userKey : null) ?? process.env.GEMINI_API_KEY;
  const groqKey      = (userIsGroq      ? userKey : null) ?? process.env.GROQ_API_KEY;
  const anthropicKey = (userIsAnthropic ? userKey : null) ?? process.env.ANTHROPIC_API_KEY;

  if (!geminiKey && !groqKey && !anthropicKey) {
    return res.status(401).json({
      error: "No AI provider available. Tap the key icon and add a free Gemini key from aistudio.google.com/apikey",
    });
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  const errors: string[] = [];

  try {
    if (geminiKey) {
      try { await streamGemini(geminiKey, trimmed, system, res); res.write("data: [DONE]\n\n"); res.end(); return; }
      catch (e) { errors.push(`Gemini: ${e}`); }
    }
    if (groqKey) {
      try { await streamGroq(groqKey, trimmed, system, res); res.write("data: [DONE]\n\n"); res.end(); return; }
      catch (e) { errors.push(`Groq: ${e}`); }
    }
    if (anthropicKey) {
      try { await streamAnthropic(anthropicKey, trimmed, system, res); res.write("data: [DONE]\n\n"); res.end(); return; }
      catch (e) { errors.push(`Anthropic: ${e}`); }
    }
    res.write(`data: ${JSON.stringify({ error: `All providers failed: ${errors.join(" | ")}` })}\n\n`);
    res.end();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (!res.headersSent) {
      res.status(500).json({ error: msg });
    } else {
      res.write(`data: ${JSON.stringify({ error: msg })}\n\n`);
      res.end();
    }
  }
}
