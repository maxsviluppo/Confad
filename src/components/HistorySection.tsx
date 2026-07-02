"use client";
import { useState, useEffect } from "react";

export default function HistorySection() {
  const [customHistoryImage, setCustomHistoryImage] = useState("/origini.png");

  useEffect(() => {
    const savedMedia = localStorage.getItem("confad_media_associations");
    if (savedMedia) {
      try {
        const parsed = JSON.parse(savedMedia);
        const historyAssoc = parsed.find((a: any) => a.fieldLabel.includes("Chi Siamo") || a.fieldLabel.includes("presentazione"));
        if (historyAssoc && historyAssoc.previewUrl) {
          setCustomHistoryImage(historyAssoc.previewUrl);
        }
      } catch (e) {}
    }
  }, []);

  return (
    <section id="storia" className="section" style={{ background: "#fff", paddingTop: 110, paddingBottom: 110, overflow: "hidden" }}>
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px) rotate(-2deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(0deg);
          }
        }
        .animate-history-group {
          animation: slideInLeft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .layered-photo-back {
          position: absolute;
          border-radius: 20px;
          background: linear-gradient(135deg, rgba(23,43,77,0.15) 0%, rgba(23,43,77,0.05) 100%);
          border: 1px solid rgba(15,35,71,0.08);
          backdrop-filter: blur(4px);
          transition: transform 0.4s ease;
          z-index: 1;
        }
        .layered-photo-group:hover .photo-back-1 {
          transform: translate(-15px, 15px) rotate(-6deg) scale(1.02);
        }
        .layered-photo-group:hover .photo-back-2 {
          transform: translate(20px, -15px) rotate(8deg) scale(1.02);
        }
        .layered-photo-group:hover .photo-back-3 {
          transform: translate(15px, 20px) rotate(4deg) scale(1.01);
        }
        .layered-photo-group:hover .photo-main {
          transform: scale(1.03) translateY(-4px);
          box-shadow: 0 30px 70px rgba(15,35,71,0.22);
        }
      `}</style>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 80, alignItems: "center" }}>
          
          {/* Gruppo Foto a strati con animazione da sinistra */}
          <div className="animate-history-group layered-photo-group" style={{ position: "relative", padding: "30px 40px" }}>
            
            {/* Foto di sfondo 1 (in basso a sinistra) */}
            <div className="layered-photo-back photo-back-1" style={{ 
              left: 10, bottom: 10, width: "85%", height: "85%",
              transform: "translate(-8px, 8px) rotate(-4deg)"
            }} />

            {/* Foto di sfondo 2 (in alto a destra) */}
            <div className="layered-photo-back photo-back-2" style={{ 
              right: 10, top: 10, width: "85%", height: "85%",
              transform: "translate(10px, -8px) rotate(5deg)"
            }} />

            {/* Foto di sfondo 3 (in basso a destra, più sfalsata) */}
            <div className="layered-photo-back photo-back-3" style={{ 
              right: 20, bottom: 0, width: "80%", height: "80%",
              transform: "translate(8px, 10px) rotate(2deg)"
            }} />

            {/* Foto principale a tema (origini.png) */}
            <div 
              className="photo-main"
              style={{ 
                width: "100%", 
                aspectRatio: "4/3", 
                borderRadius: 24, 
                overflow: "hidden", 
                boxShadow: "0 20px 50px rgba(15,35,71,0.14)",
                background: `url("${encodeURI(customHistoryImage)}") no-repeat center center / cover`,
                position: "relative",
                minHeight: 360,
                zIndex: 5,
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease",
                border: "2px solid #fff"
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,35,71,0.4) 0%, transparent 50%)" }} />
            </div>
            
            {/* Etichetta ad ancoretta */}
            <div style={{ 
              position: "absolute", 
              bottom: 8, 
              left: 14, 
              background: "var(--accent)", 
              color: "var(--primary-dark)", 
              padding: "12px 24px", 
              borderRadius: 14, 
              fontWeight: 800, 
              fontSize: 13, 
              boxShadow: "0 10px 24px rgba(232,184,75,0.3)",
              zIndex: 10
            }}>
              Dal 1988 al servizio dei caregiver
            </div>
          </div>

          {/* Testo a destra */}
          <div>
            <span className="section-label">La Nostra Origine</span>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)", lineHeight: 1.15 }}>L’incontro, la condivisione e la nascita del coordinamento</h2>
            
            <p style={{ color: "var(--text-light)", lineHeight: 1.85, marginBottom: 20, fontSize: 14.5 }}>
              Il Coordinamento Nazionale Famiglie con Disabilità (CONFAD) nasce, come spesso accade a tutti i movimenti, da una vicenda familiare. Nel 1988, infatti, nasce Letizia, quarta figlia di una famiglia romana, una bambina cerebrolesa e con Sindrome di Angelman. La prognosi è devastante: nessuna possibilità di recupero mentale e funzionale.
            </p>
            <p style={{ color: "var(--text-light)", lineHeight: 1.85, marginBottom: 24, fontSize: 14.5 }}>
              Ed è dalla presa di coscienza del mancato ascolto da parte delle istituzioni dei familiari coinvolti nella disabilità grave di un proprio congiunto che CONFAD muove i suoi primi passi, anche se all’epoca non si chiamava così e non era strutturato in forma di associazione. L’incontro spontaneo tra genitori e la condivisione delle medesime sfide quotidiane hanno dato vita ad una voce unita contro l&apos;isolamento sociale.
            </p>
            
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <a href="#chi-siamo" className="btn btn-dark">Leggi la Missione</a>
              <a href="#contatti" className="btn btn-outline" style={{ borderColor: "var(--primary)", color: "var(--primary)" }}>Contattaci</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
