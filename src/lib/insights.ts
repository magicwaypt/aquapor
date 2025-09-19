export type Insight = {
  id: string;
  title: string;
  category: string;
  text: string;
  tags: string[];
  createdAt: string; // ISO
  author: { id: string; name: string; role: string };
  upvotes: number;
  status: "novo" | "aprovado" | "rejeitado";
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

const KEY = "aquapor.insights.v1";

export function loadInsights(): Insight[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Insight[]) : [];
  } catch {
    return [];
  }
}

export function saveInsights(list: Insight[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function addInsight(ins: Insight) {
  const list = loadInsights();
  list.unshift(ins);
  saveInsights(list);
}

export function upvoteInsight(id: string) {
  const list = loadInsights();
  const ix = list.findIndex(i => i.id === id);
  if (ix >= 0) {
    list[ix].upvotes += 1;
    saveInsights(list);
  }
}

export function contributionLevel(userId: string, list: Insight[]) {
  const mine = list.filter(i => i.author.id === userId);
  const approved = mine.filter(i => i.status === "aprovado").length;
  if (approved >= 10) return { label: "Gold", color: "bg-amber-500" };
  if (approved >= 5) return { label: "Silver", color: "bg-slate-400" };
  if (approved >= 1) return { label: "Bronze", color: "bg-orange-500" };
  return { label: "New", color: "bg-slate-600" };
}
