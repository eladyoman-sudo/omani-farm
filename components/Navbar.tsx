"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/map", label: "الخريطة" },
  { href: "/calendar", label: "التقويم" },
  { href: "/farms", label: "المزارع" },
  { href: "/recommend", label: "التوصيات" },
  { href: "/market", label: "السوق" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <nav
      style={{
        background: "white",
        borderBottom: "1px solid #e5e5e5",
        boxShadow: "0px 2px 8px rgba(0,0,0,0.04)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 32 }}>🌴</span>
            <div>
              <div style={{ fontWeight: 700, color: "#15803d", fontSize: 16, lineHeight: "1.2" }}>
                مزارع عُمان
              </div>
              <div style={{ fontSize: 11, color: "#999999" }}>زراعة ذكية</div>
            </div>
          </div>
        </Link>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  textDecoration: "none",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "white" : "#666666",
                  background: isActive ? "#15803d" : "transparent",
                  transition: "all 150ms",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.background = "#f5f5f5";
                    (e.target as HTMLElement).style.color = "#15803d";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.target as HTMLElement).style.background = "transparent";
                    (e.target as HTMLElement).style.color = "#666666";
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}

          {/* User Menu */}
          <div style={{ marginRight: "16px", borderRight: "1px solid #e5e5e5", paddingRight: "16px" }}>
            {user ? (
              <Link href="/profile">
                <button style={{
                  padding: "8px 16px",
                  borderRadius: "10px",
                  border: "none",
                  background: pathname === "/profile" ? "#15803d" : "#f0fdf4",
                  color: pathname === "/profile" ? "white" : "#166534",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "all 150ms",
                }}
                onMouseEnter={(e) => {
                  if (pathname !== "/profile") {
                    (e.currentTarget as HTMLElement).style.background = "#dcfce7";
                  }
                }}
                onMouseLeave={(e) => {
                  if (pathname !== "/profile") {
                    (e.currentTarget as HTMLElement).style.background = "#f0fdf4";
                  }
                }}>
                  👤 {user.name}
                </button>
              </Link>
            ) : (
              <Link href="/auth/login">
                <button style={{
                  padding: "8px 16px",
                  borderRadius: "10px",
                  border: "none",
                  background: pathname === "/auth/login" ? "#15803d" : "#f0fdf4",
                  color: pathname === "/auth/login" ? "white" : "#166534",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "all 150ms",
                }}>
                  🔐 دخول
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
