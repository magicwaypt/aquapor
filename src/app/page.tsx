export default function Home() {
  return (
    <main className="min-h-[60vh] grid place-items-center p-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-semibold">Aquapor Platform (MVP)</h1>
        <p>Escolhe para onde ir:</p>
        <div className="flex gap-3 justify-center">
          <a href="/dashboard" className="rounded-md bg-[rgb(80,176,168)] text-white px-4 py-2">Ir para o Dashboard</a>
          <a href="/login" className="rounded-md border border-slate-300 px-4 py-2">Página de Login (demo)</a>
        </div>
      </div>
    </main>
  );
}
