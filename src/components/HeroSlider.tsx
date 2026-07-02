"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    badge: "#unaleggesubito",
    title: "Diamo voce\na chi si prende cura",
    subtitle:
      "CONFAD APS lotta ogni giorno per il pieno riconoscimento giuridico, economico e sociale del Caregiver Familiare in Italia. Perché assistere un familiare non è un privilegio — è un diritto.",
    cta: "Unisciti a Noi",
    ctaHref: "#contatti",
    secondary: "Scopri la nostra storia",
    secondaryHref: "#chi-siamo",
    gradient: "linear-gradient(135deg, #0f2347 0%, #1a3a6e 55%, #1e4d8c 100%)",
    backgroundImage: "/slide 1.png",
    accent: "#e8b84b",
    stat: { value: "120.000+", label: "Famiglie rappresentate" },
    tag: "Advocacy · Diritti · Inclusione",
  },
  {
    id: 2,
    badge: "Caregiver Familiare",
    title: "Non sei solo:\nnoi siamo qui",
    subtitle:
      "Gruppi di mutuo aiuto, supporto psicologico professionale e una comunità di migliaia di famiglie pronte ad accoglierti. Perché nessuno dovrebbe affrontare la disabilità da solo.",
    cta: "Chiedi Supporto",
    ctaHref: "#servizi",
    secondary: "Leggi le nostre storie",
    secondaryHref: "#notizie",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
    backgroundImage: "/slide 2.png",
    accent: "#f2cc76",
    stat: { value: "30+", label: "Gruppi di mutuo aiuto attivi" },
    tag: "Supporto · Psicologia · Comunità",
  },
  {
    id: 3,
    badge: "Art. 3 Costituzione",
    title: "Uguaglianza\nnon è una parola",
    subtitle:
      "Portiamo avanti ricorsi collettivi, battaglie legislative e campagne virali per l'attuazione reale dei diritti delle persone con disabilità grave e delle loro famiglie.",
    cta: "Partecipa alla Lotta",
    ctaHref: "#obiettivi",
    secondary: "Dona il 5×1000",
    secondaryHref: "#contatti",
    gradient: "linear-gradient(135deg, #0a1628 0%, #162845 60%, #0f2347 100%)",
    backgroundImage: "/slide 3.png",
    accent: "#e8b84b",
    stat: { value: "€28M", label: "Fondi Caregiver monitorati" },
    tag: "Leggi · Ricorsi · Campagne",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [customBackgrounds, setCustomBackgrounds] = useState<Record<number, string>>({});

  useEffect(() => {
    const savedMedia = localStorage.getItem("confad_media_associations");
    if (savedMedia) {
      try {
        const parsed = JSON.parse(savedMedia);
        const bgMap: Record<number, string> = {};
        parsed.forEach((a: any) => {
          if (a.previewUrl) {
            if (a.fieldLabel.includes("Slide 1")) bgMap[0] = a.previewUrl;
            if (a.fieldLabel.includes("Slide 2")) bgMap[1] = a.previewUrl;
            if (a.fieldLabel.includes("Slide 3")) bgMap[2] = a.previewUrl;
          }
        });
        setCustomBackgrounds(bgMap);
      } catch (e) {}
    }
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => { setCurrent(idx); setAnimating(false); }, 400);
    },
    [animating]
  );

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = slides[current];
  const backgroundImage = customBackgrounds[current];
  const activeBg = (backgroundImage && backgroundImage.trim() !== "") ? backgroundImage : slide.backgroundImage;
  const encodedBg = activeBg ? encodeURI(activeBg) : null;

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: encodedBg ? `url("${encodedBg}") no-repeat center center / cover` : slide.gradient,
        transition: "background 0.7s ease",
        overflow: "hidden",
      }}
    >
      {/* Background radial overlay to ensure readability if image is uploaded or fallback image is active */}
      <div style={{ position: "absolute", inset: 0, background: encodedBg ? "rgba(15, 35, 71, 0.7)" : "transparent", pointerEvents: "none" }} />
      
      {/* Background radial lights */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(ellipse at 75% 25%, rgba(232,184,75,0.1) 0%, transparent 55%), radial-gradient(ellipse at 25% 75%, rgba(45,90,168,0.18) 0%, transparent 50%)`, pointerEvents: "none" }} />

      {/* Subtle grid */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`, backgroundSize: "64px 64px", pointerEvents: "none" }} />

      {/* Decorative circles */}
      <div style={{ position: "absolute", right: "-12%", top: "8%", width: 640, height: 640, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: "-6%", top: "14%", width: 440, height: 440, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.035)", pointerEvents: "none" }} />

      {/* Hashtag watermark */}
      <div style={{ position: "absolute", right: 40, top: "50%", transform: "translateY(-50%) rotate(90deg)", fontSize: "5rem", fontWeight: 900, color: "rgba(232,184,75,0.06)", letterSpacing: "-0.03em", pointerEvents: "none", whiteSpace: "nowrap" }}>
        #unaleggesubito
      </div>

      {/* Content */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: 110, paddingBottom: 90 }}>
        <div style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(22px)" : "translateY(0)", transition: "opacity 0.4s ease, transform 0.4s ease", maxWidth: 780 }}>

          {/* Badge pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(232,184,75,0.18)", border: "1px solid rgba(232,184,75,0.35)", borderRadius: 100, padding: "7px 18px", marginBottom: 36 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: slide.accent, display: "block", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: slide.accent }}>
              {slide.badge}
            </span>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "clamp(3rem, 6.5vw, 5.5rem)", fontWeight: 900, color: "#fff", lineHeight: 1.06, marginBottom: 28, whiteSpace: "pre-line", letterSpacing: "-0.025em" }}>
            {slide.title}
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", color: "rgba(255,255,255,0.72)", lineHeight: 1.75, marginBottom: 44, maxWidth: 580 }}>
            {slide.subtitle}
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 60 }}>
            <Link href={slide.ctaHref} className="btn btn-primary" style={{ background: "var(--accent)", color: "var(--primary-dark)", fontWeight: 700 }}>
              {slide.cta}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link href={slide.secondaryHref} className="btn btn-outline">
              {slide.secondary}
            </Link>
          </div>

          {/* Stat card */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 20, background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 14, padding: "18px 28px" }}>
            <div>
              <div style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 900, color: slide.accent, lineHeight: 1 }}>{slide.stat.value}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginTop: 5 }}>{slide.stat.label}</div>
            </div>
            <div style={{ width: 1, height: 40, background: "rgba(255,255,255,0.15)" }} />
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", maxWidth: 160, lineHeight: 1.5 }}>{slide.tag}</div>
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{ position: "absolute", bottom: 52, left: 24, display: "flex", gap: 8, alignItems: "center" }}>
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? 34 : 8, height: 8, borderRadius: 100, background: i === current ? slide.accent : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>

        {/* Arrows */}
        <div style={{ position: "absolute", bottom: 44, right: 24, display: "flex", gap: 8 }}>
          {[{ dir: "prev", icon: "M15 19l-7-7 7-7" }, { dir: "next", icon: "M9 5l7 7-7 7" }].map(({ dir, icon }) => (
            <button key={dir} onClick={() => goTo(dir === "prev" ? (current - 1 + slides.length) % slides.length : (current + 1) % slides.length)}
              style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "all 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
              aria-label={dir === "prev" ? "Precedente" : "Successivo"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points={icon} /></svg>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 130, background: "linear-gradient(transparent, #f8f9fb)", pointerEvents: "none" }} />

      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } }`}</style>
    </section>
  );
}
