"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { REGIONS } from "@/data/regions";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div style={{
        minHeight: "calc(100vh - 72px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <div style={{ fontSize: "18px", color: "#666666" }}>جاري التحميل...</div>
      </div>
    );
  }

  const region = REGIONS.find((r) => r.id === user.region);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div style={{
      minHeight: "calc(100vh - 72px)",
      background: "#fafafa",
      padding: "60px 80px",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
          <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#1a1a1a" }}>
            الملف الشخصي
          </h1>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              background: "#fee2e2",
              color: "#991b1b",
              border: "none",
              borderRadius: "12px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 150ms",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#fecaca")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#fee2e2")}
          >
            تسجيل خروج
          </button>
        </div>

        {/* Profile Card */}
        <div style={{
          background: "white",
          borderRadius: "20px",
          border: "1px solid #e5e5e5",
          padding: "40px",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.04)",
          marginBottom: "32px",
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "40px", alignItems: "start" }}>
            {/* Avatar */}
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: user.role === "farmer" ? "#dcfce7" : "#fef3c7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "48px",
                margin: "0 auto 16px",
              }}>
                {user.role === "farmer" ? "👨‍🌾" : "🏪"}
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1a1a1a", marginBottom: "4px" }}>
                {user.name}
              </h2>
              <div style={{
                fontSize: "13px",
                background: user.role === "farmer" ? "#dcfce7" : "#fef3c7",
                color: user.role === "farmer" ? "#166534" : "#92400e",
                padding: "6px 12px",
                borderRadius: "12px",
                display: "inline-block",
                marginTop: "8px",
                fontWeight: 500,
              }}>
                {user.role === "farmer" ? "👨‍🌾 مزارع" : "🏪 تاجر"}
              </div>
            </div>

            {/* Details */}
            <div>
              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "12px", color: "#666666", fontWeight: 500, marginBottom: "6px" }}>
                  البريد الإلكتروني
                </div>
                <div style={{ fontSize: "16px", color: "#1a1a1a", fontWeight: 500 }}>
                  {user.email || "لم يتم تعيينه"}
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <div style={{ fontSize: "12px", color: "#666666", fontWeight: 500, marginBottom: "6px" }}>
                  رقم الهاتف
                </div>
                <div style={{ fontSize: "16px", color: "#1a1a1a", fontWeight: 500 }}>
                  {user.phone || "لم يتم تعيينه"}
                </div>
              </div>

              {region && (
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ fontSize: "12px", color: "#666666", fontWeight: 500, marginBottom: "6px" }}>
                    المحافظة
                  </div>
                  <div style={{ fontSize: "16px", color: "#1a1a1a", fontWeight: 500 }}>
                    {region.nameAr}
                  </div>
                </div>
              )}

              {user.rating && (
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ fontSize: "12px", color: "#666666", fontWeight: 500, marginBottom: "6px" }}>
                    التقييم
                  </div>
                  <div style={{ fontSize: "16px", color: "#1a1a1a", fontWeight: 500 }}>
                    ⭐ {user.rating}/5
                  </div>
                </div>
              )}

              {user.bio && (
                <div>
                  <div style={{ fontSize: "12px", color: "#666666", fontWeight: 500, marginBottom: "6px" }}>
                    النبذة الشخصية
                  </div>
                  <div style={{ fontSize: "16px", color: "#1a1a1a", lineHeight: 1.6 }}>
                    {user.bio}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Edit Button */}
          <div style={{ marginTop: "32px", paddingTop: "32px", borderTop: "1px solid #e5e5e5" }}>
            <button
              style={{
                padding: "12px 24px",
                background: "#15803d",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 150ms",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#0d5a2d")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#15803d")}
            >
              تعديل الملف الشخصي
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
        }}>
          <Link href="/market" style={{ textDecoration: "none" }}>
            <div style={{
              background: "white",
              borderRadius: "16px",
              border: "1px solid #e5e5e5",
              padding: "24px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 150ms",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0px 8px 16px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "";
              (e.currentTarget as HTMLElement).style.boxShadow = "0px 2px 8px rgba(0,0,0,0.04)";
            }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🛒</div>
              <div style={{ fontWeight: 600, color: "#1a1a1a", fontSize: "14px" }}>
                {user.role === "farmer" ? "بيع محاصيلي" : "اشتري محاصيل"}
              </div>
            </div>
          </Link>

          <Link href="/recommend" style={{ textDecoration: "none" }}>
            <div style={{
              background: "white",
              borderRadius: "16px",
              border: "1px solid #e5e5e5",
              padding: "24px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 150ms",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0px 8px 16px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "";
              (e.currentTarget as HTMLElement).style.boxShadow = "0px 2px 8px rgba(0,0,0,0.04)";
            }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🎯</div>
              <div style={{ fontWeight: 600, color: "#1a1a1a", fontSize: "14px" }}>
                التوصيات الشخصية
              </div>
            </div>
          </Link>

          <Link href="/farms" style={{ textDecoration: "none" }}>
            <div style={{
              background: "white",
              borderRadius: "16px",
              border: "1px solid #e5e5e5",
              padding: "24px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 150ms",
              boxShadow: "0px 2px 8px rgba(0,0,0,0.04)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0px 8px 16px rgba(0,0,0,0.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "";
              (e.currentTarget as HTMLElement).style.boxShadow = "0px 2px 8px rgba(0,0,0,0.04)";
            }}>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🚜</div>
              <div style={{ fontWeight: 600, color: "#1a1a1a", fontSize: "14px" }}>
                المزارع القريبة
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
