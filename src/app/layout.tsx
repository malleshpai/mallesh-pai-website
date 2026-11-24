import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.malleshmpai.com"),
  title: "Mallesh M. Pai",
  description:
    "Personal website of Mallesh M. Pai, Chief Economist at Tempo Labs working on mechanism design, auction theory, blockchains, and decentralized finance.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Mallesh M. Pai",
    description: "Chief Economist at Tempo Labs.",
    images: [{ url: "/profile.jpg", width: 1200, height: 1500, alt: "Mallesh M. Pai" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="min-h-screen flex flex-col bg-[var(--surface)] text-[var(--ink-body)]">
        <Navbar />
        <main className="flex-1 w-full max-w-5xl mx-auto px-6 sm:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
