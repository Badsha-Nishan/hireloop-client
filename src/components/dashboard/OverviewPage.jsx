import React from "react";
// BUG FIX: Import the default export (the full grid wrapper) instead of the individual card
import DashboardStats from "./StatCard";

// BUG FIX: Accept 'stats' as an incoming prop to make this page reusable
export default function OverviewPage({ stats = [] }) {
  return (
    <div className="p-6 bg-[#0a0a0a] min-h-screen text-white">
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight">
          Recruitment Dashboard
        </h1>
        <p className="text-sm text-zinc-400">
          Overview of platform development statistics
        </p>
      </div>

      {/* BUG FIX: Render DashboardStats container component and pass down stats data */}
      <DashboardStats stats={stats} />
    </div>
  );
}
