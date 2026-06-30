import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nagbhushan Pai | Software Engineer",
  description:
    "Portfolio of Nagbhushan Pai, a software engineer building scalable backend systems and AI-powered applications.",
  metadataBase: new URL("https://nagbhushan.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nagbhushan Pai | Software Engineer",
    description:
      "Backend systems, distributed systems, and AI applications with a product-minded engineering focus.",
    type: "website",
    url: "https://nagbhushan.me",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nagbhushan Pai | Software Engineer",
    description:
      "Backend systems, distributed systems, and AI applications with a product-minded engineering focus.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
