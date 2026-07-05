import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Percepta | Industrial Safety Intelligence",
  description: "Detect risks before accidents happen. Percepta is bridging the gap between AI and physical operations to create proactive industrial safety intelligence networks.",
  keywords: ["Industrial Safety", "Safety Intelligence", "Computer Vision", "Edge AI", "Manufacturing Safety", "EHS Software", "Proactive Safety"],
  authors: [{ name: "Percepta Inc." }],
  openGraph: {
    title: "Percepta | Industrial Safety Intelligence",
    description: "Transform your passive cameras into proactive risk detection networks. Join the design partner program.",
    url: "https://percepta.sbs",
    siteName: "Percepta",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Percepta | Industrial Safety Intelligence",
    description: "Detect risks before accidents happen.",
  },
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} min-h-screen flex flex-col font-sans antialiased text-foreground bg-background`}>
        <Navbar />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
