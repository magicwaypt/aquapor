"use client";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from "recharts";

type Point = { pillar: string; score: number };

const DEFAULT_DATA: Point[] = [
  { pillar: "Autoridade",   score: 62 },
  { pillar: "Concorrência", score: 48 },
  { pillar: "SEO",          score: 71 },
  { pillar: "Tráfego",      score: 55 },
  { pillar: "Engagement",   score: 43 },
];

export default function PillarsRadar({ data = DEFAULT_DATA }: { data?: Point[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius="70%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="pillar" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Tooltip />
          <Radar name="Índice" dataKey="score" stroke="#50b0a8" fill="#50b0a8" fillOpacity={0.4} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
