"use client";

import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend,
} from "recharts";
import { CheckCircle2, AlertTriangle, TrendingUp, Search, Link as LinkIcon } from "lucide-react";

/* ------------------------------ Dummy data ------------------------------ */
const BRAND = { main: "#50b0a8", dark: "#102d47" };

const visibilidadeSerie = [
  { week: "W1", score: 58 },
  { week: "W2", score: 61 },
  { week: "W3", score: 63 },
  { week: "W4", score: 66 },
  { week: "W5", score: 69 },
  { week: "W6", score: 71 },
];

const rankingMove = [
  { kw: "análises de água", pos: 3, delta: +1, clicks: 800 },
  { kw: "infraestrutura hídrica", pos: 5, delta: 0, clicks: 705 },
  { kw: "água sustentável", pos: 6, delta: +2, clicks: 610 },
  { kw: "telemetria água", pos: 8, delta: +3, clicks: 410 },
  { kw: "qualidade da água", pos: 9, delta: -1, clicks: 391 },
  { kw: "tratamento de água", pos: 11, delta: +1, clicks: 350 },
  { kw: "laboratório água", pos: 12, delta: 0, clicks: 320 },
  { kw: "análise microbiológica", pos: 14, delta: +2, clicks: 290 },
  { kw: "perdas de água", pos: 15, delta: +1, clicks: 260 },
  { kw: "água potável", pos: 16, delta: 0, clicks: 245 },
];

const topPaginasSEO = [
  { url: "/servicos/analises-agua", clicks: 3280, impr: 15800, ctr: "20.8%", pos: 3.1 },
  { url: "/blog/conservacao-agua", clicks: 1670, impr: 8900, ctr: "18.8%", pos: 6.2 },
  { url: "/servicos/telemetria", clicks: 1512, impr: 7600, ctr: "19.9%", pos: 7.4 },
  { url: "/servicos/laboratorio", clicks: 1112, impr: 7980, ctr: "13.9%", pos: 9.1 },
  { url: "/faq", clicks: 1204, impr: 7430, ctr: "16.2%", pos: 8.7 },
];

const backlinks = [
  { ref: "watertechnews.com", links: 24, tipo: "notícia" },
  { ref: "gov.pt/ambiente", links: 12, tipo: "institucional" },
  { ref: "blog-sustentavel.pt", links: 18, tipo: "blog" },
  { ref: "engenhariah2o.pt", links: 7, tipo: "diretório" },
  { ref: "universidade-exemplo.pt", links: 11, tipo: "académico" },
];

const fontesOrganic = [
  { src: "Google", val: 78 },
  { src: "Bing", val: 12 },
  { src: "Yahoo", val: 6 },
  { src: "Outros", val: 4 },
];

const issues = [
  { sev: "Crítico",    msg: "Tags title duplicadas em 4 páginas." },
  { sev: "Alto",       msg: "Imagens sem alt text (12)." },
  { sev: "Médio",      msg: "URLs longas (>115 caracteres) em 5 páginas." },
  { sev: "Médio",      msg: "Meta description ausente em 3 páginas." },
  { sev: "Baixo",      msg: "H1 múltiplo em 2 páginas." },
];

const cwv = [
  { label: "LCP", val: "2.3s", status: "OK" },
  { label: "INP", val: "170ms", status: "OK" },
  { label: "CLS", val: "0.09", status: "OK" },
];

/* ------------------------------ UI Helpers ------------------------------ */
function KPI({ title, value, icon }: { title:string; value:string; icon?:React.ReactNode }) {
  return (
    <div className="card p-4 flex items-center gap-3">
      {icon}
      <div>
        <p className="text-xs text-slate-400">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
    </div>
  );
}

function Card({ title, children }: { title:string; children:React.ReactNode }) {
  return (
    <section className="card p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Table({
  title, headA, headB, headC, headD, rows,
}: {
  title:string; headA:string; headB:string; headC?:string; headD?:string;
  rows: { a:string; b:string|number; c?:string|number; d?:string|number }[];
}) {
  return (
    <Card title={title}>
      <table className="w-full text-sm">
        <thead className="text-slate-400">
          <tr>
            <th className="text-left py-2">{headA}</th>
            <th className="text-right py-2">{headB}</th>
            {headC && <th className="text-right py-2">{headC}</th>}
            {headD && <th className="text-right py-2">{headD}</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-slate-800">
              <td className="py-2">{r.a}</td>
              <td className="py-2 text-right">{r.b}</td>
              {headC && <td className="py-2 text-right">{r.c}</td>}
              {headD && <td className="py-2 text-right">{r.d}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

/* ------------------------------ Page ------------------------------ */
export default function SEOInsightsPage() {
  return (
    <div className="with-sidebar page py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">SEO Insights</h1>
        <div className="text-sm text-slate-400">Janela: últimos 30 dias (dummy)</div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPI title="Pontuação de SEO (visibilidade)" value="71/100" icon={<TrendingUp className="text-[rgb(var(--brand-500))]" />} />
        <KPI title="Palavras ranqueadas (Top 10)" value="24" icon={<Search className="text-[rgb(var(--brand-500))]" />} />
        <KPI title="Backlinks" value="72 domínios" icon={<LinkIcon className="text-[rgb(var(--brand-500))]" />} />
        <KPI title="Erros críticos" value="1" icon={<AlertTriangle className="text-amber-400" />} />
      </div>

      {/* Gráficos: visibilidade + fontes orgânicas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Visibilidade (índice ao longo das semanas)">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visibilidadeSerie}>
                <CartesianGrid stroke="rgba(148,163,184,0.15)" strokeDasharray="3 3" />
                <XAxis dataKey="week" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke={BRAND.main} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Repartição de tráfego orgânico por motor">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fontesOrganic}>
                <CartesianGrid stroke="rgba(148,163,184,0.15)" strokeDasharray="3 3" />
                <XAxis dataKey="src" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Legend />
                <Bar dataKey="val" fill={BRAND.main} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Tabelas principais */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Table
          title="Movimentos de ranking (Top 10 keywords)"
          headA="Keyword" headB="Posição" headC="Δ" headD="Cliques"
          rows={rankingMove.map(r => ({
            a: r.kw,
            b: r.pos,
            c: (r.delta > 0 ? "▲" : r.delta < 0 ? "▼" : "•") + " " + Math.abs(r.delta),
            d: r.clicks.toLocaleString("pt-PT"),
          }))}
        />

        <Table
          title="Top páginas por performance orgânica"
          headA="Página" headB="Cliques" headC="Impressões" headD="CTR / Posição"
          rows={topPaginasSEO.map(p => ({
            a: p.url,
            b: p.clicks.toLocaleString("pt-PT"),
            c: p.impr.toLocaleString("pt-PT"),
            d: `${p.ctr} / ${p.pos}`,
          }))}
        />
      </div>

      {/* Backlinks + Core Web Vitals + Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Table
          title="Backlinks (por domínio de referência)"
          headA="Domínio" headB="Links" headC="Tipo"
          rows={backlinks.map(b => ({ a: b.ref, b: b.links, c: b.tipo }))}
        />

        <Card title="Core Web Vitals (amostra)">
          <div className="grid grid-cols-3 gap-3">
            {cwv.map((m, i) => (
              <div key={i} className="card p-3 text-center">
                <p className="text-xs text-slate-400">{m.label}</p>
                <p className="text-xl font-semibold mt-1">{m.val}</p>
                <p className={`text-xs mt-1 ${m.status === "OK" ? "text-emerald-400" : "text-amber-400"}`}>
                  {m.status}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-400 mt-3">
            * Valores meramente ilustrativos.
          </p>
        </Card>

        <Card title="SEO Issues (prioridade)">
          <ul className="text-sm space-y-2">
            {issues.map((i, idx) => (
              <li key={idx} className="flex items-start gap-2">
                {i.sev === "Crítico" ? (
                  <AlertTriangle className="h-4 w-4 mt-0.5 text-amber-400" />
                ) : (
                  <CheckCircle2 className="h-4 w-4 mt-0.5 text-slate-400" />
                )}
                <span>
                  <span className="font-medium">{i.sev}: </span>{i.msg}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-3 text-xs text-slate-400">
            Dicas rápidas: garantir meta-description única, headings hierárquicos, imagens com <code>alt</code>,
            e sitemap/robots atualizados.
          </div>
        </Card>
      </div>

      {/* Sugestões de Conteúdo + Schema */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Sugestões de conteúdo (clusterização dummy)">
          <ul className="list-disc list-inside text-sm space-y-1">
            <li>Guia completo: “Análises de água para empresas” (pilar + 3 artigos satélite).</li>
            <li>Estudo de caso: “Redução de perdas de água com telemetria”.</li>
            <li>Checklist: “Conformidade legal de qualidade da água em indústrias”.</li>
            <li>Glossário: termos técnicos (coliformes, LCP, INP, CLS, PSA…).</li>
          </ul>
        </Card>

        <Card title="Schema & Robots (estado dummy)">
          <div className="text-sm space-y-2">
            <p>Schema aplicado: <span className="font-medium">Organization, Service, Article</span></p>
            <p>Sitemap: <span className="text-emerald-400">/sitemap.xml — OK</span></p>
            <p>robots.txt: <span className="text-emerald-400">permitindo / (sem bloqueios críticos)</span></p>
          </div>
        </Card>
      </div>
    </div>
  );
}
