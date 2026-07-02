"use client";
import { useState, useEffect } from "react";

const defaultData = {
  ragioneSociale: "CONFAD APS – Coordinamento Nazionale Famiglie con Disabilità",
  formaGiuridica: "Associazione di Promozione Sociale / ETS",
  piva: "",
  codiceFiscale: "96541250582",
  reaNumero: "",
  reaProvincia: "",
  indirizzo: "Via Nazionale, Roma",
  cap: "00184",
  citta: "Roma",
  provincia: "RM",
  email: "info@confad.eu",
  pec: "confad@pec.it",
  telefono: "+39 06 1234567",
  fax: "",
  sitoWeb: "https://www.confad.eu",
  linkedin: "https://linkedin.com/company/confad",
  facebook: "https://facebook.com/confad",
  twitter: "https://twitter.com/confad",
  instagram: "",
  youtube: "",
  oraApertura: "09:00",
  oraChiusura: "18:00",
  giorniApertura: ["Lun", "Mar", "Mer", "Gio", "Ven"],
  descrizioneBreve: "Coordinamento Nazionale Famiglie con Disabilità. Lotta per la tutela dei diritti e il riconoscimento del Caregiver Familiare.",
  descrizioneLunga: "CONFAD APS è un Ente del Terzo Settore operante a livello nazionale in Italia, nato come movimento spontaneo di famiglie e poi strutturatosi in associazione. Ci occupiamo di advocacy politica, supporto psicologico e mutuo aiuto per combattere il burnout dei caregiver familiari.",
};

const days = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

export default function AziendaPage() {
  const [data, setData] = useState(defaultData);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("anagrafica");

  useEffect(() => {
    const stored = localStorage.getItem("confad_azienda");
    if (stored) setData(JSON.parse(stored));
  }, []);

  const save = () => {
    localStorage.setItem("confad_azienda", JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const set = (key: string, val: string | string[]) => setData((d) => ({ ...d, [key]: val }));

  const toggleDay = (day: string) => {
    const current = data.giorniApertura;
    set("giorniApertura", current.includes(day) ? current.filter((d) => d !== day) : [...current, day]);
  };

  return (
    <>
      <div className="admin-topbar">
        <div>
          <div className="topbar-title">Dati Societari (CONFAD APS)</div>
          <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>Gestisci le informazioni dell&apos;associazione</div>
        </div>
        <div className="topbar-actions">
          {saved && <span className="badge badge-green">✓ Salvato!</span>}
          <button onClick={save} className="btn btn-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2l11 0 5 5v11a2 2 0 0 1-2 2z"/>
              <polyline points="17 21 17 13 7 13 7 21"/>
              <polyline points="7 3 7 8 15 8"/>
            </svg>
            Salva Modifiche
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="tabs">
          {[
            { id: "anagrafica", label: "📋 Anagrafica" },
            { id: "contatti", label: "📞 Contatti & Social" },
            { id: "orari", label: "🕐 Orari" },
            { id: "descrizione", label: "✍️ Descrizione" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`tab-item ${activeTab === t.id ? "active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── ANAGRAFICA ── */}
        {activeTab === "anagrafica" && (
          <div className="card">
            <div className="card-header">
              <div className="card-title">Dati Anagrafici</div>
              <span className="badge badge-blue">Sezione pubblica</span>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Ragione Sociale <span>*</span></label>
                <input className="form-input" value={data.ragioneSociale} onChange={(e) => set("ragioneSociale", e.target.value)} />
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Tipologia Ente</label>
                  <select className="form-select" value={data.formaGiuridica} onChange={(e) => set("formaGiuridica", e.target.value)}>
                    <option>Associazione di Promozione Sociale / ETS</option>
                    <option>Organizzazione di Volontariato / ODV</option>
                    <option>Ente del Terzo Settore / ETS</option>
                    <option>Onlus</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Codice Fiscale <span>*</span></label>
                  <input className="form-input" value={data.codiceFiscale} onChange={(e) => set("codiceFiscale", e.target.value)} placeholder="CF dell'Associazione" />
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, marginTop: 4 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "var(--text-2)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.06em" }}>Sede Nazionale</div>
                <div className="form-group">
                  <label className="form-label">Indirizzo</label>
                  <input className="form-input" value={data.indirizzo} onChange={(e) => set("indirizzo", e.target.value)} placeholder="Via Nazionale" />
                </div>
                <div className="form-grid-3">
                  <div className="form-group">
                    <label className="form-label">CAP</label>
                    <input className="form-input" value={data.cap} onChange={(e) => set("cap", e.target.value)} placeholder="00184" maxLength={5} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Città</label>
                    <input className="form-input" value={data.citta} onChange={(e) => set("citta", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Provincia</label>
                    <input className="form-input" value={data.provincia} onChange={(e) => set("provincia", e.target.value)} maxLength={2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CONTATTI ── */}
        {activeTab === "contatti" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div className="card">
              <div className="card-header"><div className="card-title">Recapiti Istituzionali</div></div>
              <div className="card-body">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">Email Ufficiale</label>
                    <input className="form-input" type="email" value={data.email} onChange={(e) => set("email", e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">PEC</label>
                    <input className="form-input" type="email" value={data.pec} onChange={(e) => set("pec", e.target.value)} placeholder="pec@pec.it" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Telefono Sede</label>
                    <input className="form-input" type="tel" value={data.telefono} onChange={(e) => set("telefono", e.target.value)} placeholder="+39 06" />
                  </div>
                  <div className="form-group" style={{ gridColumn: "1/-1" }}>
                    <label className="form-label">Sito Web</label>
                    <input className="form-input" type="url" value={data.sitoWeb} onChange={(e) => set("sitoWeb", e.target.value)} />
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><div className="card-title">Social Media (Advocacy)</div></div>
              <div className="card-body">
                {[
                  { key: "linkedin", label: "LinkedIn", placeholder: "https://linkedin.com/company/confad", icon: "🔗" },
                  { key: "facebook", label: "Facebook", placeholder: "https://facebook.com/confad", icon: "📘" },
                  { key: "twitter", label: "Twitter / X", placeholder: "https://twitter.com/confad", icon: "🐦" },
                ].map((s) => (
                  <div key={s.key} className="form-group">
                    <label className="form-label">{s.icon} {s.label}</label>
                    <input
                      className="form-input"
                      type="url"
                      value={(data as any)[s.key]}
                      onChange={(e) => set(s.key, e.target.value)}
                      placeholder={s.placeholder}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ORARI ── */}
        {activeTab === "orari" && (
          <div className="card">
            <div className="card-header"><div className="card-title">Orari di Risposta & Sportello</div></div>
            <div className="card-body">
              <div style={{ marginBottom: 24 }}>
                <label className="form-label">Giorni di Attività</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {days.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleDay(d)}
                      style={{
                        padding: "8px 16px", borderRadius: 8, fontWeight: 600, fontSize: 13,
                        border: "1px solid",
                        cursor: "pointer", transition: "all var(--t)",
                        borderColor: data.giorniApertura.includes(d) ? "var(--primary)" : "var(--border)",
                        background: data.giorniApertura.includes(d) ? "var(--primary)" : "var(--surface)",
                        color: data.giorniApertura.includes(d) ? "#fff" : "var(--text-2)",
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">Orario Inizio</label>
                  <input className="form-input" type="time" value={data.oraApertura} onChange={(e) => set("oraApertura", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Orario Fine</label>
                  <input className="form-input" type="time" value={data.oraChiusura} onChange={(e) => set("oraChiusura", e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── DESCRIZIONE ── */}
        {activeTab === "descrizione" && (
          <div className="card">
            <div className="card-header">
              <div className="card-title">Presentazione Associazione</div>
              <span className="badge badge-gold">Usata su SEO e Schema.org</span>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Descrizione Breve (meta description)</label>
                <input className="form-input" value={data.descrizioneBreve} onChange={(e) => set("descrizioneBreve", e.target.value)} maxLength={160} />
                <div className="form-hint">{data.descrizioneBreve.length}/160 caratteri</div>
              </div>
              <div className="form-group">
                <label className="form-label">Mission Estesa</label>
                <textarea className="form-textarea" value={data.descrizioneLunga} onChange={(e) => set("descrizioneLunga", e.target.value)} style={{ minHeight: 160 }} placeholder="Descrivi la mission di CONFAD APS in modo completo..." />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
