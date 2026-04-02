import React from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import MainStudio from "@/components/MainStudio";
import { FeaturedSlider } from "@/components/slider/FeaturedSlider";

async function getFeaturedStories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/featured`, { 
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    return [];
  }
}

export default async function Home() {
  const featuredStories = await getFeaturedStories();

  return (
    <main className="min-h-screen relative overflow-hidden bg-background">
      {/* Hero Section */}
      <Hero />

      {/* Main Studio Section */}
      <section id="studio" className="relative z-10 section-padding">
        <div className="container-tight">
          <div className="w-full mb-16 text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
              THE <span className="text-accent underline decoration-accent/30 underline-offset-8">SANCTUM</span>
            </h2>
            <p className="text-white/30 font-medium uppercase tracking-[0.4em] text-[10px]">
              Interface v3.0 // Unrestricted Generation Matrix
            </p>
          </div>
          <div className="w-full flex justify-center">
            <MainStudio />
          </div>
        </div>
      </section>



      {/* How It Works is now inside Features */}
      
      {/* Testimonials / Social Proof */}
      <Testimonials />

      {/* Trending / Stories Section */}
      {featuredStories && featuredStories.length > 0 && (
        <section id="stories" className="section-padding bg-black/30 border-y border-white/5">
          <div className="container-tight">
            <div className="mb-20 text-center space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full border border-white/5 bg-white/5 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">
                <div className="w-1 h-1 rounded-full bg-accent" />
                Featured Narratives
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-tight">
                FEATURED <span className="text-white/20">NARRATIVES</span>
              </h2>
              <div className="w-16 h-[1px] bg-accent/40 mx-auto" />
            </div>
            <FeaturedSlider stories={featuredStories} />
          </div>
        </section>
      )}

      {/* Pre-Footer CTA */}
      <CallToAction />

      {/* Premium Shimmer Background Elements */}
      <div className="fixed top-1/4 left-1/4 w-[1px] h-[30%] bg-gradient-to-b from-transparent via-white/5 to-transparent blur-[1px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[1px] h-[30%] bg-gradient-to-b from-transparent via-white/5 to-transparent blur-[1px] pointer-events-none -z-10" />
    </main>
  );
}
