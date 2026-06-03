"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { REGIONS, getRegionById } from "@/data/regions";
import { CROPS, MONTHS_AR, getCropsByRegionAndMonth, getCropsByRegion } from "@/data/crops";

const CATEGORY_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  dates:      { label: "🌴 تمور", color: "#92400e", bg: "#fef3c7" },
  fruits:     { label: "🍎 فواكه", color: "#be185d", bg: "#fce7f3" },
  vegetables: { label: "🥬 خضروات", color: "#166534", bg: "#dcfce7" },
  herbs:      { label: "🌿 أعشاب", color: "#065f46", bg: "#d1fae5" },
  grains:     { label: "🌾 حبوب", color: "#713f12", bg: "#fef9c3" },
  fodder:     { label: "🌱 علف", color: "#3f6212", bg: "#ecfccb" },
};

function RecommendContent() {
  const searchParams = useSearchParams();
  const regionParam = searchParams.get("region");

  const [selectedRegion, setSelectedRegion] = useState(regionParam || "");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    if (regionParam) setSelectedRegion(regionParam);
  }, [regionParam]);

  const region = getRegionById(selectedRegion);
  const allRegionCrops = selectedRegion ? getCropsByRegion(selectedRegion) : [];
  const monthCrops = selectedRegion
    ? getCropsByRegionAndMonth(selectedRegion, selectedMonth).filter(
        (c) => filterCategory === "all" || c.category === filterCategory
      )
    : [];

  const categories = [...new Set(allRegionCrops.map((c) => c.category))];

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#14532d" }}>🎯 توصيات مخصصة</h1>
        <p style={{ color: "#6b7280", marginTop: 4 }}>اختر محافظتك والشهر واحصل على قائمة المحاصيل المثالية</p>
      </div>

      {/* Region Selector */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: "#14532d", marginBottom: 12 }}>📍 اختر محافظتك</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: selectedRegion === r.id ? `2px solid ${r.color}` : "1px solid #e5e7eb",
                background: selectedRegion === r.id ? r.color + "20" : "white",
                cursor: "pointer",
                textAlign: "right",
                transition: "all 0.2s",
                borderRight: `4px solid ${r.color}`,
              }}
            >
              <div style={{ fontWeight: selectedRegion === r.id ? 700 : 500, fontSize: 13, color: "#1a2e1a" }}>
                {r.nameAr}
              </div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{r.nameEn}</div>
            </button>
          ))}
        </div>
      </div>

      {region && (
        <>
          {/* Region Info */}
          <div
            className="card fade-in"
            style={{
              marginBottom: "1.5rem",
              background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
              border: `2px solid ${region.color}`,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>المنطقة</div>
                <div style={{ fontWeight: 700, color: "#14532d", fontSize: 16 }}>{region.nameAr}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>المناخ</div>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{region.climate}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>نوع التربة</div>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{region.soilType}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>مصادر المياه</div>
                <div style={{ fontWeight: 500, fontSize: 13 }}>{region.waterSources.join("، ")}</div>
              </div>
            </div>
          </div>

          {/* Month Selector */}
          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "#14532d", marginBottom: 12 }}>📅 اختر الشهر</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 6 }}>
              {MONTHS_AR.map((m, i) => {
                const mn = i + 1;
                const count = getCropsByRegionAndMonth(selectedRegion, mn).length;
                return (
                  <button
                    key={mn}
                    onClick={() => setSelectedMonth(mn)}
                    style={{
                      padding: "8px 4px", borderRadius: 8, textAlign: "center",
                      border: selectedMonth === mn ? "2px solid #15803d" : "1px solid #e5e7eb",
                      background: selectedMonth === mn ? "#15803d" : count > 0 ? "#f0fdf4" : "white",
                      color: selectedMonth === mn ? "white" : "#374151",
                      cursor: "pointer", transition: "all 0.15s",
                    }}
                  >
                    <div style={{ fontSize: 11, fontWeight: 600 }}>{m.slice(0, 4)}</div>
                    {count > 0 && (
                      <div style={{ fontSize: 10, marginTop: 2, opacity: 0.8 }}>{count}</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div style={{ display: "flex", gap: 8, marginBottom: "1.25rem", flexWrap: "wrap" }}>
              <button
                onClick={() => setFilterCategory("all")}
                className={filterCategory === "all" ? "btn-primary" : "btn-secondary"}
                style={{ fontSize: 12, padding: "5px 14px" }}
              >
                الكل ({allRegionCrops.length})
              </button>
              {categories.map((cat) => {
                const info = CATEGORY_LABELS[cat];
                const count = allRegionCrops.filter((c) => c.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    style={{
                      fontSize: 12, padding: "5px 14px", borderRadius: 20,
                      border: filterCategory === cat ? "none" : `1px solid ${info.bg}`,
                      background: filterCategory === cat ? info.color : info.bg,
                      color: filterCategory === cat ? "white" : info.color,
                      cursor: "pointer",
                    }}
                  >
                    {info.label} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Results */}
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#14532d", marginBottom: 12 }}>
            🌱 محاصيل {MONTHS_AR[selectedMonth - 1]} في {region.nameAr}
            <span style={{ fontSize: 14, background: "#dcfce7", color: "#15803d", padding: "3px 12px", borderRadius: 20, marginRight: 10, fontWeight: 500 }}>
              {monthCrops.length} محصول
            </span>
          </h2>

          {monthCrops.length === 0 ? (
            <div className="card" style={{ textAlign: "center", padding: "3rem", color: "#9ca3af" }}>
              <div style={{ fontSize: 48 }}>🌧️</div>
              <div style={{ fontWeight: 600, fontSize: 16, marginTop: 12 }}>لا توجد توصيات لهذا الشهر</div>
              <div style={{ fontSize: 13, marginTop: 6 }}>جرب شهراً آخر أو محافظة مختلفة</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
              {monthCrops.map((crop) => {
                const cat = CATEGORY_LABELS[crop.category];
                return (
                  <div key={crop.id} className="card fade-in" style={{ display: "flex", gap: 14 }}>
                    <div style={{ fontSize: 40, lineHeight: 1 }}>{crop.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 700, fontSize: 16 }}>{crop.nameAr}</span>
                        <span style={{ fontSize: 11, background: cat.bg, color: cat.color, padding: "2px 8px", borderRadius: 12 }}>
                          {cat.label}
                        </span>
                        <span style={{
                          fontSize: 11, padding: "2px 8px", borderRadius: 12,
                          background: crop.waterNeeds === "منخفضة" ? "#dcfce7" : crop.waterNeeds === "متوسطة" ? "#fef3c7" : "#fee2e2",
                          color: crop.waterNeeds === "منخفضة" ? "#166534" : crop.waterNeeds === "متوسطة" ? "#92400e" : "#991b1b",
                        }}>
                          💧 {crop.waterNeeds}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.6, margin: 0 }}>{crop.description}</p>
                      <div style={{ marginTop: 8, padding: "8px 10px", background: "#fffbeb", borderRadius: 8, border: "1px solid #fde68a" }}>
                        <span style={{ fontSize: 12, color: "#92400e" }}>💡 <strong>نصيحة:</strong> {crop.tips}</span>
                      </div>
                      <div style={{ marginTop: 6, fontSize: 11, color: "#9ca3af" }}>
                        🌾 الحصاد: {crop.harvestMonths.map((m) => MONTHS_AR[m - 1]).join("، ")}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {!selectedRegion && (
        <div className="card" style={{ textAlign: "center", padding: "4rem", color: "#9ca3af" }}>
          <div style={{ fontSize: 60 }}>🗺️</div>
          <div style={{ fontWeight: 600, fontSize: 18, marginTop: 16, color: "#4b5563" }}>
            اختر محافظتك من الأعلى لتحصل على توصيات مخصصة
          </div>
        </div>
      )}
    </div>
  );
}

export default function RecommendPage() {
  return (
    <Suspense fallback={<div style={{ padding: "4rem", textAlign: "center" }}>جاري التحميل...</div>}>
      <RecommendContent />
    </Suspense>
  );
}
