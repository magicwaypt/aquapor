"use client";

import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";
import { useState } from "react";

/* ------------------------------ Dummy data ------------------------------ */
const trafficSeries = [
  { day: "Seg", sess: 920 }, { day: "Ter", sess: 870 }, { day: "Qua", sess: 830 },
  { day: "Qui", sess: 910 }, { day: "Sex", sess: 1060 }, { day: "Sáb", sess: 1180 },
  { day: "Dom", sess: 760 },
];

const topPages = [
  { url: "/servicos/analises-agua", views: 3280 },
  { url: "/empresa", views: 2140 },
  { url: "/contactos", views: 1984 },
  { url: "/blog/conservacao-agua", views: 1670 },
  { url: "/servicos/telemetria", views: 1512 },
  { url: "/politica-privacidade", views: 1440 },
  { url: "/faq", views: 1204 },
  { url: "/servicos/laboratorio", views: 1112 },
  { url: "/sustentabilidade", views: 1041 },
  { url: "/carreiras", views: 982 },
];

const keywordsClicks = [
  { kw: "análises de água", clicks: 800 },
  { kw: "infraestrutura hídrica", clicks: 705 },
  { kw: "água sustentável", clicks: 610 },
  { kw: "telemetria água", clicks: 410 },
  { kw: "qualidade da água", clicks: 391 },
  { kw: "tratamento de água", clicks: 350 },
  { kw: "laboratório água", clicks: 320 },
  { kw: "análise microbiológica", clicks: 290 },
  { kw: "fiscalização perdas água", clicks: 260 },
  { kw: "água potável", clicks: 245 },
];

const keywordsImpr = [
  { kw: "análises de água", impr: 15800 },
  { kw: "infraestrutura hídrica", impr: 12340 },
  { kw: "água sustentável", impr: 11560 },
  { kw: "telemetria água", impr: 8900 },
  { kw: "qualidade da água", impr: 8730 },
  { kw: "tratamento de água", impr: 8210 },
  { kw: "laboratório água", impr: 7980 },
  { kw: "análise microbiológica", impr: 7660 },
  { kw: "perdas de água", impr: 7430 },
  { kw: "água potável", impr: 7120 },
];

const siteSearches = [
  { q: "telemetria", when: "2025-09-17 10:32", device: "Desktop" },
  { q: "análises microbiológicas", when: "2025-09-17 09:58", device: "Mobile" },
  { q: "qualidade da água", when: "2025-09-16 18:12", device: "Mobile" },
  { q: "laboratório água", when: "2025-09-16 16:44", device: "Desktop" },
  { q: "PSA municipal", when: "2025-09-16 11:07", device: "Mobile" },
  { q: "relatório sustentabilidade", when: "2025-09-15 15:21", device: "Desktop" },
];

const formsSeries = [
  { day: "Seg", leads: 18 }, { day: "Ter", leads: 16 }, { day: "Qua", leads: 14 },
  { day: "Qui", leads: 22 }, { day: "Sex", leads: 28 }, { day: "Sáb", leads: 17 },
  { day: "Dom", leads: 11 },
];

const deviceSplit = [
  { name: "Mobile", value: 62 },
  { name: "Desktop", value: 38 },
];

const cities = [
  { city: "Lisboa", users: 1320 },
  { city: "Porto", users: 980 },
  { city: "Braga", users: 610 },
  { city: "Coimbra", users: 540 },
  { city: "Setúbal", users: 420 },
  { city: "Aveiro", users: 380 },
  { city: "Faro", users: 290 },
  { city: "Viseu", users: 240 },
  { city: "Leiria", users: 210 },
  { city: "Viana do Castelo", users: 190 },
];

const sources = [
  { src: "Organic", val: 46 },
  { src: "Direto", val: 22 },
  { src: "Referência", val: 14 },
  { src: "Social", val: 10 },
  { src: "E-mail", val: 8 },
];

const BRAND = { main: "#50b0a8", dark: "#102d47" };

/* ---------------------------------------------------------------------- */

export default function AnalyticsPage() {
  const [range, setRange] = useState<"7d" | "30d" | "90d">("30d");

  return (
    <div className="with-sidebar page py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <div className="flex items-center gap-2">
          {(["7d","30d","90d"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-md text-sm border ${
                range === r
                  ? "bg-[rgb(var(--brand-500))] text-white border-transparent"
                  : "bg-transparent border-slate-700 hover:bg-slate-800"
              }`}
            >
              {r === "7d" ? "7 dias" : r === "30d" ? "30 dias" : "90 dias"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI title="Sessões" value="7 480" />
        <KPI title="Taxa de rejeição" value="42%" />
        <KPI title="Duração média" value="2m 58s" />
        <KPI title="Conversão" value="2.4%" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card title="Tendência de tráfego">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficSeries}>
                <CartesianGrid stroke="rgba(148,163,184,0.15)" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="sess" stroke={BRAND.main} strokeWidth={2} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Mobile vs Desktop">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deviceSplit} dataKey="value" nameKey="name" outerRadius={90} innerRadius={55}>
                  <Cell fill={BRAND.main} />
                  <Cell fill={BRAND.dark} />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Top 5 fontes de tráfego">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sources}>
                <CartesianGrid stroke="rgba(148,163,184,0.15)" strokeDasharray="3 3" />
                <XAxis dataKey="src" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="val" fill={BRAND.main} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Table title="Top 10 páginas mais vistas" headA="Página" headB="Visualizações"
               rows={topPages.map(p => ({ a: p.url, b: p.views.toLocaleString("pt-PT") }))} />
        <Table title="Top 10 keywords (cliques)" headA="Palavra-chave" headB="Cliques"
               rows={keywordsClicks.map(k => ({ a: k.kw, b: k.clicks.toLocaleString("pt-PT") }))} />
        <Table title="Top 10 keywords (impressões)" headA="Palavra-chave" headB="Impressões"
               rows={keywordsImpr.map(k => ({ a: k.kw, b: k.impr.toLocaleString("pt-PT") }))} />

        <Card title="Pesquisas efetuadas no site">
          <table className="w-full text-sm">
            <thead className="text-slate-400">
              <tr><th className="text-left py-2">Pesquisa</th><th className="py-2">Quando</th><th className="py-2 text-right">Dispositivo</th></tr>
            </thead>
            <tbody>
              {siteSearches.map((s, i) => (
                <tr key={i} className="border-t border-slate-800">
                  <td className="py-2">{s.q}</td>
                  <td className="py-2">{s.when}</td>
                  <td className="py-2 text-right">{s.device}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Preenchimento de formulários">
          <div className="mb-3 text-sm text-slate-400">Total (30 dias): <span className="text-slate-100 font-medium">126</span></div>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={formsSeries}>
                <CartesianGrid stroke="rgba(148,163,184,0.15)" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="leads" stroke={BRAND.dark} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Table title="Top cidades" headA="Cidade" headB="Utilizadores"
               rows={cities.map(c => ({ a: c.city, b: c.users.toLocaleString("pt-PT") }))} />
      </div>
    </div>
  );
}

/* ------------------------------ UI helpers ------------------------------ */

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function KPI({ title, value }: { title: string; value: string }) {
  return (
    <div className="card p-4">
      <p className="text-xs text-slate-400">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}

function Table({
  title, headA, headB, rows,
}: {
  title: string; headA: string; headB: string;
  rows: { a: string; b: string | number }[];
}) {
  return (
    <Card title={title}>
      <table className="w-full text-sm">
        <thead className="text-slate-400">
          <tr><th className="text-left py-2">{headA}</th><th className="text-right py-2">{headB}</th></tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="border-t border-slate-800">
              <td className="py-2">{r.a}</td>
              <td className="py-2 text-right">{r.b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
