import { BookOpen } from "lucide-react";

export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-[#050505] pt-36 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="space-y-6 mb-20">
          <div className="w-32 h-6 bg-white/5 rounded-full animate-pulse" />
          <div className="w-2/3 h-20 bg-white/5 rounded-2xl animate-pulse" />
          <div className="w-1/2 h-4 bg-white/5 rounded-full animate-pulse" />
        </div>

        {/* Featured Card Skeleton */}
        <div className="w-full h-96 bg-white/5 rounded-[28px] animate-pulse mb-12" />

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-64 bg-white/5 rounded-[20px] animate-pulse p-8 space-y-4">
              <div className="w-20 h-4 bg-white/5 rounded-full" />
              <div className="w-full h-8 bg-white/5 rounded-lg" />
              <div className="w-full h-12 bg-white/5 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
