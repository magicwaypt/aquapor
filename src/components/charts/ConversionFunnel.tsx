"use client";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList,
} from "recharts";

/**
 * Simplificação: usamos BarChart horizontal para simular funil.
 * (Funciona muito bem visualmente e é leve.)
 */
const data = [
  { etapa: "Visitas", valor: 12000 },
  { etapa: "Páginas vistas", valor: 7200 },
  { etapa: "Leads", valor: 1480 },
  { etapa: "Qualificados", valor: 620 },
  { etapa: "Convertidos", valor: 210 },
];

export default function ConversionFunnel() {
  return (
    <div className="h-64 w-full"> {/* ALTURA EXPLÍCITA */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 24, left: 40, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="etapa" width={110} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="valor" fill="#50b0a8" radius={[0, 8, 8, 0]}>
            <LabelList dataKey="valor" position="right" className="text-xs" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
