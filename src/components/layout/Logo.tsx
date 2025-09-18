"use client";
import { BarChart3 } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 font-semibold text-aquapor-700">
      <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-aquapor-100">
        <BarChart3 className="h-5 w-5 text-aquapor-600" />
      </div>
      <span className="text-lg">Aquapor Platform</span>
    </div>
  );
}
