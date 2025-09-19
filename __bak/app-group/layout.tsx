import "../globals.css";

export default function AppGroupLayout({ children }: { children: React.ReactNode }) {
  return <div className="with-sidebar">{children}</div>;
}
