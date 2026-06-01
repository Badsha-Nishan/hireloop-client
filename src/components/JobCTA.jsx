import React from "react";

export default function JobCTA() {
  return (
    <section className="bg-black text-white relative py-32 px-6 overflow-hidden flex flex-col items-center justify-center min-h-[550px] w-full border-t border-neutral-950">
      {/* Perspective 3D Grid Backdrop (Simulating image_ee2509.png) */}
      <div className="absolute inset-x-0 top-0 h-[600px] flex justify-center pointer-events-none select-none">
        <div
          className="relative w-[180%] md:w-[130%] lg:w-[110%] aspect-square rounded-full border border-indigo-500/20 bg-black overflow-hidden transform -translate-y-1/2"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.85) 75%),
              linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px),
              radial-gradient(circle at center, rgba(79, 70, 229, 0.25) 0%, transparent 60%)
            `,
            backgroundSize: "100% 100%, 45px 45px, 45px 45px, 100% 100%",
            maskImage:
              "radial-gradient(circle at 50% 50%, black 40%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, black 40%, transparent 75%)",
          }}
        >
          {/* Subtle interior radial flare lighting up the grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18)_0%,transparent_50%)]" />
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center space-y-6">
        {/* Main Header */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-tight max-w-2xl">
          <span className="block">Your next role is</span>
          <span className="block">already looking for you</span>
        </h2>

        {/* Subtitle Description */}
        <p className="text-neutral-400 font-light text-sm md:text-base tracking-wide max-w-xl">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        {/* Action Call buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
          <button
            type="button"
            className="w-full sm:w-auto px-6 py-3 bg-white text-black font-medium rounded-xl text-sm hover:bg-neutral-200 transition-all duration-200 shadow-lg shadow-indigo-500/5"
          >
            Create a free account
          </button>

          <button
            type="button"
            className="w-full sm:w-auto px-6 py-3 bg-neutral-900/60 border border-neutral-800 text-neutral-300 font-medium rounded-xl text-sm hover:text-white hover:border-neutral-700 backdrop-blur-sm transition-all duration-200"
          >
            View pricing
          </button>
        </div>
      </div>
    </section>
  );
}
