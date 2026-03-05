import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SITE_CONFIG } from "@/lib/constants";
import "./globals.css";
import { AnimatedShader } from "@/components/ui/animated-shader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s — ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  metadataBase: new URL(SITE_CONFIG.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {/* Shader layers */}
        <div className="mesh-bg" aria-hidden="true" />
        <AnimatedShader />
        <div className="noise-overlay" aria-hidden="true" />

        {/* Interactive mouse spotlight */}
        <SpotlightCursor />

        {/* Scroll progress */}
        <ScrollProgress />

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
