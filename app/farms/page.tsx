"use client";
import { useState } from "react";
import { REGIONS } from "@/data/regions";
import { FARMS, getFarmsByRegion, getFarmsByType } from "@/data/farms";

const TYPE_COLORS = {
  "مزرعة": { bg: "#dcfce7", color: "#166534", emoji: "🚜" },
  "متجر": { bg: "#fef3c7", color: "#92400e", emoji: "🏪" },
  "مركز توزيع": { bg: "#dbeafe", color: "#1e40af", emoji: "📦" },
  "سوق": { bg: "#f3e8ff", color: "#6b21a8", emoji: "🏬" },
};

export default function FarmsPage() {
  const [filterRegion, setFilterRegion] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState<"rating" | "name" | "type">("rating");

  let filtered = FARMS;
  if (filterRegion !== "all") filtered = filtered.filter((f) => f.region === filterRegion);
  if (filterType !== "all") filtered = filtered.filter((f) => f.type === filterType);

  if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);
  else if (sortBy === "name") filtered.sort((a, b) => a.nameAr.localeCompare(b.nameAr, "ar"));
  else if (sortBy === "type") filtered.sort((a, b) => a.type.localeCompare(b.type, "ar"));

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#14532d" }}>🚜 المزارع والمتاجر الزراعية</h1>
        <p style={{ color: "#6b7280", marginTop: 4 }}>اكتشف جميع المزارع والمتاجر القريبة منك في عُمان</p>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: "1.5rem", display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>المحافظة</label>
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            style={{ border: "1px solid #d1fae5", borderRadius: 8, padding: "6px 10px", fontSize: 13, cursor: "pointer", background: "white" }}
          >
            <option value="all">كل المحافظات ({filtered.length})</option>
            {REGIONS.map((r) => {
              const count = getFarmsByRegion(r.id).length;
              return count > 0 ? (
                <option key={r.id} value={r.id}>
                  {r.nameAr} ({count})
                </option>
              ) : null;
            })}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>النوع</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{ border: "1px solid #d1fae5", borderRadius: 8, padding: "6px 10px", fontSize: 13, cursor: "pointer", background: "white" }}
          >
            <option value="all">جميع الأنواع</option>
            {["مزرعة", "متجر", "مركز توزيع", "سوق"].map((t) => {
              const count = getFarmsByType(t).length;
              return <option key={t} value={t}>{TYPE_COLORS[t as keyof typeof TYPE_COLORS].emoji} {t} ({count})</option>;
            })}
          </select>
        </div>

        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>الترتيب</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "rating" | "name" | "type")}
            style={{ border: "1px solid #d1fae5", borderRadius: 8, padding: "6px 10px", fontSize: 13, cursor: "pointer", background: "white" }}
          >
            <option value="rating">⭐ الأعلى تقييماً</option>
            <option value="name">🔤 حسب الاسم</option>
            <option value="type">📂 حسب النوع</option>
          </select>
        </div>

        <div style={{ marginLeft: "auto", fontSize: 13, color: "#6b7280", fontWeight: 500 }}>
          {filtered.length} مزرعة/متجر
        </div>
      </div>

      {/* Farms Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {filtered.map((farm) => {
          const tc = TYPE_COLORS[farm.type as keyof typeof TYPE_COLORS];
          const region = REGIONS.find((r) => r.id === farm.region);
          return (
            <div
              key={farm.id}
              className="card fade-in"
              style={{
                borderTop: `4px solid ${region?.color || "#15803d"}`,
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 20 }}>{tc.emoji}</span>
                    <h3 style={{ fontWeight: 700, fontSize: 16, color: "#1a2e1a", margin: 0 }}>{farm.nameAr}</h3>
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
                    {region?.nameAr} • {farm.type}
                  </div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#fbbf24" }}>⭐ {farm.rating}</div>
                  <div style={{ fontSize: 10, color: "#9ca3af" }}>تقييم</div>
                </div>
              </div>

              <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.6, margin: "10px 0" }}>
                {farm.description}
              </p>

              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                <span style={{ fontSize: 11, background: tc.bg, color: tc.color, padding: "3px 10px", borderRadius: 12 }}>
                  {tc.emoji} {farm.type}
                </span>
                <span style={{ fontSize: 11, background: "#f0fdf4", color: "#166534", padding: "3px 10px", borderRadius: 12 }}>
                  🌱 {farm.crops.length} محصول
                </span>
              </div>

              <div style={{ padding: "10px 12px", background: "#f9fafb", borderRadius: 8, border: "1px solid #e5e7eb", marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>📞 تواصل:</div>
                <div style={{ fontSize: 13, color: "#0891b2", fontFamily: "monospace", fontWeight: 500 }}>
                  {farm.phone}
                </div>
              </div>

              {farm.crops.length > 0 && farm.crops[0] !== "all" && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#374151", marginBottom: 6 }}>🌾 المحاصيل الرئيسية:</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {farm.crops.slice(0, 5).map((c) => (
                      <span key={c} style={{ fontSize: 10, background: "#dcfce7", color: "#166534", padding: "2px 8px", borderRadius: 10 }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
          <div style={{ fontSize: 64 }}>🔍</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "#4b5563", marginTop: 12 }}>
            لم نجد مزارع تطابق معاييرك
          </div>
          <div style={{ fontSize: 14, color: "#9ca3af", marginTop: 6 }}>
            جرّب تغيير المرشحات لتجد المزارع المناسبة
          </div>
        </div>
      )}
    </div>
  );
}
