"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

type LoginMethod = "email" | "phone" | "google";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [method, setMethod] = useState<LoginMethod>("email");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!emailOrPhone || !password) {
      setError("الرجاء ملء جميع الحقول");
      return;
    }

    const success = await login(emailOrPhone, password);
    if (success) {
      router.push("/");
    } else {
      setError("بيانات الدخول غير صحيحة");
    }
  };

  const handleGoogleLogin = async () => {
    alert("Google Login قريباً!");
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 72px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#fafafa",
      padding: "40px 20px",
    }}>
      <div style={{ maxWidth: 420, width: "100%" }}>
        {/* Header */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#1a1a1a", marginBottom: "8px" }}>
            تسجيل الدخول
          </h1>
          <p style={{ fontSize: "14px", color: "#666666" }}>
            ادخل إلى حسابك في مزارع عُمان
          </p>
        </div>

        {/* Method Tabs */}
        <div style={{
          display: "flex",
          gap: "8px",
          marginBottom: "32px",
          background: "white",
          borderRadius: "16px",
          padding: "4px",
          border: "1px solid #e5e5e5",
        }}>
          {(["email", "phone", "google"] as LoginMethod[]).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              style={{
                flex: 1,
                padding: "10px 16px",
                borderRadius: "12px",
                border: "none",
                background: method === m ? "#15803d" : "transparent",
                color: method === m ? "white" : "#666666",
                fontWeight: method === m ? 600 : 500,
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 150ms",
              }}
            >
              {m === "email" && "📧 البريد"}
              {m === "phone" && "📱 الهاتف"}
              {m === "google" && "🔑 Google"}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{
          background: "white",
          borderRadius: "20px",
          border: "1px solid #e5e5e5",
          padding: "32px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.04)",
        }}>
          {error && (
            <div style={{
              background: "#fee2e2",
              border: "1px solid #fecaca",
              color: "#991b1b",
              padding: "12px 16px",
              borderRadius: "12px",
              marginBottom: "20px",
              fontSize: "14px",
            }}>
              {error}
            </div>
          )}

          {method === "email" && (
            <>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#666666", display: "block", marginBottom: "6px", fontWeight: 500 }}>
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="your@email.com"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "12px",
                    fontSize: "14px",
                    transition: "all 150ms",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#15803d")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e5e5")}
                />
              </div>
            </>
          )}

          {method === "phone" && (
            <>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#666666", display: "block", marginBottom: "6px", fontWeight: 500 }}>
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="+968 92345678"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "12px",
                    fontSize: "14px",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#15803d")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e5e5")}
                />
              </div>
            </>
          )}

          {method !== "google" && (
            <>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#666666", display: "block", marginBottom: "6px", fontWeight: 500 }}>
                  كلمة المرور
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "12px",
                    fontSize: "14px",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#15803d")}
                  onBlur={(e) => (e.target.style.borderColor = "#e5e5e5")}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  background: isLoading ? "#ccc" : "#15803d",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "all 150ms",
                  marginBottom: "16px",
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) (e.currentTarget as HTMLElement).style.background = "#0d5a2d";
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) (e.currentTarget as HTMLElement).style.background = "#15803d";
                }}
              >
                {isLoading ? "جاري التحميل..." : "دخول"}
              </button>
            </>
          )}

          {method === "google" && (
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "12px 16px",
                background: isLoading ? "#ccc" : "#ffffff",
                color: "#1a1a1a",
                border: "2px solid #15803d",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "14px",
                cursor: isLoading ? "not-allowed" : "pointer",
                transition: "all 150ms",
                marginBottom: "16px",
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  (e.currentTarget as HTMLElement).style.background = "#f5f5f5";
                  (e.currentTarget as HTMLElement).style.borderColor = "#0d5a2d";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  (e.currentTarget as HTMLElement).style.background = "#ffffff";
                  (e.currentTarget as HTMLElement).style.borderColor = "#15803d";
                }
              }}
            >
              {isLoading ? "جاري التحميل..." : "تسجيل دخول عبر Google"}
            </button>
          )}

          <div style={{ textAlign: "center", fontSize: "13px", color: "#666666" }}>
            ليس لديك حساب؟{" "}
            <Link href="/auth/signup" style={{ color: "#15803d", fontWeight: 600, textDecoration: "none" }}>
              إنشاء حساب
            </Link>
          </div>
        </form>

        {/* Demo credentials */}
        <div style={{
          marginTop: "32px",
          background: "#fffbeb",
          border: "1px solid #fcd34d",
          borderRadius: "12px",
          padding: "16px",
        }}>
          <div style={{ fontWeight: 600, color: "#92400e", marginBottom: "8px", fontSize: "13px" }}>
            💡 بيانات تجريبية:
          </div>
          <div style={{ fontSize: "12px", color: "#b45309", lineHeight: "1.6" }}>
            البريد: farmer@omani.com<br/>
            كلمة المرور: password123<br/>
            <br/>
            أو: trader@omani.com<br/>
            كلمة المرور: password123
          </div>
        </div>
      </div>
    </div>
  );
}
