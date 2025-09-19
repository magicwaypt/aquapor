import "./globals.css";
export const metadata = { title: "Aquapor Platform" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen bg-[#0f1b2a] text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}
