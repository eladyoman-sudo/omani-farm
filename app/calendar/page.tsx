"use client";
import { useState } from "react";
import { CROPS, MONTHS_AR, getCropsByMonth } from "@/data/crops";
import { REGIONS } from "@/data/regions";

const CATEGORY_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  dates:      { label: "تمور", color: "#92400e", bg: "#fef3c7" },
  fruits:     { label: "فواكه", color: "#be185d", bg: "#fce7f3" },
  vegetables: { label: "خضروات", color: "#166534", bg: "#dcfce7" },
  herbs:      { label: "أعشاب", color: "#065f46", bg: "#d1fae5" },
  grains:     { label: "حبوب", color: "#92400e", bg: "#fef9c3" },
  fodder:     { label: "علف", color: "#4d7c0f", bg: "#ecfccb" },
};

export default function CalendarPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [view, setView] = useState<"month" | "year">("month");

  const currentCrops = getCropsByMonth(selectedMonth).filter(
    (c) => selectedRegion === "all" || c.suitableRegions.includes(selectedRegion)
  );

  const harvestCrops = CROPS.filter(
    (c) =>
      c.harvestMonths.includes(selectedMonth) &&
      (selectedRegion === "all" || c.suitableRegions.includes(selectedRegion))
  );

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>

      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#14532d" }}>📅 التقويم الزراعي العُماني</h1>
        <p style={{ color: "#6b7280", marginTop: 4 }}>اعرف ماذا تزرع وماذا تحصد في كل شهر</p>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: "1.5rem", display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        <div>
          <label style={{ fontSize: 13, color: "#6b7280", display: "block", marginBottom: 4 }}>المحافظة</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={{
              border: "1px solid #d1fae5", borderRadius: 8, padding: "6px 12px",
              fontSize: 14, color: "#1a2e1a", background: "white", cursor: "pointer",
            }}
          >
            <option value="all">كل المحافظات</option>
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>{r.nameAr}</option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setView("month")}
            className={view === "month" ? "btn-primary" : "btn-secondary"}
            style={{ fontSize: 13, padding: "6px 16px" }}
          >
            عرض شهري
          </button>
          <button
            onClick={() => setView("year")}
            className={view === "year" ? "btn-primary" : "btn-secondary"}
            style={{ fontSize: 13, padding: "6px 16px" }}
          >
            عرض سنوي
          </button>
        </div>
      </div>

      {/* Month Selector */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 8, marginBottom: "2rem" }}>
        {MONTHS_AR.map((month, i) => {
          const monthNum = i + 1;
          const count = getCropsByMonth(monthNum).filter(
            (c) => selectedRegion === "all" || c.suitableRegions.includes(selectedRegion)
          ).length;
          return (
            <button
              key={monthNum}
              onClick={() => setSelectedMonth(monthNum)}
              style={{
                padding: "10px 4px",
                borderRadius: 10,
                border: selectedMonth === monthNum ? "2px solid #15803d" : "1px solid #e5e7eb",
                background: selectedMonth === monthNum ? "#15803d" : "white",
                color: selectedMonth === monthNum ? "white" : "#374151",
                cursor: "pointer",
                transition: "all 0.2s",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 600 }}>{month}</div>
              <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>{count} محصول</div>
            </button>
          );
        })}
      </div>

      {view === "month" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Planting */}
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#14532d", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              🌱 للزراعة في {MONTHS_AR[selectedMonth - 1]}
              <span style={{ fontSize: 13, background: "#dcfce7", color: "#15803d", padding: "2px 10px", borderRadius: 20, fontWeight: 500 }}>
                {currentCrops.length} محصول
              </span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {currentCrops.length === 0 ? (
                <div className="card" style={{ textAlign: "center", color: "#9ca3af", padding: "2rem" }}>
                  لا توجد محاصيل مقترحة لهذا الشهر في المنطقة المحددة
                </div>
              ) : (
                currentCrops.map((crop) => {
                  const cat = CATEGORY_LABELS[crop.category];
                  return (
                    <div key={crop.id} className="card fade-in" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                      <div style={{ fontSize: 32 }}>{crop.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontWeight: 700, fontSize: 15 }}>{crop.nameAr}</span>
                          <span style={{ fontSize: 11, background: cat.bg, color: cat.color, padding: "2px 8px", borderRadius: 12 }}>
                            {cat.label}
                          </span>
                          <span style={{ fontSize: 11, background: "#f0fdf4", color: "#166534", padding: "2px 8px", borderRadius: 12 }}>
                            💧 {crop.waterNeeds}
                          </span>
                        </div>
                        <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5, margin: 0 }}>{crop.description}</p>
                        <p style={{ fontSize: 12, color: "#92400e", marginTop: 4, margin: 0 }}>💡 {crop.tips}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Harvest */}
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: "#b45309", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              🌾 للحصاد في {MONTHS_AR[selectedMonth - 1]}
              <span style={{ fontSize: 13, background: "#fef3c7", color: "#b45309", padding: "2px 10px", borderRadius: 20, fontWeight: 500 }}>
                {harvestCrops.length} محصول
              </span>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {harvestCrops.length === 0 ? (
                <div className="card" style={{ textAlign: "center", color: "#9ca3af", padding: "2rem" }}>
                  لا توجد محاصيل جاهزة للحصاد هذا الشهر في المنطقة المحددة
                </div>
              ) : (
                harvestCrops.map((crop) => {
                  const cat = CATEGORY_LABELS[crop.category];
                  return (
                    <div key={crop.id} className="card fade-in" style={{ display: "flex", gap: 12, alignItems: "flex-start", border: "1px solid #fde68a" }}>
                      <div style={{ fontSize: 32 }}>{crop.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontWeight: 700, fontSize: 15 }}>{crop.nameAr}</span>
                          <span style={{ fontSize: 11, background: cat.bg, color: cat.color, padding: "2px 8px", borderRadius: 12 }}>
                            {cat.label}
                          </span>
                        </div>
                        <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.5, margin: 0 }}>{crop.description}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Year View - Grid */
        <div className="card" style={{ overflowX: "auto" }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#14532d", marginBottom: 16 }}>
            📊 جدول المحاصيل السنوي
          </h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "right", padding: "8px 12px", background: "#f0fdf4", borderBottom: "2px solid #bbf7d0", minWidth: 120 }}>
                  المحصول
                </th>
                {MONTHS_AR.map((m) => (
                  <th key={m} style={{ padding: "8px 6px", background: "#f0fdf4", borderBottom: "2px solid #bbf7d0", textAlign: "center", minWidth: 52 }}>
                    {m.slice(0, 3)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CROPS.filter(
                (c) => selectedRegion === "all" || c.suitableRegions.includes(selectedRegion)
              ).map((crop, i) => (
                <tr key={crop.id} style={{ background: i % 2 === 0 ? "white" : "#f9fafb" }}>
                  <td style={{ padding: "6px 12px", fontWeight: 500 }}>
                    {crop.emoji} {crop.nameAr}
                  </td>
                  {MONTHS_AR.map((_, mi) => {
                    const month = mi + 1;
                    const isPlanting = crop.plantingMonths.includes(month);
                    const isHarvest = crop.harvestMonths.includes(month);
                    return (
                      <td key={month} style={{ padding: "6px 4px", textAlign: "center" }}>
                        {isPlanting && (
                          <span style={{
                            display: "inline-block", width: 20, height: 20, borderRadius: 4,
                            background: "#15803d", color: "white", fontSize: 10, lineHeight: "20px",
                          }}>ز</span>
                        )}
                        {isHarvest && (
                          <span style={{
                            display: "inline-block", width: 20, height: 20, borderRadius: 4,
                            background: "#d97706", color: "white", fontSize: 10, lineHeight: "20px",
                            marginRight: isPlanting ? 2 : 0,
                          }}>ح</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 12, color: "#6b7280" }}>
            <span><span style={{ display: "inline-block", width: 16, height: 16, background: "#15803d", borderRadius: 3, marginLeft: 4 }}></span>ز = زراعة</span>
            <span><span style={{ display: "inline-block", width: 16, height: 16, background: "#d97706", borderRadius: 3, marginLeft: 4 }}></span>ح = حصاد</span>
          </div>
        </div>
      )}
    </div>
  );
}
