"use client";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    ruolo: "Caregiver Familiare",
    messaggio: "",
    newsletter: true,
    privacy: false,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.privacy) {
      alert("È necessario accettare l'informativa sulla privacy per procedere.");
      return;
    }
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setFormData({
        nome: "",
        email: "",
        telefono: "",
        ruolo: "Caregiver Familiare",
        messaggio: "",
        newsletter: true,
        privacy: false,
      });
    }, 1500);
  };

  return (
    <section id="contatti" className="section" style={{ background: "var(--surface-2)", paddingTop: 96, paddingBottom: 96 }}>
      <style>{`
        .contact-input {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid var(--border);
          border-radius: 12px;
          font-size: 14px;
          color: var(--primary-dark);
          background: #fff;
          outline: none;
          transition: all 0.25s ease;
        }
        .contact-input:focus {
          border-color: var(--primary-light);
          box-shadow: 0 0 0 4px rgba(45,90,168,0.12);
        }
        .contact-select {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid var(--border);
          border-radius: 12px;
          font-size: 14px;
          color: var(--primary-dark);
          background: #fff;
          outline: none;
          cursor: pointer;
        }
        .contact-textarea {
          width: 100%;
          padding: 14px 16px;
          border: 1px solid var(--border);
          border-radius: 12px;
          font-size: 14px;
          color: var(--primary-dark);
          background: #fff;
          outline: none;
          resize: vertical;
          min-height: 120px;
          transition: all 0.25s ease;
        }
        .contact-textarea:focus {
          border-color: var(--primary-light);
          box-shadow: 0 0 0 4px rgba(45,90,168,0.12);
        }
      `}</style>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 72, alignItems: "center" }}>
          {/* Info */}
          <div>
            <span className="section-label">Contatti</span>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)", lineHeight: 1.15 }}>Fai sentire la tua voce. Unisciti a noi.</h2>
            <p className="section-subtitle" style={{ marginBottom: 44, color: "var(--text-light)" }}>
              Sia che tu abbia bisogno di supporto, sia che voglia unirti alle nostre battaglie legislative o sostenerci con la firma per il 5×1000.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div style={{ display: "flex", gap: 20, alignItems: "start" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(26,58,110,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "var(--primary)", flexShrink: 0 }}>📍</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: "var(--primary-dark)" }}>Sede Nazionale</div>
                  <div style={{ fontSize: 14, color: "var(--text-light)", marginTop: 4 }}>Roma, Italia</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 20, alignItems: "start" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(26,58,110,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "var(--primary)", flexShrink: 0 }}>✉️</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: "var(--primary-dark)" }}>Email Ufficiale</div>
                  <div style={{ fontSize: 14, color: "var(--text-light)", marginTop: 4 }}>
                    <a href="mailto:info@confad.eu" style={{ textDecoration: "underline", color: "inherit", fontWeight: 600 }}>info@confad.eu</a>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 20, alignItems: "start" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(232,184,75,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, color: "#92650a", flexShrink: 0 }}>🎗️</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: "var(--primary-dark)" }}>Codice Fiscale per 5×1000</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#92650a", marginTop: 4, letterSpacing: "0.08em" }}>
                    96541250582
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-light)", marginTop: 4 }}>Inserisci questo codice nell&apos;apposita scheda per il sostegno del Terzo Settore.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="card" style={{ padding: "48px 40px", borderRadius: 24, boxShadow: "0 10px 40px rgba(0,0,0,0.04)", border: "1px solid var(--border)" }}>
            {status === "success" ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 56, marginBottom: 20 }}>❤️</div>
                <h3 style={{ fontSize: 22, fontWeight: 900, color: "var(--primary-dark)", marginBottom: 12 }}>Richiesta Inviata</h3>
                <p style={{ color: "var(--text-light)", fontSize: 14, lineHeight: 1.6, maxWidth: 360, margin: "0 auto 28px" }}>
                  Grazie per esserti messo in contatto. Un volontario CONFAD ti risponderà il prima possibile.
                </p>
                <button onClick={() => setStatus("idle")} className="btn btn-dark btn-sm" style={{ padding: "10px 24px" }}>Invia un altro messaggio</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ marginBottom: 4 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 900, color: "var(--primary-dark)", marginBottom: 6 }}>Compila il Form</h3>
                  <p style={{ fontSize: 13, color: "var(--text-light)" }}>Iscriviti o richiedi l&apos;accesso ai gruppi di mutuo aiuto.</p>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <input type="text" className="contact-input" required value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} placeholder="Nome e Cognome *" />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <input type="email" className="contact-input" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Indirizzo Email *" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <input type="tel" className="contact-input" value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} placeholder="Telefono" />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <select className="contact-select" value={formData.ruolo} onChange={(e) => setFormData({ ...formData, ruolo: e.target.value })}>
                    <option>Caregiver Familiare</option>
                    <option>Persona con disabilità</option>
                    <option>Volontario / Sostenitore</option>
                    <option>Operatore Sanitario o Sociale</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginBottom: 0 }}>
                  <textarea className="contact-textarea" required rows={4} value={formData.messaggio} onChange={(e) => setFormData({ ...formData, messaggio: e.target.value })} placeholder="Scrivi qui la tua storia o richiesta *" />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 4 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
                    <input type="checkbox" id="newsletter" checked={formData.newsletter} onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })} style={{ marginTop: 4, width: 16, height: 16, cursor: "pointer" }} />
                    <label htmlFor="newsletter" style={{ fontSize: 13, color: "var(--text-light)", cursor: "pointer", lineHeight: 1.45 }}>
                      Desidero ricevere aggiornamenti sulle leggi e le attività di CONFAD APS (Newsletter)
                    </label>
                  </div>

                  <div style={{ display: "flex", gap: 12, alignItems: "start" }}>
                    <input type="checkbox" id="privacy" required checked={formData.privacy} onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })} style={{ marginTop: 4, width: 16, height: 16, cursor: "pointer" }} />
                    <label htmlFor="privacy" style={{ fontSize: 13, color: "var(--text-light)", cursor: "pointer", lineHeight: 1.45 }}>
                      Accetto il trattamento dei dati personali secondo l&apos;informativa sulla privacy *
                    </label>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px", borderRadius: 12, fontSize: 14, fontWeight: 700 }} disabled={status === "loading"}>
                  {status === "loading" ? "Invio in corso..." : "Invia Richiesta"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
