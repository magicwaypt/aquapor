export default function ContentPage() {
  const cards = [
    { title: "Artigo para o site (blog)", desc: "Estrutura SEO-friendly com H2/H3, exemplo e FAQ.", href: "/templates/template-artigo.md" },
    { title: "Newsletter", desc: "Modelo com bloco destaque, secundários e editorial.", href: "/templates/template-newsletter.md" },
    { title: "Comunicado de imprensa", desc: "Lead factual, detalhes, citação e media kit.", href: "/templates/template-press-release.md" },
  ];

  const boas = [
    {
      title: "Artigo (SEO)",
      items: [
        "Título ≤ 60 chars e meta description ≤ 155 chars.",
        "Keyword no título, 1º parágrafo e 1–2 H2.",
        "Links internos/externos relevantes.",
        "Imagens leves com ALT descritivo."
      ]
    },
    {
      title: "Newsletter",
      items: [
        "1 CTA principal, 1–2 secundários no máx.",
        "Assunto claro + preheader com benefício.",
        "Evitar 'spam words', testar mobile.",
        "A/B de assunto."
      ]
    },
    {
      title: "Press Release",
      items: [
        "Lead com 5W (quem, o quê, quando, onde, porquê).",
        "Citação + dados verificáveis.",
        "Contactos e media kit.",
        "Tom factual."
      ]
    }
  ];

  return (
    <div className="with-sidebar page py-6">
      <h1 className="text-2xl font-semibold">Conteúdos</h1>
      <p className="mt-1 text-slate-400">Guias e templates para criação de conteúdo (download em Markdown).</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map(c => (
          <div key={c.title} className="card p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-semibold">{c.title}</h2>
              <p className="mt-2 text-sm text-slate-400">{c.desc}</p>
            </div>
            <a
              href={c.href}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-[rgb(var(--brand-500))] text-white px-3 py-2 text-sm hover:opacity-90"
            >
              Download (.md)
            </a>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        {boas.map(b => (
          <div key={b.title} className="card p-4">
            <h3 className="font-medium">{b.title}</h3>
            <ul className="mt-3 list-disc list-inside text-sm space-y-1 text-slate-300">
              {b.items.map(i => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 card p-4">
        <h3 className="font-medium">Ideias de conteúdo (dummy)</h3>
        <ul className="mt-3 list-disc list-inside text-sm space-y-1 text-slate-300">
          <li>“Qualidade da água”: guia prático para empresas.</li>
          <li>Estudo de caso: redução de perdas com telemetria.</li>
          <li>Checklist: conformidade legal em análises microbiológicas.</li>
        </ul>
      </div>
    </div>
  );
}
