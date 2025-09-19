import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="min-h-screen bg-[rgb(6,19,32)] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
