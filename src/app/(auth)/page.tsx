"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@aquapor.pt");
  const [pass, setPass] = useState("aquapor123");
  const [err, setErr] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email === "admin@aquapor.pt" && pass === "aquapor123") {
      router.push("/dashboard");
    } else {
      setErr("Credenciais inválidas. Use admin@aquapor.pt / aquapor123");
    }
  }

  return (
    <div className="w-full max-w-md rounded-xl bg-white/5 border border-white/10 p-6 backdrop-blur">
      <h1 className="text-xl font-semibold mb-1 text-white">Bem-vindo ao Aquapor</h1>
      <p className="text-sm text-slate-300 mb-6">
        Inicie sessão para aceder à plataforma de Data Intelligence.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm text-slate-300">Email</label>
          <input
            className="mt-1 w-full h-10 rounded-md bg-white/5 border border-white/10 px-3 outline-none focus:ring-2 focus:ring-[rgb(80,176,168)]/50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div>
          <label className="text-sm text-slate-300">Palavra-passe</label>
          <input
            className="mt-1 w-full h-10 rounded-md bg-white/5 border border-white/10 px-3 outline-none focus:ring-2 focus:ring-[rgb(80,176,168)]/50"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
          />
        </div>
        {err && <p className="text-sm text-rose-300">{err}</p>}
        <button
          type="submit"
          className="w-full h-10 rounded-md bg-[rgb(80,176,168)] text-slate-900 font-medium hover:opacity-90"
        >
          Iniciar Sessão
        </button>
        <p className="text-xs text-center text-slate-400">
          Demo: <b>admin@aquapor.pt</b> / <b>aquapor123</b>
        </p>
      </form>
    </div>
  );
}
