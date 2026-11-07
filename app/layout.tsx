import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { TopNav } from "@/components/chrome/top-nav";
import { TalkButton } from "@/components/chrome/talk-button";
import { NoiseOverlay } from "@/components/chrome/noise-overlay";
import { CursorLens } from "@/components/chrome/cursor-lens";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { PageLoader } from "@/components/motion/page-loader";
import { siteConfig } from "@/lib/portfolio-data";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | ${siteConfig.role}`,
  description: siteConfig.tagline,
  metadataBase: new URL("https://nagbhushan.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.tagline,
    type: "website",
    url: "https://nagbhushan.me",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.role}`,
    description: siteConfig.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <NoiseOverlay />
        <PageLoader />
        <SmoothScroll />
        <CursorLens />
        <TopNav />
        {children}
        <TalkButton />
        <Analytics />
      </body>
    </html>
  );
}
