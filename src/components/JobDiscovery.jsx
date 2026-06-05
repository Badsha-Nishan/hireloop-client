"use client";
import React from "react";
import { Button, Card } from "@heroui/react";
import { MapPin, Briefcase, CircleDollarSign, ArrowRight } from "lucide-react";
// At the top of your file:
import { CardBody } from "@heroui/react";

export default function JobDiscovery() {
  // Unique data array for all 6 cards
  const jobs = [
    {
      title: "Frontend Developer",
      description:
        "Showcase your commitment to diversity and inclusion by highlighting initiatives.",
      location: "New York, USA",
      type: "Hybrid",
      salary: "€25–€40/hour",
    },
    {
      title: "Webflow Developer",
      description:
        "Build and scale pixel-perfect, highly interactive marketing web experiences.",
      location: "Remote, EU",
      type: "Full-Time",
      salary: "€45–€60/hour",
    },
    {
      title: "UI/UX Designer",
      description:
        "Craft beautiful user interfaces and seamless user journeys for our core platform.",
      location: "London, UK",
      type: "On-site",
      salary: "£40–£55/hour",
    },
    {
      title: "Growth Marketer",
      description:
        "Drive user acquisition strategies across organic and paid performance channels.",
      location: "San Francisco, USA",
      type: "Remote",
      salary: "$90k–$120k/year",
    },
    {
      title: "Product Manager",
      description:
        "Define the product vision, roadmap, and collaborate directly with engineering teams.",
      location: "Berlin, DE",
      type: "Hybrid",
      salary: "€70–€85/hour",
    },
    {
      title: "DevOps Engineer",
      description:
        "Optimize cloud infrastructure, CI/CD pipelines, and ensure maximum system uptime.",
      location: "Austin, USA",
      type: "Full-Time",
      salary: "$110k–$140k/year",
    },
  ];

  return (
    <section className="bg-black text-white py-20 px-4 md:px-8 min-h-screen flex flex-col justify-center items-center">
      {/* Header Section */}
      <div className="text-center max-w-2xl mb-12 space-y-3">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-indigo-400 font-medium">
          <span className="h-1.5 w-1.5 bg-indigo-500 inline-block"></span>
          Smart Job Discovery
          <span className="h-1.5 w-1.5 bg-indigo-500 inline-block"></span>
        </div>

        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          <span className="block">The roles you'd never</span>
          <span className="block">find by searching</span>
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mb-12">
        {jobs.map((job, index) => (
          <Card
            key={index}
            className="bg-[#121212] border border-neutral-800/40 p-4 rounded-2xl hover:border-neutral-700 transition-colors"
          >
            <div className="p-4 flex flex-col justify-between min-h-[260px] space-y-6">
              {/* Unique Top Details */}
              <div className="space-y-3">
                <h3 className="text-2xl font-medium text-neutral-200">
                  {job.title}
                </h3>
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  {job.description}
                </p>
              </div>

              {/* Unique Pill Tags */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs px-3 py-1.5 rounded-full">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs px-3 py-1.5 rounded-full">
                    <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                    {job.type}
                  </div>
                </div>

                <div className="flex">
                  <div className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs px-3 py-1.5 rounded-full">
                    <CircleDollarSign className="w-3.5 h-3.5 text-purple-400" />
                    {job.salary}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <Button
                  variant="light"
                  className="text-neutral-300 hover:text-white p-0 h-auto bg-transparent data-[hover=true]:bg-transparent flex items-center gap-2 font-normal text-sm"
                  endContent={<ArrowRight className="w-4 h-4" />}
                >
                  Apply Now
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Footer Button */}
      <div>
        <Button className="bg-white text-black font-medium px-6 py-2.5 rounded-xl hover:bg-neutral-200 transition-colors text-sm">
          View all job open
        </Button>
      </div>
    </section>
  );
}
