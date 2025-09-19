"use client";
import InsightForm from "@/components/users/InsightForm";
import InsightsTable from "@/components/users/InsightsTable";
import UserCard from "@/components/users/UserCard";
import { loadInsights, User } from "@/lib/insights";
import { useEffect, useState } from "react";

const TEAM: User[] = [
  { id: "u1", name: "Miguel Santos", email: "miguel.santos@aquapor.pt", role: "Digital Strategist" },
  { id: "u2", name: "Ana Ferreira", email: "ana.ferreira@aquapor.pt", role: "Marketing Manager" },
  { id: "u3", name: "João Silva", email: "joao.silva@aquapor.pt", role: "Data Analyst" },
  { id: "u4", name: "Marta Costa", email: "marta.costa@aquapor.pt", role: "Content Specialist" },
];

export default function UsersPage() {
  const [insights, setInsights] = useState(loadInsights());
  useEffect(() => {
    const int = setInterval(() => setInsights(loadInsights()), 800);
    return () => clearInterval(int);
  }, []);

  // user "logado" dummy (o primeiro da lista)
  const currentUser = TEAM[0];

  return (
    <div className="with-sidebar page py-6">
      <h1 className="text-2xl font-semibold mb-6">Utilizadores & Insights</h1>

      {/* Equipa */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {TEAM.map(u => <UserCard key={u.id} user={u} insights={insights} />)}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form à esquerda */}
        <div className="lg:col-span-1">
          <InsightForm currentUser={currentUser} />
        </div>

        {/* Tabela à direita */}
        <div className="lg:col-span-2">
          <InsightsTable />
        </div>
      </div>
    </div>
  );
}
