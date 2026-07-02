"use client";

const featured = {
  category: "Advocacy",
  date: "28 Giugno 2025",
  tag: "Focus Leggi & Diritti",
  title: "DDL Caregiver: ripartono le audizioni in Commissione. CONFAD presente",
  excerpt:
    "Dopo mesi di stallo, la Commissione Lavoro del Senato ha ripreso l'esame del Disegno di Legge per il riconoscimento del Caregiver Familiare. CONFAD APS è stata convocata in audizione per portare la voce delle 120.000 famiglie associate. Il testo attuale prevede tutele previdenziali, permessi lavorativi e misure di sostegno al reddito. La nostra posizione: importante ma ancora insufficiente. Continuiamo a lottare.",
  readTime: "5 min",
};

const latestNews = [
  {
    category: "Fondi",
    date: "20 Giugno 2025",
    title: "Ripartizione fondi caregiver 2025: come accedere e cosa sapere",
    excerpt: "Il Ministero del Lavoro ha pubblicato il riparto dei fondi stanziati dalla Legge di Bilancio per i Caregiver. Ecco una guida pratica per sapere se la tua regione ha ricevuto risorse e come presentare domanda.",
    tag: "Focus Leggi & Diritti",
  },
  {
    category: "ISEE",
    date: "10 Giugno 2025",
    title: "Stop al Nuovo ISEE: la nostra battaglia continua in Cassazione",
    excerpt: "CONFAD APS ha depositato un ricorso collettivo contro il calcolo dell'indennità di accompagnamento nell'ISEE. Più di 3.000 famiglie hanno aderito. Aggiornamento sull'iter giudiziario.",
    tag: "Storie & Condivisione",
  },
  {
    category: "Mutuo Aiuto",
    date: "2 Giugno 2025",
    title: "Riprendono i gruppi di mutuo aiuto di luglio: come iscriversi",
    excerpt: "Da settembre ripartono i gruppi di ascolto guidati da psicologi esperti in burnout del caregiver. Partecipazione gratuita per i soci CONFAD.",
    tag: "Benessere & Supporto",
  },
  {
    category: "Campagna",
    date: "20 Maggio 2025",
    title: "#unaleggesubito raggiunge 500.000 firme: grazie a tutte le famiglie",
    excerpt: "La petizione lanciata da CONFAD APS ha superato le 500.000 firme. Un traguardo straordinario che dimostra la forza di una comunità unita.",
    tag: "Call to Action",
  },
];

const tagColors: Record<string, string> = {
  "Focus Leggi & Diritti": "#1a3a6e",
  "Storie & Condivisione": "#c0392b",
  "Benessere & Supporto": "#2d5aa8",
  "Call to Action": "#92650a",
};

export default function NewsSection() {
  return (
    <section id="notizie" className="section" style={{ background: "#fff" }}>
      <div className="container">
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="section-label">Aggiornamenti</span>
            <h2 className="section-title" style={{ marginBottom: 0 }}>Notizie & Campagne</h2>
          </div>
          <a href="#" className="btn btn-dark">Tutte le Notizie →</a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 32, alignItems: "start" }}>
          {/* Featured Article */}
          <article
            style={{ background: "linear-gradient(160deg, var(--primary-dark) 0%, var(--primary-light) 100%)", borderRadius: "var(--radius-lg)", padding: "42px 40px", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "flex-end", position: "relative", overflow: "hidden", minHeight: 460 }}
          >
            {/* Watermark */}
            <div style={{ position: "absolute", top: 28, right: 28, fontSize: "4rem", fontWeight: 900, color: "rgba(232,184,75,0.12)", lineHeight: 1, textAlign: "right" }}>
              #una<br />legge<br />subito
            </div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                <span style={{ background: "var(--accent)", color: "var(--primary-dark)", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100 }}>{featured.category}</span>
                <span style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.75)", fontSize: 11, padding: "4px 12px", borderRadius: 100 }}>{featured.date}</span>
                <span style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)", fontSize: 11, padding: "4px 12px", borderRadius: 100 }}>📖 {featured.readTime} di lettura</span>
              </div>

              <h3 style={{ fontSize: "1.45rem", fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: 18 }}>{featured.title}</h3>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, marginBottom: 28 }}>{featured.excerpt}</p>
              <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--accent)", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                Leggi l&apos;articolo completo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
            </div>
          </article>

          {/* Side list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {latestNews.map((n, i) => (
              <article
                key={i}
                style={{ padding: "20px 0", borderBottom: i < latestNews.length - 1 ? "1px solid var(--border)" : "none", cursor: "pointer" }}
                onMouseEnter={(e) => { e.currentTarget.style.paddingLeft = "8px"; }}
                onMouseLeave={(e) => { e.currentTarget.style.paddingLeft = "0px"; }}
              >
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: tagColors[n.tag] || "#666" }}>{n.tag}</span>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--text-light)", display: "block" }} />
                  <span style={{ fontSize: 11, color: "var(--text-light)" }}>{n.date}</span>
                </div>
                <h4 style={{ fontSize: 14, fontWeight: 700, color: "var(--primary-dark)", marginBottom: 6, lineHeight: 1.4 }}>{n.title}</h4>
                <p style={{ fontSize: 13, color: "var(--text-light)", lineHeight: 1.6 }}>{n.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
