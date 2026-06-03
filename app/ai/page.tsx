"use client";
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS = [
  "ما هي أفضل محاصيل الباطنة الشمالية؟",
  "متى أزرع التمور في عُمان؟",
  "كيف أتعامل مع ملوحة التربة؟",
  "ما هي الأفلاج وكيف أستفيد منها؟",
  "ما هي محاصيل الخريف في ظفار؟",
  "كيف أزرع الليمون العُماني؟",
];

const KNOWLEDGE_BASE = `
أنت خبير زراعي عُماني متخصص. لديك معرفة شاملة بـ:
- المحافظات العُمانية الـ 11 ومناخها وتربتها
- المحاصيل التقليدية: التمور، الليمون، المانجو، الموز، الرمان
- نظام الأفلاج التراثي (5 أفلاج مدرجة في يونسكو: داريس، الخطمين، المالكي، الميسر، الجيلة)
- مواسم الزراعة والحصاد لكل محصول
- إدارة ملوحة التربة في المناطق الساحلية
- خريف ظفار الفريد (يوليو-سبتمبر) ومحاصيله
- الزراعة في المناطق الجبلية كالجبل الأخضر
- أصناف التمور العُمانية: الخلاص، الفرض، الخنيزي، الحلوة

أجب دائماً بالعربية، بأسلوب ودي ومفيد، مع نصائح عملية قابلة للتطبيق.
`;

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "مرحباً! أنا مساعدك الزراعي الذكي 🌱\n\nأنا متخصص في الزراعة العُمانية وأعرف كل شيء عن محاصيل عُمان، الأفلاج، التربة، والمواسم الزراعية.\n\nكيف يمكنني مساعدتك اليوم؟",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          system: KNOWLEDGE_BASE,
        }),
      });

      if (!response.ok) throw new Error("فشل الاتصال");

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ عذراً، حدث خطأ في الاتصال. يرجى التحقق من إعداد مفتاح API أو المحاولة لاحقاً.\n\n💡 لتفعيل الـ AI، أضف `ANTHROPIC_API_KEY` في ملف `.env.local`",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem 1rem", height: "calc(100vh - 130px)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#14532d" }}>🤖 المساعد الزراعي الذكي</h1>
        <p style={{ color: "#6b7280", fontSize: 14 }}>اسأل عن أي شيء يخص الزراعة العُمانية</p>
      </div>

      {/* Quick Questions */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "1rem" }}>
        {QUICK_QUESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            disabled={loading}
            style={{
              fontSize: 12, padding: "5px 12px", borderRadius: 20,
              border: "1px solid #bbf7d0", background: "#f0fdf4", color: "#166534",
              cursor: "pointer", transition: "all 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#dcfce7")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f0fdf4")}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat */}
      <div
        style={{
          flex: 1, overflowY: "auto", background: "white", borderRadius: "1rem",
          border: "1px solid #dcfce7", padding: "1.25rem", marginBottom: "1rem",
          display: "flex", flexDirection: "column", gap: 14,
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              gap: 10,
            }}
          >
            {msg.role === "assistant" && (
              <div style={{
                width: 36, height: 36, borderRadius: "50%", background: "#15803d",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, flexShrink: 0, marginTop: 4,
              }}>
                🌴
              </div>
            )}
            <div
              style={{
                maxWidth: "75%",
                background: msg.role === "user" ? "#15803d" : "#f0fdf4",
                color: msg.role === "user" ? "white" : "#1a2e1a",
                padding: "10px 14px",
                borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                fontSize: 14,
                lineHeight: 1.7,
                whiteSpace: "pre-wrap",
                border: msg.role === "assistant" ? "1px solid #dcfce7" : "none",
              }}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div style={{
                width: 36, height: 36, borderRadius: "50%", background: "#e5e7eb",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, flexShrink: 0, marginTop: 4,
              }}>
                👤
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: "50%", background: "#15803d",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
            }}>🌴</div>
            <div style={{ background: "#f0fdf4", border: "1px solid #dcfce7", borderRadius: "4px 16px 16px 16px", padding: "14px 18px" }}>
              <span style={{ display: "inline-flex", gap: 4 }}>
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    style={{
                      width: 8, height: 8, borderRadius: "50%", background: "#15803d",
                      display: "inline-block",
                      animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ display: "flex", gap: 10 }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage(input)}
          placeholder="اسأل عن الزراعة العُمانية... (اضغط Enter للإرسال)"
          disabled={loading}
          style={{
            flex: 1, border: "1px solid #bbf7d0", borderRadius: 12, padding: "12px 16px",
            fontSize: 14, outline: "none", background: "white",
          }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          className="btn-primary"
          style={{ padding: "12px 20px", fontSize: 15, opacity: loading || !input.trim() ? 0.6 : 1 }}
        >
          إرسال ←
        </button>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 60%, 100% { opacity: 0.3; transform: scale(0.8); }
          30% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
