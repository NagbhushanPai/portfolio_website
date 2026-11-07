"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function CaseStudyBackLink() {
  const router = useRouter();

  function handleBack(e: React.MouseEvent) {
    e.preventDefault();
    sessionStorage.setItem("portfolio-hero-reentry", "1");
    router.push("/#work");
  }

  return (
    <Link
      href="/#work"
      onClick={handleBack}
      className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
    >
      <span aria-hidden="true">←</span> Back to Portfolio
    </Link>
  );
}
