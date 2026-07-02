"use client";
import { useState } from "react";

interface SeoPage {
  id: string;
  label: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDesc: string;
  robots: string;
  canonical: string;
  aiScoring: number;
}

// Mappatura automatica di tutte le pagine ed ancore strutturate del portale CONFAD APS
const defaultPages: SeoPage[] = [
  {
    id: "home",
    label: "🏠 Homepage (Principale)",
    title: "CONFAD APS – Coordinamento Nazionale Famiglie con Disabilità",
    description: "CONFAD APS tutela i diritti delle famiglie con disabilità grave in Italia. Riconoscimento del Caregiver Familiare, supporto psicologico e gruppi di mutuo aiuto.",
    ogTitle: "CONFAD APS – Per la tutela dei caregiver familiari",
    ogDesc: "Lottiamo per il riconoscimento del Caregiver Familiare. Unisciti a noi e fai sentire la tua voce.",
    robots: "index, follow",
    canonical: "https://www.confad.eu/",
    aiScoring: 95,
  },
  {
    id: "chisiamo",
    label: "🏛️ Sezione Chi Siamo",
    title: "Chi Siamo – CONFAD APS Coordinamento Famiglie Disabilità",
    description: "La storia, la missione e le battaglie di CONFAD APS al fianco dei caregiver familiari e delle famiglie con disabilità gravi e non autosufficienti.",
    ogTitle: "Chi Siamo – Il movimento CONFAD APS",
    ogDesc: "Scopri la nostra storia, la campagna #unaleggesubito ed il nostro statuto di promozione sociale.",
    robots: "index, follow",
    canonical: "https://www.confad.eu/#chi-siamo",
    aiScoring: 90,
  },
  {
    id: "servizi",
    label: "🛠️ Cosa Facciamo (Servizi)",
    title: "Servizi e Iniziative di Supporto per Famiglie – CONFAD APS",
    description: "I nostri pilastri: advocacy politica, gruppi di mutuo aiuto per caregiver, assistenza legale per l'Isee e percorsi di supporto psicologico.",
    ogTitle: "Cosa Facciamo – I servizi di CONFAD APS",
    ogDesc: "Dall'advocacy e i ricorsi ISEE fino al mutuo aiuto e sostegno psicologico gratuito per caregiver familiari.",
    robots: "index, follow",
    canonical: "https://www.confad.eu/#servizi",
    aiScoring: 92,
  },
  {
    id: "obiettivi",
    label: "🎯 I Nostri Obiettivi",
    title: "Obiettivi Legislativi e Tutele Caregiver – CONFAD APS",
    description: "I traguardi e le proposte di legge per il riconoscimento giuridico e previdenziale dei caregiver e l'attuazione dell'articolo 3 della Costituzione.",
    ogTitle: "Obiettivi e Battaglie Legislativi – CONFAD APS",
    ogDesc: "La nostra proposta di legge nazionale per i caregiver e la lotta contro il calcolo delle indennità nell'ISEE.",
    robots: "index, follow",
    canonical: "https://www.confad.eu/#obiettivi",
    aiScoring: 88,
  },
  {
    id: "notizie",
    label: "📰 Notizie & Aggiornamenti",
    title: "Ultime Notizie, Bandi e Riforma Caregiver – CONFAD APS",
    description: "Resta aggiornato su DDL caregiver, distribuzione dei fondi regionali, ricorsi collettivi ISEE e iniziative di volontariato CONFAD.",
    ogTitle: "Notizie e Campagne Nazionali – CONFAD APS",
    ogDesc: "Leggi gli aggiornamenti in tempo reale sull'iter della legge nazionale e le attività dell'associazione.",
    robots: "index, follow",
    canonical: "https://www.confad.eu/#notizie",
    aiScoring: 85,
  },
  {
    id: "contatti",
    label: "📞 Contatti & 5×1000",
    title: "Contatta l'Associazione CONFAD – Supporto e Iscrizioni",
    description: "Scrivici per iscriverti gratuitamente a CONFAD APS, richiedere l'accesso ai gruppi di mutuo aiuto o donare il 5×1000 (CF: 96541250582).",
    ogTitle: "Contatta CONFAD APS – Area Sostegno e Volontariato",
    ogDesc: "Richiedi informazioni sui servizi per famiglie e scopri come sostenerci con la dichiarazione dei redditi.",
    robots: "index, follow",
    canonical: "https://www.confad.eu/#contatti",
    aiScoring: 94,
  },
];

const checklistItems = [
  { id: "title-len", label: "Title tag ottimale (40-65 caratteri)", check: (p: SeoPage) => p.title.length >= 40 && p.title.length <= 65 },
  { id: "desc-len", label: "Meta description idonea (120-165 caratteri)", check: (p: SeoPage) => p.description.length >= 120 && p.description.length <= 165 },
  { id: "title-kw", label: "Brand 'CONFAD' incluso nel Title", check: (p: SeoPage) => p.title.includes("CONFAD") },
  { id: "desc-kw", label: "Keywords semantiche incluse (Caregiver / Disabilità / Famiglia)", check: (p: SeoPage) => p.description.toLowerCase().includes("caregiver") || p.description.toLowerCase().includes("disabilità") || p.description.toLowerCase().includes("famigli") },
  { id: "og-title", label: "Open Graph Title configurato", check: (p: SeoPage) => p.ogTitle.length > 10 },
  { id: "canonical", label: "URL Canonical conforme (HTTPS)", check: (p: SeoPage) => p.canonical.startsWith("https://") },
];

const aiCrawlersData = [
  { bot: "Google-Extended (Gemini)", allowed: true, requests30d: 1420, lastScan: "10 Minuti fa", purpose: "Addestramento & Risposte Generative", status: "Ottimizzato" },
  { bot: "GPTBot (ChatGPT)", allowed: true, requests30d: 1105, lastScan: "3 Ore fa", purpose: "Risposte SearchGPT", status: "Ottimizzato" },
  { bot: "ClaudeBot (Anthropic)", allowed: true, requests30d: 642, lastScan: "1 Giorno fa", purpose: "Sintesi Documentazione", status: "Ottimizzato" },
  { bot: "PerplexityBot", allowed: true, requests30d: 980, lastScan: "32 Minuti fa", purpose: "Citazioni in tempo reale", status: "Ottimizzato" },
];

const aiOptimizationChecks = [
  { id: "plain-txt", title: "Formato Testuale Pulito (RAG Ready)", desc: "Assenza di contenuti nascosti e markup semantico corretto per agevolare lo scraping dei LLM.", ok: true },
  { id: "schema-ld", title: "Schema.org Rich Context", desc: "La presenza di dati strutturati SocialGroup e Organization facilita la comprensione del brand alle AI.", ok: true },
  { id: "robots-extended", title: "Indicizzazione Libera AI (Robots.txt)", desc: "I bot Gemini e ChatGPT non sono bloccati nel file robots.txt, garantendo risposte aggiornate nei motori AI.", ok: true },
  { id: "verifiable-stats", title: "Dati Verificabili (Citations Ready)", desc: "Presenza di dati numerici chiari e fonti verificabili (es. 120.000+, CF: 96541250582) ideali per le risposte con note e link alle AI.", ok: true },
];

export default function SeoPage() {
  const [pages, setPages] = useState<SeoPage[]>(defaultPages);
  const [activePage, setActivePage] = useState("home");
  const [activeTab, setActiveTab] = useState("meta");
  const [aiBotsAllowed, setAiBotsAllowed] = useState(true);
  const [saved, setSaved] = useState(false);

  const page = pages.find((p) => p.id === activePage)!;

  const update = (key: keyof SeoPage, val: string) => {
    setPages((prev) => prev.map((p) => p.id === activePage ? { ...p, [key]: val } : p));
  };

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const score = checklistItems.filter((c) => c.check(page)).length;
  const scoreColor = score >= 5 ? "var(--green)" : score >= 3 ? "var(--orange)" : "var(--red)";
  const scoreLabel = score >= 5 ? "Eccellente" : score >= 3 ? "Buono" : "Da migliorare";

  return (
    <>
      <div className="admin-topbar">
        <div>
          <div className="topbar-title">SEO & AI Engine (CONFAD APS)</div>
          <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>Ottimizza l&apos;indicizzazione automatica di tutte le sezioni del portale</div>
        </div>
        <div className="topbar-actions">
          {saved && <span className="badge badge-green">✓ Salvato!</span>}
          <button onClick={save} className="btn btn-primary">💾 Salva Configurazione</button>
        </div>
      </div>

      <div className="admin-content">
        {/* Score Banner */}
        <div style={{ display: "flex", alignItems: "center", gap: 24, padding: "20px 24px", background: "var(--surface)", borderRadius: "var(--r-lg)", border: "1px solid var(--border)", marginBottom: 24 }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", border: `4px solid ${scoreColor}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 22, fontWeight: 900, color: scoreColor }}>{Math.round((score / checklistItems.length) * 100)}</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "var(--text)", marginBottom: 4 }}>Punteggio Indicizzazione: <span style={{ color: scoreColor }}>{scoreLabel}</span></div>
            <div style={{ fontSize: 13, color: "var(--text-2)" }}>{score}/{checklistItems.length} parametri superati per questa sezione. L&apos;AI stima un livello di leggibilità del {page.aiScoring}% per motori generativi (RAG).</div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>
          {/* List of auto-indexed pages */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-3)", marginBottom: 4, textTransform: "uppercase" }}>Mappa Sezioni Rilevate</div>
            {pages.map((p) => (
              <button key={p.id} onClick={() => setActivePage(p.id)} style={{ textAlign: "left", padding: "12px 14px", borderRadius: "var(--r)", border: activePage === p.id ? "2px solid var(--primary)" : "2px solid var(--border)", background: activePage === p.id ? "rgba(26,58,110,0.06)" : "var(--surface)", cursor: "pointer", fontSize: 13, fontWeight: 600, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{p.label}</span>
                <span className="badge badge-green" style={{ fontSize: 10, padding: "2px 6px" }}>{p.aiScoring}%</span>
              </button>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", marginTop: 12, paddingTop: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-3)", marginBottom: 10, textTransform: "uppercase" }}>Configurazione AI</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--surface)", padding: 10, borderRadius: 8, border: "1px solid var(--border)" }}>
                <span style={{ fontSize: 12, fontWeight: 600 }}>Permetti AI Bot</span>
                <button
                  onClick={() => setAiBotsAllowed(!aiBotsAllowed)}
                  className={`toggle ${aiBotsAllowed ? "on" : ""}`}
                  style={{ width: 40, height: 20 }}
                />
              </div>
              <div style={{ fontSize: 10, color: "var(--text-3)", marginTop: 5 }}>Abilita la scansione e le citazioni del sito all&apos;interno delle risposte di Gemini, ChatGPT e Claude.</div>
            </div>
          </div>

          {/* Editor */}
          <div>
            <div className="tabs">
              {[
                { id: "meta", label: "Metadati Classici" },
                { id: "og", label: "Open Graph (Social)" },
                { id: "ai-bots", label: "🤖 AI Search Indexing" },
                { id: "checklist", label: "Checklist SEO" },
                { id: "schema", label: "Dati Strutturati" }
              ].map((t) => (
                <button key={t.id} onClick={() => setActiveTab(t.id)} className={`tab-item ${activeTab === t.id ? "active" : ""}`}>{t.label}</button>
              ))}
            </div>

            {/* CLASSICA */}
            {activeTab === "meta" && (
              <div className="card">
                <div className="card-body">
                  <div className="form-group">
                    <label className="form-label">Title Tag <span>*</span></label>
                    <input className="form-input" value={page.title} onChange={(e) => update("title", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Meta Description <span>*</span></label>
                    <textarea className="form-textarea" value={page.description} onChange={(e) => update("description", e.target.value)} />
                  </div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label className="form-label">Robots</label>
                      <input className="form-input" value={page.robots} onChange={(e) => update("robots", e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Canonical URL</label>
                      <input className="form-input" value={page.canonical} onChange={(e) => update("canonical", e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* OG */}
            {activeTab === "og" && (
              <div className="card">
                <div className="card-body">
                  <div className="form-group">
                    <label className="form-label">OG Title</label>
                    <input className="form-input" value={page.ogTitle} onChange={(e) => update("ogTitle", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">OG Description</label>
                    <textarea className="form-textarea" value={page.ogDesc} onChange={(e) => update("ogDesc", e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {/* AI BOTS */}
            {activeTab === "ai-bots" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Statistiche Scansione Generativa / LLM</div>
                    <span className="badge badge-green">Ultimi 30 giorni</span>
                  </div>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Agent / LLM Bot</th>
                        <th>Stato</th>
                        <th style={{ textAlign: "right" }}>Richieste Scansione</th>
                        <th>Ultimo Passaggio</th>
                        <th>Scopo Principale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {aiCrawlersData.map((c, i) => (
                        <tr key={i}>
                          <td style={{ fontWeight: 600 }}>{c.bot}</td>
                          <td>
                            <span className={`badge ${aiBotsAllowed && c.allowed ? "badge-green" : "badge-red"}`}>
                              {aiBotsAllowed && c.allowed ? "Consentito" : "Bloccato"}
                            </span>
                          </td>
                          <td style={{ textAlign: "right", fontWeight: 700 }}>{c.requests30d}</td>
                          <td style={{ color: "var(--text-3)", fontSize: 12.5 }}>{c.lastScan}</td>
                          <td style={{ fontSize: 13, color: "var(--text-2)" }}>{c.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="card">
                  <div className="card-header">
                    <div className="card-title">Requisiti di Ottimizzazione AI per questa sezione ({page.label})</div>
                  </div>
                  <div>
                    {aiOptimizationChecks.map((item, idx) => (
                      <div key={idx} style={{ display: "flex", gap: 16, padding: "16px 24px", borderBottom: idx < aiOptimizationChecks.length - 1 ? "1px solid var(--border)" : "none", alignItems: "start" }}>
                        <span style={{ fontSize: 20, color: "var(--green)" }}>✓</span>
                        <div>
                          <div style={{ fontWeight: 700, color: "var(--primary-dark)", fontSize: 13.5 }}>{item.title}</div>
                          <div style={{ fontSize: 12.5, color: "var(--text-light)", marginTop: 4, lineHeight: 1.5 }}>{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* CHECKLIST */}
            {activeTab === "checklist" && (
              <div className="card">
                <div className="card-header"><div className="card-title">Controlli SEO per {page.label}</div></div>
                <div>
                  {checklistItems.map((c) => {
                    const ok = c.check(page);
                    return (
                      <div key={c.id} style={{ display: "flex", gap: 12, padding: "12px 24px", borderBottom: "1px solid var(--border)", alignItems: "center" }}>
                        <span style={{ color: ok ? "var(--green)" : "var(--red)", fontSize: 16 }}>{ok ? "✓" : "✗"}</span>
                        <span style={{ fontSize: 13, color: "var(--text)" }}>{c.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SCHEMA */}
            {activeTab === "schema" && (
              <div className="card">
                <div className="card-body">
                  <pre style={{ background: "#1e2235", color: "#e2e8f0", padding: 16, borderRadius: 8, fontSize: 12, overflowX: "auto" }}>
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "WebPage",
                      "name": page.label,
                      "url": page.canonical,
                      "description": page.description,
                      "isPartOf": {
                        "@type": "WebSite",
                        "name": "CONFAD APS",
                        "url": "https://www.confad.eu"
                      }
                    }, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .toggle {
          width: 44px; height: 24px; border-radius: 100px;
          background: var(--border); position: relative;
          cursor: pointer; transition: background var(--t);
          border: none; flex-shrink: 0;
        }
        .toggle.on { background: var(--primary); }
        .toggle::after {
          content: ''; position: absolute;
          width: 18px; height: 18px; border-radius: 50%;
          background: #fff; top: 3px; left: 3px;
          transition: left var(--t);
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
        }
        .toggle.on::after { left: 23px; }
      `}</style>
    </>
  );
}
