import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: "AI Story Studio | Create Immersive Stories with AI",
  description: "Transform your wildest prompts into immersive, cinematic narrative experiences. The premium AI-powered studio for writers, gamers, and dreamers.",
  keywords: ["AI Story Generator", "Narrative AI", "Creative Writing tool", "AI Storyteller", "Interactive Stories"],
  authors: [{ name: "AI Story Studio Team" }],
  openGraph: {
    title: "AI Story Studio | Create Immersive Stories with AI",
    description: "Transform your wildest prompts into immersive, cinematic narrative experiences.",
    url: "https://story-studio.ai",
    siteName: "AI Story Studio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Story Studio | Create Immersive Stories with AI",
    description: "Transform your wildest prompts into immersive, cinematic narrative experiences.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#050505]">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

