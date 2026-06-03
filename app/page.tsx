"use client";
import Link from "next/link";
import { REGIONS } from "@/data/regions";
import { CROPS } from "@/data/crops";

const features = [
  { icon: "🗺️", title: "خريطة تفاعلية", desc: "اكتشف مناطق عُمان الزراعية والأفلاج والآبار", href: "/map", bgColor: "#f0fdf4", borderColor: "#bbf7d0" },
  { icon: "📅", title: "تقويم زراعي", desc: "اعرف أفضل محاصيل كل شهر في منطقتك", href: "/calendar", bgColor: "#fef3c7", borderColor: "#fcd34d" },
  { icon: "🎯", title: "توصيات شخصية", desc: "اختر محافظتك واحصل على المحاصيل المثالية", href: "/recommend", bgColor: "#dbeafe", borderColor: "#93c5fd" },
  { icon: "🛒", title: "سوق المحاصيل", desc: "بع واشتري المحاصيل الطازجة مباشرة", href: "/market", bgColor: "#fce7f3", borderColor: "#f9a8d4" },
  { icon: "🚜", title: "المزارع والمتاجر", desc: "اعثر على مزارع وتجار قريبين منك", href: "/farms", bgColor: "#e0e7ff", borderColor: "#c4b5fd" },
  { icon: "💧", title: "الأفلاج والآبار", desc: "اعرف مصادر المياه التراثية في كل منطقة", href: "/map", bgColor: "#e0f2fe", borderColor: "#7dd3fc" },
];

export default function HomePage() {
  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      {/* Hero Section */}
      <div style={{ paddingTop: "60px", paddingBottom: "80px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", paddingRight: "80px", paddingLeft: "80px" }}>
          <h1 style={{ fontSize: "48px", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2, marginBottom: "16px" }}>
            زرع بذكاء في أرض عُمان
          </h1>
          <p style={{ fontSize: "18px", color: "#666666", marginBottom: "40px", maxWidth: "600px", lineHeight: 1.6 }}>
            اعرف المحاصيل المناسبة لمنطقتك، في الوقت المناسب — مع دليل الأفلاج والآبار والسوق الزراعي
          </p>
          <Link href="/recommend">
            <button style={{
              background: "white", color: "#15803d", padding: "16px 32px",
              borderRadius: "30px", fontWeight: 600, border: "2px solid #15803d",
              cursor: "pointer", fontSize: "16px", transition: "all 150ms",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.background = "#f5f5f5";
              (e.target as HTMLElement).style.boxShadow = "0px 4px 12px rgba(21, 128, 61, 0.15)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.background = "white";
              (e.target as HTMLElement).style.boxShadow = "";
            }}>
              ابدأ الآن ← اختر منطقتك
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ paddingBottom: "100px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", paddingRight: "80px", paddingLeft: "80px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              { num: "11", label: "محافظة عُمانية" },
              { num: `${CROPS.length}+`, label: "نوع محصول" },
              { num: "8+", label: "أفلاج تراثية" },
              { num: "12", label: "شهر تغطية" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "white", borderRadius: "20px", border: "1px solid #e5e5e5",
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.04)", padding: "24px",
                  textAlign: "center", transition: "all 150ms", cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0px 8px 16px rgba(0,0,0,0.08)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0px 2px 8px rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                <div style={{ fontSize: "32px", fontWeight: 800, color: "#15803d", marginBottom: "8px" }}>
                  {stat.num}
                </div>
                <div style={{ fontSize: "14px", color: "#666666" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{ paddingBottom: "100px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", paddingRight: "80px", paddingLeft: "80px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#1a1a1a", marginBottom: "40px" }}>
            ماذا يقدم التطبيق؟
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {features.map((f) => (
              <Link key={f.title} href={f.href} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: f.bgColor, borderRadius: "20px", border: `1px solid ${f.borderColor}`,
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.04), 0px 0px 1px rgba(0,0,0,0.08)",
                    padding: "32px", cursor: "pointer", transition: "all 250ms", minHeight: "200px",
                    display: "flex", flexDirection: "column",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0px 8px 16px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0px 2px 8px rgba(0,0,0,0.04), 0px 0px 1px rgba(0,0,0,0.08)";
                  }}
                >
                  <div style={{ fontSize: "40px", marginBottom: "16px" }}>{f.icon}</div>
                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a1a", marginBottom: "12px" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "#666666", lineHeight: 1.6, flex: 1 }}>
                    {f.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Regions Section */}
      <div style={{ paddingBottom: "100px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", paddingRight: "80px", paddingLeft: "80px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 700, color: "#1a1a1a", marginBottom: "40px" }}>
            المحافظات العُمانية الـ 11
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            {REGIONS.map((r) => (
              <Link key={r.id} href={`/recommend?region=${r.id}`} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    background: "white", borderRadius: "16px", border: "1px solid #e5e5e5",
                    borderRight: `4px solid ${r.color}`,
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.04), 0px 0px 1px rgba(0,0,0,0.08)",
                    padding: "16px", cursor: "pointer", transition: "all 150ms", height: "120px",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0px 8px 16px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0px 2px 8px rgba(0,0,0,0.04), 0px 0px 1px rgba(0,0,0,0.08)";
                  }}
                >
                  <div style={{ fontWeight: 600, color: "#1a1a1a", fontSize: "15px", marginBottom: "4px" }}>
                    {r.nameAr}
                  </div>
                  <div style={{ fontSize: "12px", color: "#999999", lineHeight: 1.4 }}>
                    {r.climate.length > 35 ? r.climate.slice(0, 35) + "..." : r.climate}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: "white", borderTop: "1px solid #e5e5e5",
        padding: "60px 80px", textAlign: "center", color: "#666666", fontSize: "14px"
      }}>
        <p>🌴 مزارع عُمان — دليلك الزراعي الذكي</p>
      </footer>
    </div>
  );
}
