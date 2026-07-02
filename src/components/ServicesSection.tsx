"use client";

const services = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Advocacy e Pressione Politica",
    desc: "Monitoriamo i Disegni di Legge per i Caregiver, conduciamo campagne di sensibilizzazione e dialoghiamo con ministeri e parlamentari per ottenere diritti concreti.",
    color: "#1a3a6e",
    tag: "Focus Leggi & Diritti",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: "Mutuo Aiuto e Comunità",
    desc: "Gruppi di mutuo aiuto mensili guidati da psicologi professionisti per combattere il burnout del caregiver e rompere l'isolamento sociale delle famiglie.",
    color: "#2d5aa8",
    tag: "Benessere & Supporto",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: "Informazione e Divulgazione",
    desc: "Guide pratiche su agevolazioni fiscali, Legge 104, ISEE disabilità, permessi lavorativi e tutti i diritti spettanti alle famiglie con persone non autosufficienti.",
    color: "#e8b84b",
    tag: "Focus Leggi & Diritti",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    title: "Azioni Legali Collettive",
    desc: "Ricorsi collettivi per tutelare i diritti economici delle famiglie. Come la storica battaglia «STOP AL NUOVO ISEE» per escludere l'indennità di accompagnamento dal reddito.",
    color: "#0f2347",
    tag: "Storie & Condivisione",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Supporto Psicologico",
    desc: "Area dedicata alla salute mentale del caregiver: colloqui individuali, gruppi di ascolto e percorsi di gestione dello stress emotivo con professionisti qualificati.",
    color: "#c0392b",
    tag: "Benessere & Supporto",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/>
      </svg>
    ),
    title: "Campagne Virali e Social",
    desc: "Lanciamo campagne di sensibilizzazione nazionali — come #unaleggesubito — per portare la voce del caregiver familiare all'attenzione dell'opinione pubblica e delle istituzioni.",
    color: "#1a3a6e",
    tag: "Call to Action",
  },
];

const tagColors: Record<string, string> = {
  "Focus Leggi & Diritti": "#1a3a6e",
  "Benessere & Supporto": "#2d5aa8",
  "Storie & Condivisione": "#c0392b",
  "Call to Action": "#e8b84b",
};

export default function ServicesSection() {
  return (
    <section id="servizi" className="section" style={{ background: "var(--off-white)" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="section-label" style={{ justifyContent: "center" }}>Cosa Facciamo</span>
          <h2 className="section-title" style={{ textAlign: "center" }}>
            Quattro pilastri per i tuoi diritti
          </h2>
          <p className="section-subtitle" style={{ margin: "0 auto" }}>
            CONFAD APS agisce su più fronti per garantire riconoscimento, tutela e supporto concreto alle famiglie con persone con disabilità grave.
          </p>
        </div>

        {/* Grid */}
        <div className="grid-3">
          {services.map((s, i) => (
            <div
              key={i}
              className="card"
              style={{ padding: "36px 30px", cursor: "default", position: "relative", overflow: "hidden" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 24px 64px rgba(26,58,110,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {/* Top bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${s.color}, ${s.color}66)` }} />

              {/* Tag */}
              <div style={{ display: "inline-block", background: `${tagColors[s.tag]}15`, color: tagColors[s.tag] === "#e8b84b" ? "#92650a" : tagColors[s.tag], fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 100, marginBottom: 18 }}>
                {s.tag}
              </div>

              {/* Icon */}
              <div style={{ width: 58, height: 58, borderRadius: 14, background: `${s.color}12`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color, marginBottom: 20 }}>
                {s.icon}
              </div>

              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--primary-dark)", marginBottom: 12 }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
