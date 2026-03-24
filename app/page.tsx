import React from "react";
import MainStudio from "@/components/MainStudio";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Studio Decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10 bg-radial-at-tr from-accent-glow to-transparent opacity-20" />
      
      {/* Interactive UI Studio */}
      <MainStudio />
      
      {/* Premium Shimmer Background Elements */}
      <div className="fixed top-1/4 left-1/4 w-[1px] h-[30%] bg-gradient-to-b from-transparent via-white/20 to-transparent blur-[1px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[1px] h-[30%] bg-gradient-to-b from-transparent via-white/20 to-transparent blur-[1px] pointer-events-none" />
    </div>
  );
}

