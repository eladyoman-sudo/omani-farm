"use client";
import { useState } from "react";
import { CROPS } from "@/data/crops";
import { REGIONS } from "@/data/regions";

interface Listing {
  id: string;
  cropId: string;
  sellerName: string;
  region: string;
  price: number;
  unit: string;
  quantity: number;
  quality: "ممتازة" | "جيدة" | "متوسطة";
  isOrganic: boolean;
  phone: string;
  date: string;
  type: "sell" | "buy";
}

const SAMPLE_LISTINGS: Listing[] = [
  { id: "1", cropId: "dates", sellerName: "أحمد البوسعيدي", region: "batinah_north", price: 3.5, unit: "كجم", quantity: 500, quality: "ممتازة", isOrganic: true, phone: "97398XXXX", date: "2025-06-01", type: "sell" },
  { id: "2", cropId: "lime", sellerName: "سالم الحارثي", region: "batinah_south", price: 1.2, unit: "كجم", quantity: 200, quality: "جيدة", isOrganic: false, phone: "97399XXXX", date: "2025-06-01", type: "sell" },
  { id: "3", cropId: "mango", sellerName: "مزرعة الغافات", region: "dakhliyah", price: 2.0, unit: "كجم", quantity: 300, quality: "ممتازة", isOrganic: true, phone: "97391XXXX", date: "2025-05-30", type: "sell" },
  { id: "4", cropId: "tomato", sellerName: "خالد المقبالي", region: "muscat", price: 0.8, unit: "كجم", quantity: 1000, quality: "جيدة", isOrganic: false, phone: "97392XXXX", date: "2025-05-29", type: "sell" },
  { id: "5", cropId: "pomegranate", sellerName: "مزرعة الجبل الأخضر", region: "dakhliyah", price: 4.0, unit: "كجم", quantity: 150, quality: "ممتازة", isOrganic: true, phone: "97393XXXX", date: "2025-05-28", type: "sell" },
  { id: "6", cropId: "dates", sellerName: "مطعم الواحة", region: "muscat", price: 4.0, unit: "كجم", quantity: 200, quality: "ممتازة", isOrganic: false, phone: "97394XXXX", date: "2025-06-01", type: "buy" },
  { id: "7", cropId: "banana", sellerName: "يوسف الريامي", region: "batinah_north", price: 1.5, unit: "كجم", quantity: 400, quality: "جيدة", isOrganic: false, phone: "97395XXXX", date: "2025-05-31", type: "sell" },
];

const QUALITY_COLORS = {
  "ممتازة": { bg: "#dcfce7", color: "#166534" },
  "جيدة": { bg: "#dbeafe", color: "#1e40af" },
  "متوسطة": { bg: "#fef3c7", color: "#92400e" },
};

export default function MarketPage() {
  const [activeTab, setActiveTab] = useState<"all" | "sell" | "buy">("all");
  const [filterCrop, setFilterCrop] = useState("all");
  const [filterRegion, setFilterRegion] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const [listingType, setListingType] = useState<"sell" | "buy">("sell");

  const filtered = SAMPLE_LISTINGS.filter((l) => {
    if (activeTab !== "all" && l.type !== activeTab) return false;
    if (filterCrop !== "all" && l.cropId !== filterCrop) return false;
    if (filterRegion !== "all" && l.region !== filterRegion) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#14532d" }}>🛒 سوق المحاصيل العُماني</h1>
          <p style={{ color: "#6b7280", marginTop: 4 }}>بع واشتري المحاصيل مباشرة بين المزارعين</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary"
          style={{ fontSize: 14 }}
        >
          ＋ أضف إعلاناً
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: "1.25rem" }}>
        {[
          { key: "all", label: "الكل", count: SAMPLE_LISTINGS.length },
          { key: "sell", label: "🌱 للبيع", count: SAMPLE_LISTINGS.filter((l) => l.type === "sell").length },
          { key: "buy", label: "🛍️ طلبات شراء", count: SAMPLE_LISTINGS.filter((l) => l.type === "buy").length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "all" | "sell" | "buy")}
            className={activeTab === tab.key ? "btn-primary" : "btn-secondary"}
            style={{ fontSize: 13 }}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: "1.5rem", display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>المحصول</label>
          <select
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            style={{ border: "1px solid #d1fae5", borderRadius: 8, padding: "6px 10px", fontSize: 13, cursor: "pointer" }}
          >
            <option value="all">كل المحاصيل</option>
            {CROPS.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.nameAr}</option>)}
          </select>
        </div>
        <div>
          <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>المحافظة</label>
          <select
            value={filterRegion}
            onChange={(e) => setFilterRegion(e.target.value)}
            style={{ border: "1px solid #d1fae5", borderRadius: 8, padding: "6px 10px", fontSize: 13, cursor: "pointer" }}
          >
            <option value="all">كل المحافظات</option>
            {REGIONS.map((r) => <option key={r.id} value={r.id}>{r.nameAr}</option>)}
          </select>
        </div>
        <div style={{ marginRight: "auto", fontSize: 13, color: "#6b7280" }}>
          {filtered.length} إعلان
        </div>
      </div>

      {/* Listings */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {filtered.map((listing) => {
          const crop = CROPS.find((c) => c.id === listing.cropId);
          const region = REGIONS.find((r) => r.id === listing.region);
          const qc = QUALITY_COLORS[listing.quality];
          return (
            <div
              key={listing.id}
              className="card fade-in"
              style={{
                border: listing.type === "buy" ? "1px solid #bfdbfe" : "1px solid #bbf7d0",
                borderTop: `4px solid ${listing.type === "buy" ? "#3b82f6" : "#15803d"}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 36 }}>{crop?.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{crop?.nameAr}</div>
                    <div style={{ fontSize: 12, color: "#6b7280" }}>📍 {region?.nameAr}</div>
                  </div>
                </div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: listing.type === "buy" ? "#1e40af" : "#15803d" }}>
                    {listing.price} ر.ع
                  </div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>لكل {listing.unit}</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                <span style={{ fontSize: 11, background: listing.type === "buy" ? "#dbeafe" : "#dcfce7", color: listing.type === "buy" ? "#1e40af" : "#166534", padding: "3px 10px", borderRadius: 20 }}>
                  {listing.type === "buy" ? "🛍️ طلب شراء" : "🌱 للبيع"}
                </span>
                <span style={{ fontSize: 11, background: qc.bg, color: qc.color, padding: "3px 10px", borderRadius: 20 }}>
                  ⭐ {listing.quality}
                </span>
                {listing.isOrganic && (
                  <span style={{ fontSize: 11, background: "#d1fae5", color: "#065f46", padding: "3px 10px", borderRadius: 20 }}>
                    🌿 عضوي
                  </span>
                )}
                <span style={{ fontSize: 11, background: "#f3f4f6", color: "#6b7280", padding: "3px 10px", borderRadius: 20 }}>
                  📦 {listing.quantity} {listing.unit}
                </span>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{listing.sellerName}</div>
                  <div style={{ fontSize: 11, color: "#9ca3af" }}>{listing.date}</div>
                </div>
                <button
                  className="btn-primary"
                  style={{ fontSize: 13, padding: "6px 16px" }}
                  onClick={() => alert(`للتواصل: ${listing.phone}`)}
                >
                  📞 تواصل
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Listing Modal */}
      {showAddForm && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowAddForm(false); }}
        >
          <div className="card" style={{ width: 480, maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#14532d", marginBottom: 16 }}>
              ＋ إضافة إعلان جديد
            </h2>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <button
                onClick={() => setListingType("sell")}
                className={listingType === "sell" ? "btn-primary" : "btn-secondary"}
                style={{ flex: 1, fontSize: 14 }}
              >
                🌱 للبيع
              </button>
              <button
                onClick={() => setListingType("buy")}
                className={listingType === "buy" ? "btn-primary" : "btn-secondary"}
                style={{ flex: 1, fontSize: 14, background: listingType === "buy" ? "#3b82f6" : undefined }}
              >
                🛍️ أريد شراء
              </button>
            </div>
            {[
              { label: "المحصول", type: "select-crop" },
              { label: "المحافظة", type: "select-region" },
              { label: "السعر (ر.ع / كجم)", type: "number" },
              { label: "الكمية المتاحة (كجم)", type: "number" },
              { label: "اسمك", type: "text" },
              { label: "رقم الهاتف", type: "tel" },
            ].map((field) => (
              <div key={field.label} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 13, color: "#374151", display: "block", marginBottom: 4, fontWeight: 500 }}>
                  {field.label}
                </label>
                {field.type === "select-crop" ? (
                  <select style={{ width: "100%", border: "1px solid #d1fae5", borderRadius: 8, padding: "8px 10px", fontSize: 13 }}>
                    {CROPS.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.nameAr}</option>)}
                  </select>
                ) : field.type === "select-region" ? (
                  <select style={{ width: "100%", border: "1px solid #d1fae5", borderRadius: 8, padding: "8px 10px", fontSize: 13 }}>
                    {REGIONS.map((r) => <option key={r.id} value={r.id}>{r.nameAr}</option>)}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    style={{ width: "100%", border: "1px solid #d1fae5", borderRadius: 8, padding: "8px 10px", fontSize: 13 }}
                  />
                )}
              </div>
            ))}
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <button className="btn-primary" style={{ flex: 1 }} onClick={() => { alert("تم نشر الإعلان بنجاح! 🎉"); setShowAddForm(false); }}>
                نشر الإعلان
              </button>
              <button className="btn-secondary" onClick={() => setShowAddForm(false)}>إلغاء</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
