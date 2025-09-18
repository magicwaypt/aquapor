export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[rgb(10,29,47)] flex items-center justify-center p-4 text-slate-200">
      {children}
    </div>
  );
}
