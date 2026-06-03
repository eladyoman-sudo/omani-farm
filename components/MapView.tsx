"use client";
import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { REGIONS, Region } from "@/data/regions";
import { AFLAJ, SALINITY_AREAS } from "@/data/aflaj";
import { getCropsByRegion, MONTHS_AR } from "@/data/crops";
import { FARMS, getFarmsByRegion } from "@/data/farms";

// Fix leaflet default icon
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function FlyToRegion({ region }: { region: Region | null }) {
  const map = useMap();
  if (region) {
    map.flyTo([region.lat, region.lng], 9, { duration: 1.2 });
  }
  return null;
}

export default function MapView() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [layers, setLayers] = useState({
    regions: true,
    aflaj: true,
    salinity: true,
    farms: true,
  });

  const toggleLayer = (key: keyof typeof layers) => {
    setLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const crops = selectedRegion ? getCropsByRegion(selectedRegion.id) : [];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 14, height: "calc(100vh - 170px)" }}>
      {/* Sidebar */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>

        {/* Layer Controls */}
        <div className="card">
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#14532d", marginBottom: 10 }}>🗂️ طبقات الخريطة</h3>
          {[
            { key: "regions", label: "المناطق الزراعية", emoji: "🌿" },
            { key: "aflaj", label: "الأفلاج والمياه", emoji: "💧" },
            { key: "farms", label: "المزارع والمتاجر", emoji: "🚜" },
            { key: "salinity", label: "مناطق الملوحة", emoji: "⚠️" },
          ].map((layer) => (
            <label
              key={layer.key}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", cursor: "pointer", fontSize: 13 }}
            >
              <input
                type="checkbox"
                checked={layers[layer.key as keyof typeof layers]}
                onChange={() => toggleLayer(layer.key as keyof typeof layers)}
                style={{ accentColor: "#15803d", width: 15, height: 15 }}
              />
              <span>{layer.emoji}</span>
              <span>{layer.label}</span>
            </label>
          ))}
        </div>

        {/* Region List */}
        <div className="card" style={{ flex: 1 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#14532d", marginBottom: 10 }}>📍 المحافظات</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r)}
                style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                  borderRadius: 8, border: "none", textAlign: "right", cursor: "pointer",
                  background: selectedRegion?.id === r.id ? r.color + "30" : "transparent",
                  borderRight: `3px solid ${r.color}`,
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { if (selectedRegion?.id !== r.id) (e.currentTarget as HTMLElement).style.background = "#f0fdf4"; }}
                onMouseLeave={(e) => { if (selectedRegion?.id !== r.id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: r.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: selectedRegion?.id === r.id ? 700 : 400 }}>{r.nameAr}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Region Info */}
        {selectedRegion && (
          <div className="card fade-in" style={{ borderTop: `3px solid ${selectedRegion.color}` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#14532d", marginBottom: 8 }}>
              {selectedRegion.nameAr}
            </h3>
            <div style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.7 }}>
              <div>🌡️ {selectedRegion.climate}</div>
              <div>⛰️ الارتفاع: {selectedRegion.elevation}</div>
              <div>🌍 التربة: {selectedRegion.soilType}</div>
              <div>💧 المياه: {selectedRegion.waterSources.join("، ")}</div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 4 }}>
                🌱 المحاصيل ({crops.length}):
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {crops.slice(0, 8).map((c) => (
                  <span key={c.id} style={{ fontSize: 11, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "2px 8px" }}>
                    {c.emoji} {c.nameAr}
                  </span>
                ))}
                {crops.length > 8 && (
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>+{crops.length - 8} أخرى</span>
                )}
              </div>
            </div>

            {/* Nearby Farms */}
            {getFarmsByRegion(selectedRegion.id).length > 0 && (
              <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid #e5e7eb" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                  🚜 مزارع ومتاجر قريبة:
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {getFarmsByRegion(selectedRegion.id).map((farm) => (
                    <div key={farm.id} style={{ fontSize: 11, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "6px 8px" }}>
                      <div style={{ fontWeight: 600, color: "#1a2e1a" }}>{farm.nameAr}</div>
                      <div style={{ fontSize: 10, color: "#6b7280", marginTop: 2 }}>📞 {farm.phone}</div>
                      <div style={{ fontSize: 10, color: "#059669", marginTop: 2 }}>⭐ {farm.rating}/5 • {farm.type}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Map */}
      <div style={{ borderRadius: "1rem", overflow: "hidden", border: "1px solid #dcfce7" }}>
        <MapContainer
          center={[22.5, 57.5]}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          <FlyToRegion region={selectedRegion} />

          {/* Region Markers */}
          {layers.regions && REGIONS.map((r) => (
            <CircleMarker
              key={r.id}
              center={[r.lat, r.lng]}
              radius={selectedRegion?.id === r.id ? 22 : 16}
              fillColor={r.color}
              color="white"
              weight={2}
              fillOpacity={0.7}
              eventHandlers={{ click: () => setSelectedRegion(r) }}
            >
              <Tooltip direction="top" permanent={false}>
                <strong>{r.nameAr}</strong>
                <br />
                {getCropsByRegion(r.id).length} محصول
              </Tooltip>
              <Popup>
                <div style={{ direction: "rtl", minWidth: 180 }}>
                  <strong style={{ fontSize: 14 }}>{r.nameAr}</strong>
                  <br />
                  <span style={{ fontSize: 12, color: "#6b7280" }}>{r.climate}</span>
                  <br />
                  <span style={{ fontSize: 12 }}>💧 {r.waterSources[0]}</span>
                  <br />
                  <span style={{ fontSize: 12 }}>🌱 {getCropsByRegion(r.id).length} نوع محصول</span>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {/* Aflaj Markers */}
          {layers.aflaj && AFLAJ.map((f) => (
            <CircleMarker
              key={f.id}
              center={[f.lat, f.lng]}
              radius={f.isUNESCO ? 10 : 7}
              fillColor="#0891b2"
              color="white"
              weight={2}
              fillOpacity={0.8}
            >
              <Tooltip direction="top">
                <strong>{f.nameAr}</strong>
                {f.isUNESCO && <span> ⭐ يونسكو</span>}
              </Tooltip>
              <Popup>
                <div style={{ direction: "rtl", minWidth: 180 }}>
                  <strong style={{ fontSize: 13 }}>💧 {f.nameAr}</strong>
                  <br />
                  <span style={{ fontSize: 11 }}>النوع: {f.type === "dawoodi" ? "داوودي" : f.type === "ghayli" ? "غيلي" : "عيني"}</span>
                  <br />
                  <span style={{ fontSize: 11 }}>الطول: {f.length_km} كم</span>
                  <br />
                  {f.isUNESCO && <span style={{ fontSize: 11, color: "#d97706" }}>⭐ تراث عالمي - يونسكو</span>}
                  <br />
                  <span style={{ fontSize: 11, color: "#6b7280" }}>{f.description}</span>
                </div>
              </Popup>
            </CircleMarker>
          ))}

          {/* Farms & Stores */}
          {layers.farms && FARMS.map((farm) => {
            const typeEmoji = farm.type === "مزرعة" ? "🚜" : farm.type === "متجر" ? "🏪" : farm.type === "مركز توزيع" ? "📦" : "🏬";
            return (
              <CircleMarker
                key={farm.id}
                center={[farm.lat, farm.lng]}
                radius={8}
                fillColor={farm.type === "مزرعة" ? "#22c55e" : farm.type === "متجر" ? "#f59e0b" : "#8b5cf6"}
                color="white"
                weight={2}
                fillOpacity={0.9}
              >
                <Tooltip direction="top">
                  <strong>{farm.nameAr}</strong>
                  <br />⭐ {farm.rating}
                </Tooltip>
                <Popup>
                  <div style={{ direction: "rtl", minWidth: 200 }}>
                    <strong style={{ fontSize: 13 }}>{typeEmoji} {farm.nameAr}</strong>
                    <br />
                    <span style={{ fontSize: 11 }}>{farm.description}</span>
                    <br />
                    <span style={{ fontSize: 11, color: "#059669" }}>⭐ {farm.rating}/5</span>
                    <br />
                    <span style={{ fontSize: 11, color: "#0891b2" }}>📞 {farm.phone}</span>
                    <br />
                    <span style={{ fontSize: 11, color: "#6b7280" }}>المحاصيل: {farm.crops.length} نوع</span>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}

          {/* Salinity Areas */}
          {layers.salinity && SALINITY_AREAS.map((s) => (
            <CircleMarker
              key={s.id}
              center={[s.lat, s.lng]}
              radius={18}
              fillColor="#f97316"
              color="#dc2626"
              weight={2}
              fillOpacity={0.35}
              dashArray="4"
            >
              <Tooltip direction="top">
                <strong>⚠️ {s.nameAr}</strong>
                <br />ملوحة {s.level}
              </Tooltip>
              <Popup>
                <div style={{ direction: "rtl", minWidth: 160 }}>
                  <strong style={{ fontSize: 13, color: "#dc2626" }}>⚠️ {s.nameAr}</strong>
                  <br />
                  <span style={{ fontSize: 11 }}>مستوى الملوحة: {s.level}</span>
                  <br />
                  <span style={{ fontSize: 11, color: "#6b7280" }}>{s.description}</span>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
