import React from "react";
import { Card } from "@heroui/react";

// Individual internal card layout
export const StatCard = ({ icon: Icon, title, value }) => {
  return (
    <Card className="bg-[#121212] border border-[#1f1f1f] rounded-xl shadow-sm w-full">
      <Card.Content className="p-5 flex flex-col gap-5 items-start">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#1f1f1f] text-zinc-400">
          {Icon && <Icon className="w-5 h-5" />}
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-xs font-normal text-zinc-500 tracking-wide">
            {title}
          </span>
          <span className="text-3xl font-semibold text-white tracking-tight">
            {value}
          </span>
        </div>
      </Card.Content>
    </Card>
  );
};

// Main Grid Container (This is what you import as 'DashboardStats' in your overview file)
export default function DashboardStats({ stats = [] }) {
  if (!stats.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((item, index) => (
        <StatCard
          key={index}
          icon={item.icon}
          title={item.title}
          value={item.value}
        />
      ))}
    </div>
  );
}
