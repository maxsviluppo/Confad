"use client";

const services = [
  {
    n: "I",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Advocacy e Pressione Politica",
    desc: "Monitoriamo i Disegni di Legge nazionali, promuoviamo audizioni al Senato e conduciamo campagne per ottenere tutele previdenziali e sanitarie reali per i caregiver.",
    color: "#1a3a6e",
    tag: "Focus Leggi & Diritti",
  },
  {
    n: "II",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Supporto Psicologico & Burnout",
    desc: "Colloqui individuali e percorsi di sostegno mirati ad alleviare lo stress emotivo derivante dal lavoro di assistenza continuativo.",
    color: "#2d5aa8",
    tag: "Benessere & Supporto",
  },
  {
    n: "III",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: "Informazione Diritti e Burocrazia",
    desc: "Forniamo guide chiare su permessi lavorativi (Legge 104), congedi straordinari, calcolo ISEE disabilità ed esenzioni mediche.",
    color: "#92650a",
    tag: "Focus Leggi & Diritti",
  },
  {
    n: "IV",
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Gruppi di Mutuo Aiuto",
    desc: "Gruppi mensili di ascolto e condivisione guidati da psicologi per far incontrare le famiglie, condividere storie e rompere l'isolamento.",
    color: "#c0392b",
    tag: "Benessere & Supporto",
  },
];

const tagColors: Record<string, string> = {
  "Focus Leggi & Diritti": "#1a3a6e",
  "Benessere & Supporto": "#2d5aa8",
};

export default function ServicesSection() {
  return (
    <section id="servizi" className="section" style={{ background: "var(--off-white)", paddingTop: 110, paddingBottom: 110, overflow: "hidden" }}>
      <style>{`
        .timeline-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: linear-gradient(to bottom, rgba(232,184,75,0) 0%, #e8b84b 15%, #e8b84b 85%, rgba(232,184,75,0) 100%);
          transform: translateX(-50%);
        }
        .timeline-item {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          margin-bottom: 60px;
          align-items: center;
        }
        .timeline-item:last-child {
          margin-bottom: 0;
        }
        .timeline-dot {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #e8b84b;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 15px;
          color: #0f2347;
          box-shadow: 0 10px 25px rgba(232,184,75,0.25);
          z-index: 10;
          transition: all 0.3s ease;
        }
        .timeline-card {
          background: #fff;
          border-radius: 20px;
          padding: 38px 34px;
          box-shadow: 0 10px 35px rgba(15,35,71,0.03);
          border: 1px solid rgba(15,35,71,0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          z-index: 2;
        }
        .timeline-item:hover .timeline-dot {
          background: var(--accent);
          color: var(--primary-dark);
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 10px 30px rgba(232,184,75,0.45);
        }
        .timeline-item:hover .timeline-card {
          transform: translateY(-5px);
          box-shadow: 0 25px 60px rgba(15,35,71,0.09);
          border-color: rgba(232,184,75,0.3);
        }
        
        @media (max-width: 900px) {
          .timeline-line {
            left: 20px;
          }
          .timeline-dot {
            left: 20px;
          }
          .timeline-item {
            grid-template-columns: 1fr;
            gap: 24px;
            padding-left: 60px;
            margin-bottom: 40px;
          }
          .timeline-card-container {
            grid-column: 1 / -1 !important;
            text-align: left !important;
          }
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <span className="section-label" style={{ justifyContent: "center" }}>Cosa Facciamo</span>
          <h2 className="section-title" style={{ textAlign: "center", fontSize: "clamp(2.2rem, 4.5vw, 3rem)" }}>
            Quattro pilastri per i tuoi diritti
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto", maxWidth: 640 }}>
            CONFAD APS agisce su più fronti per garantire riconoscimento, tutela e supporto concreto alle famiglie con persone con disabilità grave.
          </p>
        </div>

        {/* Timeline Layout */}
        <div style={{ position: "relative" }}>
          {/* Vertical central line */}
          <div className="timeline-line" />

          {/* Item 1 */}
          <div className="timeline-item">
            <div className="timeline-card-container" style={{ textAlign: "right" }}>
              <div className="timeline-card" style={{ display: "inline-block", maxWidth: 480, textAlign: "left" }}>
                <div style={{ display: "inline-block", background: "rgba(26,58,110,0.08)", color: "#1a3a6e", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, marginBottom: 16 }}>
                  Focus Leggi & Diritti
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--primary-dark)", marginBottom: 12 }}>Advocacy e Pressione Politica</h3>
                <p style={{ fontSize: 13.5, color: "var(--text-light)", lineHeight: 1.7, margin: 0 }}>
                  Monitoriamo i Disegni di Legge nazionali, promuoviamo audizioni al Senato e conduciamo campagne per ottenere tutele previdenziali e sanitarie reali per i caregiver.
                </p>
              </div>
            </div>
            <div className="timeline-dot">I</div>
            <div /> {/* Empty spacer */}
          </div>

          {/* Item 2 */}
          <div className="timeline-item">
            <div /> {/* Empty spacer */}
            <div className="timeline-dot">II</div>
            <div className="timeline-card-container">
              <div className="timeline-card" style={{ display: "inline-block", maxWidth: 480 }}>
                <div style={{ display: "inline-block", background: "rgba(45,90,168,0.08)", color: "#2d5aa8", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, marginBottom: 16 }}>
                  Benessere & Supporto
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--primary-dark)", marginBottom: 12 }}>Supporto Psicologico & Burnout</h3>
                <p style={{ fontSize: 13.5, color: "var(--text-light)", lineHeight: 1.7, margin: 0 }}>
                  Colloqui individuali e percorsi di sostegno mirati ad alleviare lo stress emotivo derivante dal lavoro di assistenza continuativo.
                </p>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="timeline-item">
            <div className="timeline-card-container" style={{ textAlign: "right" }}>
              <div className="timeline-card" style={{ display: "inline-block", maxWidth: 480, textAlign: "left" }}>
                <div style={{ display: "inline-block", background: "rgba(232,184,75,0.15)", color: "#92650a", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, marginBottom: 16 }}>
                  Focus Leggi & Diritti
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--primary-dark)", marginBottom: 12 }}>Informazione Diritti e Burocrazia</h3>
                <p style={{ fontSize: 13.5, color: "var(--text-light)", lineHeight: 1.7, margin: 0 }}>
                  Forniamo guide chiare su permessi lavorativi (Legge 104), congedi straordinari, calcolo ISEE disabilità ed esenzioni mediche.
                </p>
              </div>
            </div>
            <div className="timeline-dot">III</div>
            <div /> {/* Empty spacer */}
          </div>

          {/* Item 4 */}
          <div className="timeline-item">
            <div /> {/* Empty spacer */}
            <div className="timeline-dot">IV</div>
            <div className="timeline-card-container">
              <div className="timeline-card" style={{ display: "inline-block", maxWidth: 480 }}>
                <div style={{ display: "inline-block", background: "rgba(192,57,43,0.08)", color: "#c0392b", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 10px", borderRadius: 100, marginBottom: 16 }}>
                  Benessere & Supporto
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--primary-dark)", marginBottom: 12 }}>Gruppi di Mutuo Aiuto</h3>
                <p style={{ fontSize: 13.5, color: "var(--text-light)", lineHeight: 1.7, margin: 0 }}>
                  Gruppi mensili di ascolto e condivisione guidati da psicologi per far incontrare le famiglie, condividere storie e rompere l&apos;isolamento.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
