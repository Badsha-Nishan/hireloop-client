"use client";

import { Search, MapPin, BriefcaseBusiness } from "lucide-react";

export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-black py-28">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.15),transparent_70%)]" />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl rounded-xl border border-cyan-500/50 bg-black/90 backdrop-blur-sm">
          {/* Top Badge */}
          <div className="flex justify-center pt-8">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900 px-6 py-2 text-sm text-zinc-300 shadow-lg">
              <BriefcaseBusiness size={16} />
              <span className="font-semibold text-white">50,000+</span>
              <span>NEW JOBS THIS MONTH</span>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-10 text-center md:px-16">
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-7xl">
              Find Your Dream Job Today
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-400">
              HireLoop connects top talent with world-class companies. Browse
              thousands of curated opportunities and land your next role —
              faster.
            </p>
          </div>

          {/* Divider */}
          <div className="border-t border-cyan-500/30" />

          {/* Search Area */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 md:flex-row">
              {/* Job Search */}
              <div className="flex flex-1 items-center px-5 py-4">
                <Search className="mr-3 text-zinc-400" size={20} />
                <input
                  type="text"
                  placeholder="Job title, skill or company"
                  className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
                />
              </div>

              {/* Divider */}
              <div className="hidden w-px bg-white/10 md:block" />

              {/* Location */}
              <div className="flex flex-1 items-center px-5 py-4">
                <MapPin className="mr-3 text-zinc-400" size={20} />
                <input
                  type="text"
                  placeholder="Location or Remote"
                  className="w-full bg-transparent text-white outline-none placeholder:text-zinc-500"
                />
              </div>

              {/* Search Button */}
              <button className="flex h-14 w-14 items-center justify-center bg-violet-600 transition hover:bg-violet-700 md:h-auto md:w-16">
                <Search className="text-white" size={22} />
              </button>
            </div>

            {/* Trending Tags */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <span className="text-sm text-zinc-500">Trending Position</span>

              {["Product Designer", "AI Engineering", "Dev-ops Engineer"].map(
                (item) => (
                  <button
                    key={item}
                    className="rounded-full border border-white/10 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
                  >
                    {item}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Dots Effect */}
      <div className="absolute bottom-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
    </section>
  );
}
