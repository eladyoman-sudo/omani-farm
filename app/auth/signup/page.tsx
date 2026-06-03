"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { REGIONS } from "@/data/regions";

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [step, setStep] = useState(1); // 1: method, 2: details, 3: verification
  const [method, setMethod] = useState<"email" | "phone" | "google">("email");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "farmer" as "farmer" | "trader",
    region: "",
  });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    setError("");
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!formData.name) {
        setError("الرجاء إدخال الاسم");
        return;
      }
      if (method === "email") {
        if (!formData.email) {
          setError("الرجاء إدخال البريد الإلكتروني");
          return;
        }
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setError("البريد الإلكتروني غير صحيح");
          return;
        }
      } else if (method === "phone") {
        if (!formData.phone) {
          setError("الرجاء إدخال رقم الهاتف");
          return;
        }
      }
      if (!formData.password || formData.password.length < 6) {
        setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("كلمات المرور غير متطابقة");
        return;
      }
      if (!formData.role) {
        setError("الرجاء اختيار نوع الحساب");
        return;
      }
      setStep(3);
    }
  };

  const handleSubmit = async () => {
    setError("");
    setIsLoading(true);

    try {
      const success = await signup({
        name: formData.name,
        email: method === "email" ? formData.email : undefined,
        phone: method === "phone" ? formData.phone : undefined,
        password: formData.password,
        role: formData.role,
        region: formData.region,
      });

      if (success) {
        router.push("/");
      } else {
        setError("فشل إنشاء الحساب");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    alert("Google Sign-up قريباً!");
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
            إنشاء حساب جديد
          </h1>
          <p style={{ fontSize: "14px", color: "#666666" }}>
            انضم إلى مجتمع مزارع عُمان
          </p>
        </div>

        {/* Progress */}
        <div style={{
          display: "flex",
          gap: "8px",
          marginBottom: "32px",
          justifyContent: "center",
        }}>
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                background: s <= step ? "#15803d" : "#e5e5e5",
                color: s <= step ? "white" : "#999999",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{
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
              fontSize: "13px",
            }}>
              {error}
            </div>
          )}

          {/* Step 1: Method Selection */}
          {step === 1 && (
            <>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#666666", display: "block", marginBottom: "12px", fontWeight: 500 }}>
                  اختر طريقة التسجيل
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {(["email", "phone", "google"] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMethod(m)}
                      style={{
                        padding: "12px 16px",
                        border: method === m ? "2px solid #15803d" : "1px solid #e5e5e5",
                        background: method === m ? "#f0fdf4" : "white",
                        borderRadius: "12px",
                        cursor: "pointer",
                        textAlign: "right",
                        transition: "all 150ms",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#1a1a1a",
                      }}
                    >
                      {m === "email" && "📧 البريد الإلكتروني"}
                      {m === "phone" && "📱 رقم الهاتف (OTP)"}
                      {m === "google" && "🔑 Google"}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <>
              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#666666", display: "block", marginBottom: "6px", fontWeight: 500 }}>
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="أحمد محمد"
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

              {method === "email" && (
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "13px", color: "#666666", display: "block", marginBottom: "6px", fontWeight: 500 }}>
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
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
              )}

              {method === "phone" && (
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ fontSize: "13px", color: "#666666", display: "block", marginBottom: "6px", fontWeight: 500 }}>
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
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
              )}

              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#666666", display: "block", marginBottom: "6px", fontWeight: 500 }}>
                  كلمة المرور
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
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

              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#666666", display: "block", marginBottom: "6px", fontWeight: 500 }}>
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
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

              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#666666", display: "block", marginBottom: "6px", fontWeight: 500 }}>
                  نوع الحساب
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "12px",
                    fontSize: "14px",
                    background: "white",
                    cursor: "pointer",
                  }}
                >
                  <option value="farmer">👨‍🌾 مزارع</option>
                  <option value="trader">🏪 تاجر/متجر</option>
                </select>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ fontSize: "13px", color: "#666666", display: "block", marginBottom: "6px", fontWeight: 500 }}>
                  المحافظة (اختياري)
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "1px solid #e5e5e5",
                    borderRadius: "12px",
                    fontSize: "14px",
                    background: "white",
                    cursor: "pointer",
                  }}
                >
                  <option value="">-- اختر محافظة --</option>
                  {REGIONS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.nameAr}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Step 3: Verification */}
          {step === 3 && (
            <>
              <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a", marginBottom: "8px" }}>
                  تم إنشاء الحساب بنجاح!
                </h2>
                <p style={{ fontSize: "14px", color: "#666666" }}>
                  أهلاً وسهلاً في مزارع عُمان
                </p>
              </div>
            </>
          )}

          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  background: "white",
                  color: "#15803d",
                  border: "2px solid #15803d",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
              >
                السابق
              </button>
            )}

            {step < 3 && (
              <button
                onClick={handleNext}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  background: "#15803d",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: "pointer",
                  transition: "all 150ms",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#0d5a2d")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#15803d")}
              >
                التالي
              </button>
            )}

            {step === 3 && (
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  background: isLoading ? "#ccc" : "#15803d",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  transition: "all 150ms",
                }}
              >
                {isLoading ? "جاري التحميل..." : "ابدأ الآن"}
              </button>
            )}
          </div>

          {step === 1 && method === "google" && (
            <button
              type="button"
              onClick={handleGoogleSignup}
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
                marginTop: "12px",
              }}
            >
              {isLoading ? "جاري التحميل..." : "تسجيل عبر Google"}
            </button>
          )}

          <div style={{ textAlign: "center", fontSize: "13px", color: "#666666", marginTop: "16px" }}>
            هل لديك حساب بالفعل؟{" "}
            <Link href="/auth/login" style={{ color: "#15803d", fontWeight: 600, textDecoration: "none" }}>
              تسجيل دخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
