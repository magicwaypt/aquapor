"use client";
import ContributionBadge from "./ContributionBadge";
import { Insight, User } from "@/lib/insights";

export default function UserCard({ user, insights }: { user: User; insights: Insight[] }) {
  const mine = insights.filter(i => i.author.id === user.id);
  const approved = mine.filter(i => i.status === "aprovado").length;
  return (
    <div className="card p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-xs text-slate-400">{user.email}</p>
        </div>
        <ContributionBadge userId={user.id} insights={insights} />
      </div>
      <div className="text-sm text-slate-300">
        <div>Função: <span className="text-slate-200 font-medium">{user.role}</span></div>
        <div>Insights: {mine.length} (Aprovados: {approved})</div>
      </div>
    </div>
  );
}
