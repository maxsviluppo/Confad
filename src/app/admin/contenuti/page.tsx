"use client";
import { useState } from "react";

const defaultSlides = [
  { badge: "#unaleggesubito", title: "Diamo voce a chi si prende cura", subtitle: "CONFAD APS lotta ogni giorno per il pieno riconoscimento giuridico, economico e sociale del Caregiver Familiare in Italia.", cta: "Unisciti a Noi", secondary: "La nostra storia" },
  { badge: "Caregiver Familiare", title: "Non sei solo: noi siamo qui", subtitle: "Gruppi di mutuo aiuto, supporto psicologico professionale e una comunità di migliaia di famiglie pronte ad accoglierti.", cta: "Chiedi Supporto", secondary: "Leggi le storie" },
  { badge: "Art. 3 Costituzione", title: "Uguaglianza non è una parola", subtitle: "Portiamo avanti ricorsi collettivi, battaglie legislative e campagne virali per l'attuazione reale dei diritti delle persone con disabilità.", cta: "Partecipa alla Lotta", secondary: "Dona il 5×1000" },
];

const defaultNews = [
  { id: "1", category: "Focus Leggi & Diritti", date: "28 Giugno 2025", title: "DDL Caregiver: ripartono le audizioni in Commissione. CONFAD presente", excerpt: "Dopo mesi di stallo, la Commissione Lavoro del Senato ha ripreso l'esame del DDL.", published: true },
  { id: "2", category: "Focus Leggi & Diritti", date: "20 Giugno 2025", title: "Ripartizione fondi caregiver 2025: come accedere e cosa sapere", excerpt: "Guida pratica per sapere se la tua regione ha ricevuto risorse.", published: true },
  { id: "3", category: "Storie & Condivisione", date: "10 Giugno 2025", title: "Stop al Nuovo ISEE: la nostra battaglia continua in Cassazione", excerpt: "CONFAD APS ha depositato un ricorso collettivo contro il calcolo dell'indennità di accompagnamento.", published: true },
  { id: "4", category: "Benessere & Supporto", date: "2 Giugno 2025", title: "Riprendono i gruppi di mutuo aiuto di luglio: come iscriversi", excerpt: "Da settembre ripartono i gruppi di ascolto guidati da psicologi.", published: false },
];

const categories = ["Focus Leggi & Diritti", "Storie & Condivisione", "Benessere & Supporto", "Call to Action"];

export default function ContenutiPage() {
  const [activeTab, setActiveTab] = useState("hero");
  const [slides, setSlides] = useState(defaultSlides);
  const [activeSlide, setActiveSlide] = useState(0);
  const [news, setNews] = useState(defaultNews);
  const [editingNews, setEditingNews] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const updateSlide = (i: number, key: string, val: string) => {
    setSlides((prev) => prev.map((s, idx) => idx === i ? { ...s, [key]: val } : s));
  };

  return (
    <>
      <div className="admin-topbar">
        <div>
          <div className="topbar-title">Gestione Contenuti (CONFAD APS)</div>
          <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>Modifica i testi istituzionali e le slide</div>
        </div>
        <div className="topbar-actions">
          {saved && <span className="badge badge-green">✓ Salvato!</span>}
          <button onClick={save} className="btn btn-primary">💾 Salva Modifiche</button>
        </div>
      </div>

      <div className="admin-content">
        <div className="tabs">
          {[
            { id: "hero", label: "🎯 Hero Slider" },
            { id: "chisiamo", label: "🏛️ Chi Siamo" },
            { id: "news", label: "📰 Notizie" },
            { id: "footer", label: "🔗 Footer" },
          ].map((t) => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} className={`tab-item ${activeTab === t.id ? "active" : ""}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── HERO SLIDER ── */}
        {activeTab === "hero" && (
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20 }}>
            {/* Slide selector */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {slides.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  style={{
                    textAlign: "left", padding: "14px 16px", borderRadius: "var(--r)",
                    border: activeSlide === i ? "2px solid var(--primary)" : "2px solid var(--border)",
                    background: activeSlide === i ? "rgba(26,58,110,0.06)" : "var(--surface)",
                    cursor: "pointer", transition: "all var(--t)",
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-3)", marginBottom: 4 }}>SLIDE {i + 1}</div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>{s.title.slice(0, 30)}...</div>
                </button>
              ))}
            </div>

            {/* Slide editor */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Slide {activeSlide + 1}</div>
                <span className="badge badge-blue">Modifica</span>
              </div>
              <div className="card-body">
                {[
                  { key: "badge", label: "Badge / Hashtag", hint: "Es: #unaleggesubito o Caregiver Familiare" },
                  { key: "title", label: "Titolo Principale", hint: "Testo impattante" },
                  { key: "subtitle", label: "Sottotitolo / Descrizione", hint: "Massimo 160 caratteri" },
                  { key: "cta", label: "Pulsante Principale (CTA)", hint: "Es: Unisciti a noi" },
                  { key: "secondary", label: "Pulsante Secondario", hint: "Es: La nostra storia" },
                ].map((f) => (
                  <div key={f.key} className="form-group">
                    <label className="form-label">{f.label}</label>
                    {f.key === "subtitle" ? (
                      <textarea className="form-textarea" value={(slides[activeSlide] as Record<string, string>)[f.key]} onChange={(e) => updateSlide(activeSlide, f.key, e.target.value)} style={{ minHeight: 80 }} />
                    ) : (
                      <input className="form-input" value={(slides[activeSlide] as Record<string, string>)[f.key]} onChange={(e) => updateSlide(activeSlide, f.key, e.target.value)} />
                    )}
                    <div className="form-hint">{f.hint}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── CHI SIAMO ── */}
        {activeTab === "chisiamo" && (
          <div className="card">
            <div className="card-header"><div className="card-title">Sezione Chi Siamo</div></div>
            <div className="card-body">
              {[
                { key: "cs_title", label: "Titolo", def: "Un movimento di famiglie che non si arrendono" },
                { key: "cs_par1", label: "Primo paragrafo", def: "CONFAD APS — Coordinamento Nazionale Famiglie con Disabilità — è nata come movimento spontaneo di famiglie che si prendono cura di un congiunto con disabilità grave o non autosufficienza.", ta: true },
                { key: "cs_par2", label: "Secondo paragrafo", def: "La nostra missione è chiara: non chiediamo carità, chiediamo diritti. Lavorare per ottenere il riconoscimento pieno del Caregiver Familiare in Italia.", ta: true },
                { key: "cs_cta1", label: "CTA principale", def: "Scopri cosa facciamo" },
                { key: "cs_cta2", label: "CTA secondario", def: "Iscriviti gratis" },
              ].map((f) => (
                <div key={f.key} className="form-group">
                  <label className="form-label">{f.label}</label>
                  {f.ta
                    ? <textarea className="form-textarea" defaultValue={f.def} />
                    : <input className="form-input" defaultValue={f.def} />
                  }
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── NEWS ── */}
        {activeTab === "news" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Add News */}
            <div className="card">
              <div className="card-header">
                <div className="card-title">Notizie, Aggiornamenti & Campagne</div>
                <button
                  onClick={() => {
                    const newItem = { id: Date.now().toString(), category: "Focus Leggi & Diritti", date: new Date().toLocaleDateString("it-IT"), title: "Nuovo articolo", excerpt: "", published: false };
                    setNews((prev) => [newItem, ...prev]);
                    setEditingNews(newItem.id);
                  }}
                  className="btn btn-primary btn-sm"
                >
                  + Aggiungi Notizia
                </button>
              </div>

              {news.map((n) => (
                <div
                  key={n.id}
                  style={{
                    padding: "16px 24px", borderBottom: "1px solid var(--border)",
                    display: editingNews === n.id ? "block" : "flex",
                    alignItems: "center", gap: 16,
                  }}
                >
                  {editingNews === n.id ? (
                    <div>
                      <div className="form-grid-2" style={{ marginBottom: 12 }}>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">Pilastro Tema</label>
                          <select className="form-select" value={n.category} onChange={(e) => setNews((prev) => prev.map((x) => x.id === n.id ? { ...x, category: e.target.value } : x))}>
                            {categories.map((c) => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="form-group" style={{ marginBottom: 0 }}>
                          <label className="form-label">Data</label>
                          <input className="form-input" value={n.date} onChange={(e) => setNews((prev) => prev.map((x) => x.id === n.id ? { ...x, date: e.target.value } : x))} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Titolo</label>
                        <input className="form-input" value={n.title} onChange={(e) => setNews((prev) => prev.map((x) => x.id === n.id ? { ...x, title: e.target.value } : x))} />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Estratto</label>
                        <textarea className="form-textarea" style={{ minHeight: 80 }} value={n.excerpt} onChange={(e) => setNews((prev) => prev.map((x) => x.id === n.id ? { ...x, excerpt: e.target.value } : x))} />
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setEditingNews(null)} className="btn btn-primary btn-sm">✓ Conferma</button>
                        <button onClick={() => setNews((prev) => prev.filter((x) => x.id !== n.id))} className="btn btn-danger btn-sm">🗑️ Elimina</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                          <span className="badge badge-blue">{n.category}</span>
                          <span className={`badge ${n.published ? "badge-green" : "badge-gray"}`}>{n.published ? "Pubblicato" : "Bozza"}</span>
                          <span style={{ fontSize: 11, color: "var(--text-3)" }}>{n.date}</span>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{n.title}</div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setNews((prev) => prev.map((x) => x.id === n.id ? { ...x, published: !x.published } : x))} className={`btn btn-sm ${n.published ? "btn-ghost" : "btn-accent"}`}>
                          {n.published ? "Archivia" : "Pubblica"}
                        </button>
                        <button onClick={() => setEditingNews(n.id)} className="btn btn-ghost btn-sm">✏️ Modifica</button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── FOOTER ── */}
        {activeTab === "footer" && (
          <div className="card">
            <div className="card-header"><div className="card-title">Testi Footer</div></div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Descrizione Brand</label>
                <textarea className="form-textarea" defaultValue="Coordinamento Nazionale Famiglie con Disabilità. Associazione di Promozione Sociale operante su tutto il territorio italiano." style={{ minHeight: 80 }} />
              </div>
              <div className="form-group">
                <label className="form-label">Nota Copyright & CF</label>
                <input className="form-input" defaultValue="© 2025 CONFAD APS – Associazione di Promozione Sociale. CF: 96541250582. Tutti i diritti riservati." />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
