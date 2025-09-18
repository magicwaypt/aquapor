import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-rows-[auto,1fr]">
      <Header />
      <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[16rem,1fr]">
        <Sidebar />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
