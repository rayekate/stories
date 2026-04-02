import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  title: {
    default: "SANCTUM AI | Unrestricted Adult Fantasy & Story Generation",
    template: "%s | Sanctum AI"
  },
  description: "Transform your deepest desires into unfiltered, cinematic narrative experiences. The elite AI studio for unconstrained adult imagination and dark fantasy.",
  keywords: ["Adult AI Story Generator", "Unrestricted Fantasy AI", "Mature Creative Writing", "Sanctum AI", "Private Narratives"],
  authors: [{ name: "Sanctum AI Team" }],
  creator: "Sanctum AI Team",
  publisher: "Sanctum AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "SANCTUM AI | Unrestricted Adult Fantasy Narratives",
    description: "Transform your deepest desires into unfiltered, cinematic narrative experiences.",
    url: "https://naughtytales.xyz",
    siteName: "Sanctum AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sanctum AI Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SANCTUM AI | Unrestricted Adult Fantasy Narratives",
    description: "Transform your deepest desires into unfiltered, cinematic narrative experiences.",
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
      <body className="min-h-full flex flex-col bg-[#050505] text-[#f1f5f9]" suppressHydrationWarning>
        <Navbar />
        <div className="flex-1 pt-32 relative z-0">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
