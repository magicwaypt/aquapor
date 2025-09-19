"use client";
import { contributionLevel, Insight } from "@/lib/insights";

export default function ContributionBadge({
  userId,
  insights,
}: { userId: string; insights: Insight[] }) {
  const lvl = contributionLevel(userId, insights);
  return (
    <span className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs text-white ${lvl.color}`}>
      • Nível {lvl.label}
    </span>
  );
}
