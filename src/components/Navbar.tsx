"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Chi Siamo", href: "#chi-siamo" },
  { label: "Cosa Facciamo", href: "#servizi" },
  { label: "I Nostri Obiettivi", href: "#obiettivi" },
  { label: "Notizie", href: "#notizie" },
  { label: "Contatti", href: "#contatti" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [customLogo, setCustomLogo] = useState("/Logo-ULTIMO_completo_trasparente-1-e1690538152112-222x300.png");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Controlla se è stato caricato un logo personalizzato in admin
    const savedMedia = localStorage.getItem("confad_media_associations");
    if (savedMedia) {
      try {
        const parsed = JSON.parse(savedMedia);
        const logoAssoc = parsed.find((a: any) => a.fieldLabel.includes("Logo Principale"));
        if (logoAssoc && logoAssoc.previewUrl) {
          setCustomLogo(logoAssoc.previewUrl);
        }
      } catch (e) {}
    }
    
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
        background: scrolled ? "rgba(15,35,71,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.18)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <img
            src={customLogo}
            alt="Logo CONFAD APS"
            style={{ width: 44, height: 59, objectFit: "contain", flexShrink: 0 }}
          />
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, color: "#fff", letterSpacing: "0.04em" }}>CONFAD APS</div>
            <div style={{ fontWeight: 400, fontSize: 10, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Famiglie con Disabilità</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: 2, alignItems: "center" }} className="desktop-nav">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                padding: "8px 14px",
                borderRadius: 6,
                fontSize: 14,
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
                transition: "all 0.2s",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color = "#fff";
                (e.target as HTMLAnchorElement).style.background = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLAnchorElement).style.color = "rgba(255,255,255,0.85)";
                (e.target as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="#contatti" className="btn btn-primary" style={{ marginLeft: 10, padding: "10px 18px", fontSize: 13, borderRadius: 8 }}>
            Sostienici
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8, color: "#fff" }}
          className="hamburger"
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: "rgba(15,35,71,0.98)", backdropFilter: "blur(12px)", padding: "16px 24px 24px", display: "flex", flexDirection: "column", gap: 4 }}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{ padding: "12px 16px", borderRadius: 8, fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.9)", textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
          <Link href="#contatti" className="btn btn-primary" style={{ marginTop: 8, justifyContent: "center" }} onClick={() => setMenuOpen(false)}>
            Sostienici
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
