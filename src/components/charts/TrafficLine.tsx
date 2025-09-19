"use client";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Seg", uv: 820 },
  { name: "Ter", uv: 880 },
  { name: "Qua", uv: 840 },
  { name: "Qui", uv: 920 },
  { name: "Sex", uv: 1100 },
  { name: "Sáb", uv: 760 },
  { name: "Dom", uv: 680 },
];

export default function TrafficLine() {
  return (
    <div className="h-64 w-full"> {/* ALTURA EXPLÍCITA */}
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 24, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="uv" stroke="#50b0a8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
