import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from '@/components/Navigation';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pete Connor - Innovation & Technology",
  description: "Cutting through the noise. Zero fluff. Only what matters.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-gradient-to-br from-[#2d3a4a] via-[#2a3441] to-[#252d37] text-gray-100`}
      >
        <Navigation />
        <main className="min-h-screen pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
