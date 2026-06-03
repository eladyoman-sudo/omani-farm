import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages, system } = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { reply: "⚠️ لم يتم إعداد مفتاح API. أضف ANTHROPIC_API_KEY في .env.local" },
      { status: 200 }
    );
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return NextResponse.json({ reply: `خطأ: ${err}` }, { status: 200 });
  }

  const data = await response.json();
  return NextResponse.json({ reply: data.content[0].text });
}
