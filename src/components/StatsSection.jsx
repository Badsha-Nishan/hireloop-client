"use client";

import Image from "next/image";
import { BriefcaseBusiness, Building2, Users, Star } from "lucide-react";

const stats = [
  {
    icon: BriefcaseBusiness,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: Building2,
    value: "12K",
    label: "Companies",
  },
  {
    icon: Users,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: Star,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-black py-24">
      {/* Stars Background */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-indigo-300 opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
            }}
          />
        ))}
      </div>

      {/* Globe Image */}
      <div className="absolute inset-x-0 -top-160 flex justify-center">
        <div className="relative w-full max-w-6xl">
          <Image
            src="/images/globe.png"
            alt="Globe"
            width={1400}
            height={700}
            className="w-full object-contain opacity-90"
            priority
          />

          {/* Purple Glow */}
          <div className="absolute inset-0 bg-indigo-600/20 blur-3xl" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="mx-auto max-w-3xl text-3xl font-medium leading-tight text-white">
            Assisting over{" "}
            <span className="text-indigo-400">15,000 job seekers</span>
            <br />
            find their dream positions.
          </h2>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-indigo-500/40 hover:bg-white/[0.05]"
              >
                <Icon size={22} className="mb-10 text-white/80" />

                <h3 className="mb-2 text-5xl font-bold text-white">
                  {item.value}
                </h3>

                <p className="text-lg text-gray-300">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
