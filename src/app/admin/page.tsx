"use client";
import { useState, useEffect } from "react";

const kpiData = [
  { label: "Iscritti Oggi", value: "+18", trend: "+15.2%", up: true, icon: "👥" },
  { label: "Visite Mensili", value: "14.820", trend: "+24.5%", up: true, icon: "📈" },
  { label: "Firme Petizione", value: "502.148", trend: "#unaleggesubito", up: true, icon: "✍️" },
  { label: "Donatori 5×1000", value: "1.420", trend: "+8.3%", up: true, icon: "🎗️" },
];

const recentActivity = [
  { type: "edit", text: "Dati associazione aggiornati (CF: 96541250582)", time: "5 min fa", color: "#3b82f6" },
  { type: "media", text: "Nuovo volantino caricato: 5x1000-confad.pdf", time: "42 min fa", color: "#22c55e" },
  { type: "seo", text: "Meta description modificata per 'Caregiver'", time: "2 ore fa", color: "#e8b84b" },
  { type: "content", text: "Notizia 'Audizione DDL Caregiver' pubblicata", time: "ieri", color: "#8b5cf6" },
];

const quickLinks = [
  { label: "Gestisci Slides", href: "/admin/contenuti", icon: "🎨", color: "#1a3a6e" },
  { label: "Carica Documenti", href: "/admin/media", icon: "📄", color: "#2d5aa8" },
  { label: "Ottimizza SEO", href: "/admin/seo", icon: "🤖", color: "#e8b84b" },
  { label: "Report Contatti", href: "/admin/analytics", icon: "📬", color: "#22c55e" },
];

const trafficData = [120, 150, 180, 220, 210, 240, 280, 310, 290, 340, 380, 420, 450, 480, 520, 580, 610, 640];

function MiniChart({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 300; const h = 60; const pad = 4;
  const pts = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 60 }}>
      <defs>
        <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1a3a6e" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1a3a6e" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke="#1a3a6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points={`${pad},${h} ${pts} ${w - pad},${h}`} fill="url(#chartGrad)" />
    </svg>
  );
}

const sources = [
  { label: "Ricerca Google", value: 52, color: "#1a3a6e" },
  { label: "Social (#unaleggesubito)", value: 34, color: "#e8b84b" },
  { label: "Diretto", value: 10, color: "#2d5aa8" },
  { label: "Referral (Siti Terzo Settore)", value: 4, color: "#22c55e" },
];

export default function AdminDashboard() {
  const [period, setPeriod] = useState("30d");

  return (
    <>
      <div className="admin-topbar">
        <div>
          <div className="topbar-title">Dashboard CONFAD APS</div>
          <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>
            Coordinamento Nazionale Famiglie con Disabilità
          </div>
        </div>
        <div className="topbar-actions">
          <div style={{ fontSize: 12, color: "var(--text-3)" }}>
            {new Date().toLocaleDateString("it-IT", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </div>

      <div className="admin-content">
        {/* KPI */}
        <div className="kpi-grid">
          {kpiData.map((k, i) => (
            <div key={i} className="kpi-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="kpi-label">{k.label}</div>
                  <div className="kpi-value">{k.value}</div>
                  <div className="kpi-trend up" style={{ color: "var(--primary)" }}>
                    {k.trend}
                  </div>
                </div>
                <div style={{ fontSize: 28 }}>{k.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 24 }}>
          {/* Sparkline */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Traffico Portale Famiglie</div>
              <div style={{ display: "flex", gap: 4 }}>
                {["7d", "30d", "90d"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPeriod(p)}
                    className={`btn btn-sm ${period === p ? "btn-primary" : "btn-ghost"}`}
                    style={{ padding: "4px 10px", fontSize: 12 }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div className="card-body" style={{ paddingTop: 16 }}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 28, fontWeight: 900, color: "var(--primary-dark)" }}>14.820</span>
                <span style={{ fontSize: 13, color: "var(--green)", marginLeft: 8, fontWeight: 600 }}>▲ +24.5% mensile</span>
              </div>
              <MiniChart data={trafficData} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <span style={{ fontSize: 11, color: "var(--text-3)" }}>18 gg fa</span>
                <span style={{ fontSize: 11, color: "var(--text-3)" }}>Oggi</span>
              </div>
            </div>
          </div>

          {/* Sources */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Canali di Acquisizione</div>
            </div>
            <div className="card-body">
              {sources.map((s, i) => (
                <div key={i} style={{ marginBottom: i < sources.length - 1 ? 16 : 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)" }}>{s.label}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--text)" }}>{s.value}%</span>
                  </div>
                  <div style={{ background: "var(--bg)", borderRadius: 100, height: 6, overflow: "hidden" }}>
                    <div style={{ width: `${s.value}%`, height: "100%", background: s.color, borderRadius: 100 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Quick Actions */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Azioni Rapide</div>
            </div>
            <div className="card-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {quickLinks.map((q, i) => (
                <a
                  key={i}
                  href={q.href}
                  style={{
                    display: "flex", flexDirection: "column", gap: 8,
                    padding: "16px", borderRadius: "var(--r)",
                    border: "1px solid var(--border)",
                    background: "var(--surface-2)",
                    transition: "all var(--t)",
                    textDecoration: "none",
                  }}
                >
                  <span style={{ fontSize: 22 }}>{q.icon}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--text)" }}>{q.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Registro Attività</div>
              <span className="badge badge-gray">Recenti</span>
            </div>
            <div>
              {recentActivity.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex", gap: 12, alignItems: "flex-start",
                    padding: "14px 24px",
                    borderBottom: i < recentActivity.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, marginTop: 5, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 500 }}>{a.text}</div>
                    <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
