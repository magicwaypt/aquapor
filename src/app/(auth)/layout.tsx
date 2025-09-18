import * as React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // Layout de grupo — não renderiza UI extra, só passa o conteúdo
  return <>{children}</>;
}
