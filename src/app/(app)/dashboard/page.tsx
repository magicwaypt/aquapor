import TrafficLine from "@/components/charts/TrafficLine";
import ConversionFunnel from "@/components/charts/ConversionFunnel";
import PillarsRadar from "@/components/charts/PillarsRadar";

export default function DashboardPage() {
  const tempoMedio = "3m45s";
  const paginasSessao = 4.2;

  const subPilares: { titulo: string; itens: string[] }[] = [
    {
      titulo: "Leadership",
      itens: [
        "Autoridade técnica em água potável",
        "PageRank médio a subir (dummy)",
        "Citações em media especializados",
        "Guia anual de qualidade da água",
        "Programa de speakers Aquapor",
      ],
    },
    {
      titulo: "Interaction",
      itens: [
        "CTR orgânico 18–22% em top10",
        "SNIPPET: FAQ implementada",
        "Tempo em página > 2m (posts longos)",
        "Links de navegação contextual",
        "Captação de email via conteúdos",
      ],
    },
    {
      titulo: "Targeting",
      itens: [
        "Segmentos: Municípios, Indústria, Turismo",
        "Topics: análises, telemetria, perdas",
        "Mapa de keywords por vertical",
        "Clusters por intenção (info → lead)",
        "LPs com copy por persona",
      ],
    },
    {
      titulo: "Benchmark",
      itens: [
        "Concorrente A com 20% mais backlinks",
        "Gap de conteúdos: 'telemetria piscinas'",
        "Comparativos de serviço (checklist)",
        "SERP features: imagens e vídeos",
        "Alertas de ranking semanal",
      ],
    },
    {
      titulo: "Innovation",
      itens: [
        "Calculadora de perdas (widget)",
        "Relatórios dinâmicos por município",
        "Newsletter com personalização",
        "Microsite sazonal 'Água no Verão'",
        "Piloto de LLM para respostas técnicas",
      ],
    },
  ];

  return (
    <div className="with-sidebar page space-y-6">
      <h1 className="text-2xl font-semibold">Visão Geral do Dashboard</h1>

      {/* Linha 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Tendências de tráfego do site</h2>
            <span className="pill">Últimos 7 dias</span>
          </div>
          <div className="mt-3"><TrafficLine /></div>
        </div>

        <div className="card p-4">
          <h2 className="text-lg font-semibold">Palavras-chave em destaque</h2>
          <ul className="mt-3 text-sm space-y-2 text-slate-300">
            <li>análises de água — 800 cliques</li>
            <li>infraestrutura hídrica — 705 cliques</li>
            <li>água sustentável — 610 cliques</li>
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md border border-slate-700/60 p-3">
              <div className="text-slate-400">Tempo médio</div>
              <div className="text-xl font-semibold">{tempoMedio}</div>
            </div>
            <div className="rounded-md border border-slate-700/60 p-3">
              <div className="text-slate-400">Páginas/sessão</div>
              <div className="text-xl font-semibold">{paginasSessao}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Linha 2 — Funil encolhido */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card p-4 lg:col-span-2">
          <h2 className="text-lg font-semibold">Fotografia estratégica (última leitura)</h2>
          <PillarsRadar />
        </div>
        <div className="card p-4">
          <h2 className="text-lg font-semibold">Funil de conversão</h2>
          <div className="mt-3"><ConversionFunnel /></div>
        </div>
      </div>

      {/* Linha 3 — Sub-pilares */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {subPilares.map((sp) => (
          <div className="card p-4" key={sp.titulo}>
            <h3 className="font-semibold">{sp.titulo}</h3>
            <ul className="mt-3 list-disc list-inside text-sm space-y-1 text-slate-300">
              {sp.itens.map((t, i) => (<li key={i}>{t}</li>))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
