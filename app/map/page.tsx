"use client";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView"), {
  ssr: false,
  loading: () => (
    <div style={{ height: "calc(100vh - 130px)", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0fdf4" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48 }}>🗺️</div>
        <div style={{ fontSize: 16, color: "#6b7280", marginTop: 10 }}>جاري تحميل الخريطة...</div>
      </div>
    </div>
  ),
});

export default function MapPage() {
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "1.5rem 1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: "#14532d" }}>🗺️ خريطة عُمان الزراعية</h1>
        <p style={{ color: "#6b7280", fontSize: 13 }}>استكشف المناطق الزراعية، الأفلاج، الآبار، ومناطق التربة المالحة</p>
      </div>
      <MapView />
    </div>
  );
}
