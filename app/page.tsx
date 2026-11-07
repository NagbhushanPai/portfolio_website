import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Contributions } from "@/components/sections/contributions";
import { ProjectGrid } from "@/components/sections/project-grid";
import { Journey } from "@/components/sections/journey";
import { Milestones } from "@/components/sections/milestones";
import { Blog } from "@/components/sections/blog";
import { ToolsMarquee } from "@/components/sections/tools-marquee";
import { SiteFooter } from "@/components/sections/site-footer";
import { siteConfig } from "@/lib/portfolio-data";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: siteConfig.role,
    url: "https://nagbhushan.me",
    sameAs: [siteConfig.github, siteConfig.linkedin],
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Hero />
      <Intro />
      <Contributions />
      <ProjectGrid />
      <Journey />
      <Milestones />
      <Blog />
      <ToolsMarquee />
      <SiteFooter />
    </main>
  );
}
