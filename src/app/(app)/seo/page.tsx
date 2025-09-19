import { redirect } from "next/navigation";

export default function SEOAlias() {
  // redireciona permanentemente /seo -> /seo-insights
  redirect("/seo-insights");
}
