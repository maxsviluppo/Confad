"use client";
import { useState, useEffect } from "react";

interface StatItem {
  date: string;
  views: number;
  uniques: number;
  contacts: number;
}

const demoStats: StatItem[] = [
  { date: "26 Giu", views: 240, uniques: 180, contacts: 2 },
  { date: "27 Giu", views: 310, uniques: 210, contacts: 4 },
  { date: "28 Giu", views: 420, uniques: 320, contacts: 5 },
  { date: "29 Giu", views: 380, uniques: 290, contacts: 1 },
  { date: "30 Giu", views: 510, uniques: 410, contacts: 6 },
  { date: "01 Lug", views: 640, uniques: 520, contacts: 8 },
  { date: "02 Lug", views: 680, uniques: 550, contacts: 9 },
];

const referrers = [
  { source: "Google Search (organic)", count: 4820, percent: 52 },
  { source: "Facebook (#unaleggesubito)", count: 2140, percent: 23 },
  { source: "Direct Traffic", count: 1210, percent: 13 },
  { source: "WhatsApp / Telegram", count: 830, percent: 9 },
  { source: "Disabili.com (Referral)", count: 280, percent: 3 },
];

const topPages = [
  { path: "/", title: "Homepage (Diamo voce a chi si prende cura)", views: 8420, avgTime: "2m 14s" },
  { path: "/#chi-siamo", title: "Chi Siamo - CONFAD APS", views: 3120, avgTime: "1m 45s" },
  { path: "/#servizi", title: "Cosa Facciamo - Advocacy e Supporto", views: 2240, avgTime: "1m 12s" },
  { path: "/#notizie", title: "Notizie & Campagne", views: 1840, avgTime: "3m 05s" },
];

const devices = [
  { type: "📱 Mobile", value: 68, color: "#1a3a6e" },
  { type: "💻 Desktop", value: 28, color: "#e8b84b" },
  { type: "📟 Tablet", value: 4, color: "#2d5aa8" },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("30d");

  // Calcolo KPI riassuntivi
  const totalViews = demoStats.reduce((acc, curr) => acc + curr.views, 0);
  const totalUniques = demoStats.reduce((acc, curr) => acc + curr.uniques, 0);
  const totalContacts = demoStats.reduce((acc, curr) => acc + curr.contacts, 0);

  return (
    <>
      <div className="admin-topbar">
        <div>
          <div className="topbar-title">Traffico & Analitica</div>
          <div style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>Monitoraggio accessi e sorgenti di traffico</div>
        </div>
        <div className="topbar-actions">
          <select className="form-select" style={{ width: 140 }} value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="7d">Ultimi 7 Giorni</option>
            <option value="30d">Ultimi 30 Giorni</option>
            <option value="90d">Ultimi 90 Giorni</option>
          </select>
        </div>
      </div>

      <div className="admin-content">
        {/* KPI Row */}
        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Visualizzazioni Totali</div>
            <div className="kpi-value">{totalViews.toLocaleString("it-IT")}</div>
            <div className="kpi-trend up">▲ +14.2% vs set. precedente</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Visitatori Unici</div>
            <div className="kpi-value">{totalUniques.toLocaleString("it-IT")}</div>
            <div className="kpi-trend up">▲ +11.8% vs set. precedente</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Contatti Generati</div>
            <div className="kpi-value">{totalContacts}</div>
            <div className="kpi-trend up">▲ +35.0% vs set. precedente</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Frequenza di Rimbalzo</div>
            <div className="kpi-value">34.8%</div>
            <div className="kpi-trend up" style={{ color: "var(--green)" }}>▼ -2.4% (Migliorato)</div>
          </div>
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1.2fr", gap: 20, marginBottom: 24 }}>
          {/* Main Chart */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Andamento Giornaliero (Visualizzazioni e Visitatori)</div>
            </div>
            <div className="card-body">
              {/* Grafico SVG Custom */}
              <div style={{ position: "relative", height: 200, display: "flex", alignItems: "flex-end", gap: 24, padding: "20px 10px 0" }}>
                {demoStats.map((item, idx) => {
                  const maxVal = Math.max(...demoStats.map(s => s.views));
                  const heightViews = (item.views / maxVal) * 100;
                  const heightUniques = (item.uniques / maxVal) * 100;

                  return (
                    <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                      <div style={{ display: "flex", gap: 4, width: "100%", height: "80%", alignItems: "flex-end", justifyContent: "center" }}>
                        {/* Views bar */}
                        <div style={{ width: 14, height: `${heightViews}%`, background: "var(--primary)", borderRadius: "3px 3px 0 0", transition: "height 0.5s ease" }} title={`Visualizzazioni: ${item.views}`} />
                        {/* Uniques bar */}
                        <div style={{ width: 14, height: `${heightUniques}%`, background: "var(--accent)", borderRadius: "3px 3px 0 0", transition: "height 0.5s ease" }} title={`Unici: ${item.uniques}`} />
                      </div>
                      <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 8, whiteSpace: "nowrap" }}>{item.date}</div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 24, justifyContent: "center", marginTop: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 12, height: 12, background: "var(--primary)", borderRadius: 3 }} />
                  <span style={{ fontSize: 12, color: "var(--text-2)", fontWeight: 600 }}>Visualizzazioni</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 12, height: 12, background: "var(--accent)", borderRadius: 3 }} />
                  <span style={{ fontSize: 12, color: "var(--text-2)", fontWeight: 600 }}>Visitatori Unici</span>
                </div>
              </div>
            </div>
          </div>

          {/* Devices breakdown */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Dispositivi</div>
            </div>
            <div className="card-body">
              {devices.map((d, i) => (
                <div key={i} style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>{d.type}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "var(--text)" }}>{d.value}%</span>
                  </div>
                  <div style={{ background: "var(--bg)", borderRadius: 100, height: 8, overflow: "hidden" }}>
                    <div style={{ width: `${d.value}%`, height: "100%", background: d.color, borderRadius: 100 }} />
                  </div>
                </div>
              ))}
              <div style={{ background: "var(--surface-2)", borderRadius: 8, padding: 14, border: "1px solid var(--border)", marginTop: 14, fontSize: 12.5, color: "var(--text-2)" }}>
                💡 <strong>Suggerimento Mobile:</strong> Il 68% del tuo pubblico naviga da cellulare. Assicurati che i form di contatto siano facili da compilare da smartphone.
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Sorgenti di Traffico */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Top Referral e Sorgenti</div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Sorgente</th>
                  <th style={{ textAlign: "right" }}>Sessioni</th>
                  <th style={{ textAlign: "right" }}>Quota</th>
                </tr>
              </thead>
              <tbody>
                {referrers.map((r, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: 600 }}>{r.source}</td>
                    <td style={{ textAlign: "right" }}>{r.count.toLocaleString("it-IT")}</td>
                    <td style={{ textAlign: "right" }}>
                      <span className="badge badge-gold" style={{ background: "rgba(232,184,75,0.15)", color: "#92650a" }}>{r.percent}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagine Più Visitate */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Pagine Più Visitate</div>
            </div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Pagina</th>
                  <th style={{ textAlign: "right" }}>Visualizzazioni</th>
                  <th style={{ textAlign: "right" }}>Tempo Medio</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((p, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ fontWeight: 600, color: "var(--primary)" }}>{p.path}</div>
                      <div style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2 }}>{p.title}</div>
                    </td>
                    <td style={{ textAlign: "right", fontWeight: 700 }}>{p.views.toLocaleString("it-IT")}</td>
                    <td style={{ textAlign: "right", color: "var(--text-2)" }}>{p.avgTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
