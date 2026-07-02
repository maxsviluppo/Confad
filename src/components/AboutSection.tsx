"use client";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

const stats = [
  { value: 120000, suffix: "+", label: "Famiglie Rappresentate", desc: "In tutta Italia" },
  { value: 30, suffix: "+", label: "Gruppi di Mutuo Aiuto", desc: "Attivi su base mensile" },
  { value: 11, suffix: "", label: "Anni di Attività", desc: "Al fianco dei caregiver" },
  { value: 5, suffix: "×1000", label: "5×1000", desc: "Sostieni CONFAD APS" },
];

const objectives = [
  {
    n: "01",
    title: "Legge Nazionale Caregiver",
    desc: "Ottenere il pieno riconoscimento giuridico, previdenziale e sanitario della figura del Caregiver Familiare con una legge nazionale specifica e vincolante.",
  },
  {
    n: "02",
    title: "Attuazione dell'Art. 3 Cost.",
    desc: "Perseguire la piena uguaglianza sostanziale e pari dignità sociale per le persone con disabilità e per chi se ne prende cura ogni giorno nelle mura di casa.",
  },
  {
    n: "03",
    title: "Stop all'Invisibilità",
    desc: "Dare voce, supporto e cornice di giustizia a chi, nel silenzio della propria vita, assiste quotidianamente congiunti non autosufficienti senza tutele.",
  },
  {
    n: "04",
    title: "Tutele Economiche Reali",
    desc: "Battagliare perché le indennità di accompagnamento non siano considerate reddito nell'ISEE, e affinché i fondi caregiver siano distribuiti equamente.",
  },
];

function StatCard({ stat, inView }: { stat: typeof stats[0]; inView: boolean }) {
  const count = useCountUp(stat.value, 2000, inView);
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 900, color: "var(--accent)", lineHeight: 1 }}>
        {stat.value > 999 ? count.toLocaleString("it-IT") : count}{stat.suffix}
      </div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginTop: 10, marginBottom: 4 }}>{stat.label}</div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{stat.desc}</div>
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [customAboutImage, setCustomAboutImage] = useState("/storia.png");

  useEffect(() => {
    const savedMedia = localStorage.getItem("confad_media_associations");
    if (savedMedia) {
      try {
        const parsed = JSON.parse(savedMedia);
        const aboutAssoc = parsed.find((a: any) => a.fieldLabel.includes("Chi Siamo"));
        if (aboutAssoc && aboutAssoc.previewUrl) {
          setCustomAboutImage(aboutAssoc.previewUrl);
        }
      } catch (e) {}
    }

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px) rotate(2deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(0deg);
          }
        }
        .animate-about-group {
          animation: slideInRight 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .about-photo-back {
          position: absolute;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(23,43,77,0.15) 0%, rgba(23,43,77,0.05) 100%);
          border: 1px solid rgba(15,35,71,0.08);
          backdrop-filter: blur(4px);
          transition: transform 0.4s ease;
          z-index: 1;
        }
        .about-photo-group:hover .about-back-1 {
          transform: translate(-15px, 15px) rotate(-6deg) scale(1.02);
        }
        .about-photo-group:hover .about-back-2 {
          transform: translate(20px, -15px) rotate(8deg) scale(1.02);
        }
        .about-photo-group:hover .about-back-3 {
          transform: translate(15px, 20px) rotate(4deg) scale(1.01);
        }
        .about-photo-group:hover .about-main {
          transform: scale(1.03) translateY(-4px);
          box-shadow: 0 30px 70px rgba(15,35,71,0.22);
        }
      `}</style>

      {/* Chi Siamo */}
      <section id="chi-siamo" className="section" style={{ background: "#fff", overflow: "hidden" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 80, alignItems: "center" }}>
            {/* Left */}
            <div>
              <span className="section-label">Chi Siamo</span>
              <h2 className="section-title">
                Un movimento di famiglie che non si arrendono
              </h2>
              <p style={{ color: "var(--text-light)", lineHeight: 1.85, marginBottom: 20 }}>
                <strong style={{ color: "var(--primary-dark)" }}>CONFAD APS</strong> — Coordinamento Nazionale Famiglie con Disabilità — è nata come movimento spontaneo di famiglie che si prendono cura di un congiunto con disabilità grave o non autosufficienza. Da quella rabbia e da quell&apos;amore, si è strutturata in Associazione di Promozione Sociale e Ente del Terzo Settore.
              </p>
              <p style={{ color: "var(--text-light)", lineHeight: 1.85, marginBottom: 20 }}>
                La nostra missione è chiara: <strong>non chiediamo carità, chiediamo diritti.</strong> Lavorare per ottenere il riconoscimento pieno del Caregiver Familiare in Italia, perché assistere un figlio, un genitore o un coniuge non autosufficiente è un atto di amore che merita tutela legale, previdenziale e sanitaria.
              </p>
              <p style={{ color: "var(--text-light)", lineHeight: 1.85, marginBottom: 40 }}>
                La nostra campagna virale <span style={{ fontWeight: 700, color: "var(--primary)" }}>#unaleggesubito</span> ha portato la voce di migliaia di famiglie fino al Parlamento.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <a href="#servizi" className="btn btn-dark">Scopri cosa facciamo</a>
                <a href="#contatti" className="btn" style={{ background: "var(--gray-100)", color: "var(--primary-dark)" }}>Iscriviti gratis</a>
              </div>
            </div>

            {/* Right: Visual card layered */}
            <div className="animate-about-group about-photo-group" style={{ position: "relative", padding: "30px 40px" }}>
              
              {/* Back photo 1 */}
              <div className="about-photo-back about-back-1" style={{ 
                left: 10, bottom: 10, width: "85%", height: "85%",
                transform: "translate(-8px, 8px) rotate(-4deg)"
              }} />

              {/* Back photo 2 */}
              <div className="about-photo-back about-back-2" style={{ 
                right: 10, top: 10, width: "85%", height: "85%",
                transform: "translate(10px, -8px) rotate(5deg)"
              }} />

              {/* Back photo 3 */}
              <div className="about-photo-back about-back-3" style={{ 
                right: 20, bottom: 0, width: "80%", height: "80%",
                transform: "translate(8px, 10px) rotate(2deg)"
              }} />

              {/* Main content frame (storia.png) */}
              <div 
                className="about-main"
                style={{ 
                  width: "100%", 
                  borderRadius: 24, 
                  padding: "44px 40px", 
                  color: "#fff", 
                  position: "relative", 
                  overflow: "hidden",
                  minHeight: 380,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  background: `url("${encodeURI(customAboutImage)}") no-repeat center center / cover`,
                  zIndex: 5,
                  transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
                  border: "2px solid #fff"
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "rgba(15, 35, 71, 0.75)", pointerEvents: "none" }} />
                
                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>La Nostra Identità</div>
                  <div style={{ fontSize: 42, fontWeight: 900, color: "var(--accent)", marginBottom: 4, letterSpacing: "-0.02em" }}>CONFAD</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.75)", marginBottom: 32, lineHeight: 1.5 }}>Coordinamento Nazionale<br />Famiglie con Disabilità APS / ETS</div>

                  {/* Payoff */}
                  <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 12, padding: "16px 20px", marginBottom: 24, borderLeft: "3px solid var(--accent)" }}>
                    <div style={{ fontSize: 13, fontStyle: "italic", color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
                      &ldquo;Per la promozione e la tutela dei diritti delle famiglie con disabilità.&rdquo;
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 28 }}>
                    <div>
                      <div style={{ fontSize: 28, fontWeight: 900, color: "var(--accent)" }}>120k+</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>Famiglie</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 28, fontWeight: 900, color: "var(--accent)" }}>APS/ETS</div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>Terzo Settore</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div style={{ position: "absolute", bottom: 8, left: 14, background: "#fff", borderRadius: 16, padding: "18px 22px", boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: 14, border: "1px solid var(--border)", zIndex: 10 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-light) 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>⚖️</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: "var(--primary-dark)" }}>#unaleggesubito</div>
                  <div style={{ fontSize: 12, color: "var(--text-light)" }}>Campagna per i Caregiver</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={sectionRef} style={{ background: "var(--primary-dark)", padding: "80px 0" }}>
        <div className="container">
          <div className="grid-4">
            {stats.map((s, i) => <StatCard key={i} stat={s} inView={inView} />)}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section id="obiettivi" className="section" style={{ background: "var(--off-white)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span className="section-label" style={{ justifyContent: "center" }}>I Nostri Obiettivi</span>
            <h2 className="section-title" style={{ textAlign: "center" }}>Battaglie concrete, risultati reali</h2>
            <p className="section-subtitle" style={{ margin: "0 auto" }}>
              Non ci fermiamo ai convegni. Ogni obiettivo si traduce in un&apos;azione concreta, un ricorso, una proposta di legge o una campagna nazionale.
            </p>
          </div>

          <div className="grid-2">
            {objectives.map((o, i) => (
              <div
                key={i}
                style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: "38px 34px", display: "flex", gap: 22, transition: "all var(--transition)", cursor: "default" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "var(--shadow-lg)"; e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ""; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: "1.9rem", fontWeight: 900, color: "var(--accent)", lineHeight: 1, flexShrink: 0, marginTop: 3 }}>{o.n}</div>
                <div>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--primary-dark)", marginBottom: 10 }}>{o.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--text-light)", lineHeight: 1.75 }}>{o.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div style={{ marginTop: 48, background: "linear-gradient(135deg, var(--primary-dark), var(--primary))", borderRadius: "var(--radius-lg)", padding: "36px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Unisciti a CONFAD APS — è gratuito</div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }}>Insieme siamo più forti. L&apos;iscrizione è libera e gratuita: aggiungi la tua voce alla nostra.</div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#contatti" className="btn btn-primary" style={{ background: "var(--accent)", color: "var(--primary-dark)", fontWeight: 700 }}>Iscriviti Gratis</a>
              <a href="#contatti" className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}>Dona il 5×1000</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
