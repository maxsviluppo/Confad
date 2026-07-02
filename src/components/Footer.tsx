"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const footerLinks = {
  "Chi Siamo": ["La Storia", "La Missione", "Il Direttivo", "Lo Statuto", "Contatti"],
  "Servizi": ["Advocacy Politica", "Mutuo Aiuto", "Supporto Psicologico", "Azioni Legali", "Informazione Diritti"],
  "Risorse & Campagne": ["Campagna #unaleggesubito", "Petizioni online", "Gruppi di Ascolto", "FAQ Legge 104", "Dona il 5×1000"],
};

export default function Footer() {
  const [customLogo, setCustomLogo] = useState("/logo.png");

  useEffect(() => {
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
  }, []);

  return (
    <footer style={{ background: "var(--primary-dark)", color: "rgba(255,255,255,0.75)", paddingTop: 72 }}>
      <style>{`
        .footer-link {
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover { color: var(--accent); }

        .footer-social {
          width: 36px; height: 36px; border-radius: 8px;
          background: rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.7);
          transition: background 0.2s, color 0.2s;
          cursor: pointer;
        }
        .footer-social:hover { background: rgba(255,255,255,0.15); color: var(--accent); }

        .footer-legal-link {
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-legal-link:hover { color: rgba(255,255,255,0.7); }

        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .footer-bottom { flex-direction: column; gap: 8px; }
        }
      `}</style>

      <div className="container">
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            paddingBottom: 56,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <img
                src={customLogo}
                alt="Logo CONFAD APS"
                style={{ width: 44, height: 59, objectFit: "contain", flexShrink: 0 }}
              />
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: "#fff" }}>CONFAD APS</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Coordinamento Famiglie
                </div>
              </div>
            </div>

            <p style={{ fontSize: 14, lineHeight: 1.8, maxWidth: 300, marginBottom: 24, color: "rgba(255,255,255,0.65)" }}>
              Coordinamento Nazionale Famiglie con Disabilità. Associazione di Promozione Sociale operante su tutto il territorio italiano.
            </p>

            {/* Social */}
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { label: "LinkedIn", d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                { label: "Facebook", d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { label: "Twitter/X", d: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="footer-social">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4
                style={{
                  color: "#fff", fontWeight: 700, fontSize: 14,
                  marginBottom: 20, letterSpacing: "0.04em",
                }}
              >
                {title}
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="footer-link">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          className="footer-bottom"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 0",
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span>
            © {new Date().getFullYear()} CONFAD APS – Associazione di Promozione Sociale. CF: 96541250582. Tutti i diritti riservati.
          </span>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <a href="#" className="footer-legal-link">Privacy Policy</a>
            <a href="#" className="footer-legal-link">Cookie Policy</a>
            <a href="#" className="footer-legal-link">Note Legali</a>
            <Link href="/admin" className="footer-legal-link" title="Area Riservata Amministratore" style={{ display: "inline-flex", alignItems: "center", marginLeft: 4 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: "rgba(255,255,255,0.3)", transition: "color 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.color = "var(--accent)"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(255,255,255,0.3)"}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
