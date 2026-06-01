import React from "react";
import {
  Search,
  LineChart,
  BarChart3,
  Bookmark,
  MousePointerClick,
  FileText,
  Hexagon,
  TrendingUp,
} from "lucide-react";

// Map string keys to your Lucide React components statically
const iconMap = {
  search: Search,
  lineChart: LineChart,
  barChart: BarChart3,
  bookmark: Bookmark,
  mousePointerClick: MousePointerClick,
  fileText: FileText,
  hexagon: Hexagon,
  trendingUp: TrendingUp,
};

export default function JobFeatures() {
  // Using pure string primitives for data prevents Next.js SSR mismatches
  const features = [
    {
      iconKey: "search",
      title: "Smart Search",
      description: "Find your ideal job with advanced filters.",
    },
    {
      iconKey: "lineChart",
      title: "Salary Insights",
      description: "Get real salary data to negotiate confidently.",
    },
    {
      iconKey: "barChart",
      title: "Top Companies",
      description: "Apply to vetted companies that are hiring.",
    },
    {
      iconKey: "bookmark",
      title: "Saved Jobs",
      description: "Manage apps & favorites on your dashboard.",
    },
    {
      iconKey: "mousePointerClick",
      title: "One-Click Apply",
      description: "Simplify your job applications for an easier process!",
    },
    {
      iconKey: "fileText",
      title: "Resume Builder",
      description: "Create professional resumes with modern templates.",
    },
    {
      iconKey: "hexagon",
      title: "Skill-Based Matching",
      description: "Discover jobs that match your skills and experience.",
    },
    {
      iconKey: "trendingUp",
      title: "Career Growth Resources",
      description: "Boost your career with quick interview tips.",
    },
  ];

  return (
    <section className="bg-black text-white py-24 px-4 md:px-8 flex flex-col justify-center items-center border-t border-neutral-900">
      {/* Header Section */}
      <div className="text-center max-w-2xl mb-16 space-y-4">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-indigo-400 font-medium">
          <span className="h-1.5 w-1.5 bg-indigo-500 inline-block"></span>
          Features Job
          <span className="h-1.5 w-1.5 bg-indigo-500 inline-block"></span>
        </div>

        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          <span className="block">Everything you need</span>
          <span className="block">to succeed</span>
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 max-w-6xl w-full">
        {features.map((feature, index) => {
          // Resolve the icon component safely from our static map
          const IconComponent = iconMap[feature.iconKey] || Search;

          return (
            <div key={index} className="flex items-start gap-4 group">
              {/* Icon Box */}
              <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-b from-[#161616] to-[#0d0d0d] border border-neutral-800/60 flex items-center justify-center shadow-inner group-hover:border-neutral-700 transition-colors">
                <IconComponent
                  className="w-5 h-5 text-fuchsia-400/90"
                  strokeWidth={1.75}
                />
              </div>

              {/* Content Details */}
              <div className="space-y-1 pt-1">
                <h3 className="text-base font-medium text-neutral-200 group-hover:text-white transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
