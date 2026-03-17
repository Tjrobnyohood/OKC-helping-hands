import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 1. Standard Metadata API (For Browser Tabs & Google Search Snippets)
export const metadata: Metadata = {
  title: "Rise City Hub | Empowering Recovery & Reintegration",
  description: "Free community closet, electronics charging, and recovery meetings. Building dignity and autonomy for our neighbors.",
  keywords: ["homeless resources", "community closet", "phone charging", "rehabilitation", "recovery meetings"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  // 2. Google Schema / JSON-LD (For the "Rich Results" in Google)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NonprofitOrganization",
    "name": "Rise City Hub",
    "url": "https://your-rise-city-domain.com",
    "logo": "https://your-rise-city-domain.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-THUNDER",
      "contactType": "emergency services"
    },
    "description": "A holistic rehabilitation center providing essential electronics charging, professional attire, and peer-led support meetings."
  };

  return (
    <html lang="en">
      <head>
        {/* This script tells Google specifically what your nonprofit DOES */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-[#001E41] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}