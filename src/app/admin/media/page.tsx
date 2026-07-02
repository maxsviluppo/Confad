"use client";
import { useState, useRef, useEffect } from "react";

interface MediaAssociation {
  sectionId: string;
  sectionLabel: string;
  fieldLabel: string;
  currentImageName: string;
  dimensions: string;
  previewUrl: string;
}

const initialAssociations: MediaAssociation[] = [
  { sectionId: "general", sectionLabel: "⚙️ Logo & Icone Globali", fieldLabel: "Logo Principale (Navbar & Footer)", currentImageName: "Logo-ULTIMO_completo_trasparente-1-e1690538152112-222x300.png", dimensions: "222 × 300 px", previewUrl: "/Logo-ULTIMO_completo_trasparente-1-e1690538152112-222x300.png" },
  { sectionId: "general", sectionLabel: "⚙️ Logo & Icone Globali", fieldLabel: "Favicon Sito (.ico / .png)", currentImageName: "favicon.ico", dimensions: "32 × 32 px", previewUrl: "" },
  { sectionId: "hero", sectionLabel: "🎯 Hero Section (Slider)", fieldLabel: "Immagine Slide 1 (Voci e Caregiver)", currentImageName: "hero-slide-caregiver-1.jpg", dimensions: "1920 × 1080 px", previewUrl: "" },
  { sectionId: "hero", sectionLabel: "🎯 Hero Section (Slider)", fieldLabel: "Immagine Slide 2 (Mutuo Aiuto)", currentImageName: "hero-slide-mutuo-aiuto.jpg", dimensions: "1920 × 1080 px", previewUrl: "" },
  { sectionId: "hero", sectionLabel: "🎯 Hero Section (Slider)", fieldLabel: "Immagine Slide 3 (Uguaglianza Costituzionale)", currentImageName: "hero-slide-diritti.jpg", dimensions: "1920 × 1080 px", previewUrl: "" },
  { sectionId: "chisiamo", sectionLabel: "🏛️ Sezione Chi Siamo", fieldLabel: "Immagine Laterale Presentazione", currentImageName: "chi-siamo-volontari.jpg", dimensions: "800 × 600 px", previewUrl: "" },
  { sectionId: "notizie", sectionLabel: "📰 Sezione Notizie", fieldLabel: "Immagine Copertina Articolo in Evidenza", currentImageName: "ddl-caregiver-senato.jpg", dimensions: "1200 × 800 px", previewUrl: "" },
];

export default function MediaPage() {
  const [associations, setAssociations] = useState<MediaAssociation[]>(initialAssociations);
  const [activeTab, setActiveTab] = useState("all");
  const [saved, setSaved] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Caricamento associazioni salvate
  useEffect(() => {
    const savedData = localStorage.getItem("confad_media_associations");
    if (savedData) {
      setAssociations(JSON.parse(savedData));
    }
  }, []);

  const saveAll = (updated: MediaAssociation[]) => {
    localStorage.setItem("confad_media_associations", JSON.stringify(updated));
    setAssociations(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleUploadClick = (index: number) => {
    setEditingIndex(index);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingIndex === null || !e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const objectUrl = URL.createObjectURL(file);

    const updated = associations.map((item, idx) => {
      if (idx === editingIndex) {
        return {
          ...item,
          currentImageName: file.name,
          previewUrl: objectUrl,
        };
      }
      return item;
    });

    saveAll(updated);
    setEditingIndex(null);
  };

  const resetToDefault = (index: number) => {
    const updated = associations.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          currentImageName: "Predefinita del sistema",
          previewUrl: "",
        };
      }
      return item;
    });
    saveAll(updated);
  };

  const tabs = [
    { id: "all", label: "Tutte le Sezioni" },
    { id: "general", label: "⚙️ Logo & Favicon" },
    { id: "hero", label: "🎯 Slider Hero" },
    { id: "chisiamo", label: "🏛️ Chi Siamo" },
    { id: "notizie", label: "📰 Notizie" },
  ];

  const filtered = activeTab === "all" 
    ? associations 
    : associations.filter((a) => a.sectionId === activeTab);

  return (
    <>
      <div className="admin-topbar">
        <div>
          <div className="topbar-title">Gestione Media & Associazione Immagini</div>
          <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>
            Associa immagini, loghi e la favicon direttamente ai blocchi di contenuto delle pagine
          </div>
        </div>
        <div className="topbar-actions">
          {saved && <span className="badge badge-green">✓ Salvato!</span>}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*, .ico"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="admin-content">
        {/* Navigation Tabs */}
        <div className="tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`tab-item ${activeTab === t.id ? "active" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Associations Grid list in Frallicciardi Style (visual-blocks with direct edit actions) */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {filtered.map((item, idx) => {
            const globalIndex = associations.findIndex((a) => a.fieldLabel === item.fieldLabel);
            return (
              <div 
                key={idx} 
                className="card" 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  padding: 24, 
                  gap: 24,
                  flexWrap: "wrap",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }}
              >
                {/* Preview Thumbnail */}
                <div 
                  style={{ 
                    width: 110, 
                    height: 85, 
                    borderRadius: 8, 
                    background: "var(--surface-2)", 
                    border: "1px solid var(--border)", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    overflow: "hidden",
                    flexShrink: 0
                  }}
                >
                  {item.previewUrl ? (
                    <img 
                      src={item.previewUrl} 
                      alt="Preview" 
                      style={{ width: "100%", height: "100%", objectFit: "contain" }} 
                    />
                  ) : (
                    <div style={{ fontSize: 24, color: "var(--text-3)" }}>🖼️</div>
                  )}
                </div>

                {/* Meta details */}
                <div style={{ flex: 1, minWidth: 260 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "var(--primary-light)", letterSpacing: "0.06em", marginBottom: 4 }}>
                    {item.sectionLabel}
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>
                    {item.fieldLabel}
                  </h3>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "var(--text-3)", fontFamily: "monospace" }}>
                      File: {item.currentImageName}
                    </span>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--border)" }} />
                    <span style={{ fontSize: 12, color: "var(--text-3)" }}>
                      Dim. Consigliate: <strong>{item.dimensions}</strong>
                    </span>
                  </div>
                </div>

                {/* Direct Actions */}
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <button 
                    onClick={() => handleUploadClick(globalIndex)} 
                    className="btn btn-primary btn-sm"
                  >
                    📂 Sostituisci Immagine
                  </button>
                  {item.previewUrl && (
                    <button 
                      onClick={() => resetToDefault(globalIndex)} 
                      className="btn btn-danger btn-sm btn-ghost"
                      style={{ border: "1px solid var(--red)", color: "var(--red)" }}
                    >
                      Ripristina Default
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Explanatory Info Card */}
        <div 
          className="card" 
          style={{ 
            marginTop: 24, 
            background: "linear-gradient(135deg, var(--primary-dark), #1a3a6e)", 
            color: "#fff",
            borderRadius: "var(--r-lg)",
            padding: 24
          }}
        >
          <h4 style={{ fontWeight: 800, fontSize: 15, color: "var(--accent)", marginBottom: 8 }}>
            💡 Come funziona la gestione dei media & Favicon
          </h4>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,0.85)" }}>
            A differenza di una libreria media generica e disordinata, questa interfaccia è mappata in base ai blocchi di contenuto reali del sito. 
            Puoi modificare il file logo e la favicon in formato <code>.ico</code> o <code>.png</code> da questa schermata. 
            Il sistema carica automaticamente le modifiche per ciascuna sezione del frontend.
          </p>
        </div>
      </div>
    </>
  );
}
