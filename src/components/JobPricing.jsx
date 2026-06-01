"use client";
import React, { useState, useEffect } from "react";
import { Crown, TrendingUp, Zap, Plus, ArrowRight } from "lucide-react";

const iconMap = {
  crown: Crown,
  trending: TrendingUp,
  zap: Zap,
};

export default function JobPricing() {
  const [billingPeriod, setBillingPeriod] = useState("monthly");
  const [isMounted, setIsMounted] = useState(false);

  // Force component to wait until client hydration is done before executing conditional states
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const pricingTiers = [
    {
      title: "Starter",
      iconKey: "crown",
      iconColor: "text-purple-400",
      price: { monthly: 0, yearly: 0 },
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
      buttonClass:
        "bg-[#18181b] border border-neutral-800 text-neutral-300 hover:border-neutral-700",
    },
    {
      title: "Growth",
      iconKey: "trending",
      iconColor: "text-pink-400",
      price: { monthly: 17, yearly: 12 },
      features: [
        "Daily AI match brief (top 5)",
        "Verified salary bands",
        "Company insight dashboards",
        "1-click apply, unlimited",
      ],
      buttonClass: "bg-white text-black hover:bg-neutral-200",
      isFeatured: true,
    },
    {
      title: "Premium",
      iconKey: "zap",
      iconColor: "text-indigo-400",
      price: { monthly: 99, yearly: 79 },
      features: [
        "Everything in Pro",
        "Multi-profile career portfolios",
        "Shared talent rooms",
        "Recruiter view (read-only)",
      ],
      buttonClass:
        "bg-[#18181b] border border-neutral-800 text-neutral-300 hover:border-neutral-700",
    },
  ];

  return (
    <section className="bg-black text-white py-24 px-4 md:px-8 flex flex-col justify-center items-center border-t border-neutral-900">
      {/* Header Section */}
      <div className="text-center max-w-2xl mb-8 space-y-4">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-indigo-400 font-medium">
          <span className="h-1.5 w-1.5 bg-indigo-500 inline-block rounded-full"></span>
          Pricing
          <span className="h-1.5 w-1.5 bg-indigo-500 inline-block rounded-full"></span>
        </div>

        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
          <span className="block">Pay for the leverage,</span>
          <span className="block">not the listings</span>
        </h2>
      </div>

      {/* Pricing Toggle Pill */}
      <div className="mb-16 bg-[#121212] border border-neutral-800 p-1 rounded-full flex items-center gap-1">
        <button
          onClick={() => setBillingPeriod("monthly")}
          className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
            isMounted && billingPeriod === "monthly"
              ? "bg-white text-black shadow-md"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingPeriod("yearly")}
          className={`px-4 py-1.5 text-xs font-medium rounded-full flex items-center gap-1.5 transition-all duration-200 ${
            isMounted && billingPeriod === "yearly"
              ? "bg-white text-black shadow-md"
              : "text-neutral-400 hover:text-white"
          }`}
        >
          <span>Yearly</span>
          <span className="bg-fuchsia-600 text-white font-semibold text-[10px] px-1.5 py-0.5 rounded-full scale-90 origin-left">
            25%
          </span>
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full">
        {pricingTiers.map((tier, index) => {
          const HeaderIcon = iconMap[tier.iconKey];

          // Fallback to monthly structure during the initial SSR snapshot pass
          const displayPrice = !isMounted
            ? tier.price.monthly
            : billingPeriod === "monthly"
            ? tier.price.monthly
            : tier.price.yearly;

          return (
            <div
              key={index}
              className={`p-8 rounded-3xl flex flex-col justify-between min-h-[460px] transition-all duration-300 border ${
                tier.isFeatured
                  ? "border-neutral-700 bg-[#121212] shadow-xl"
                  : "border-neutral-800/60 bg-[#0c0c0c]"
              }`}
            >
              {/* Upper Details Block */}
              <div className="space-y-6">
                {/* Title & Price Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                      <HeaderIcon className={`w-4 h-4 ${tier.iconColor}`} />
                    </div>
                    <span className="text-lg font-medium text-neutral-200">
                      {tier.title}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-3xl font-semibold">
                      ${displayPrice}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-light">
                      /month
                    </span>
                  </div>
                </div>

                {/* Feature Segment Opener */}
                <div className="text-xs text-neutral-300 font-medium tracking-wide pt-2">
                  Start building your insights hub:
                </div>

                {/* Features Bullet List */}
                <ul className="space-y-3.5">
                  {tier.features.map((feature, fIndex) => (
                    <li
                      key={fIndex}
                      className="flex items-start gap-3 text-xs text-neutral-400 font-light"
                    >
                      <div className="mt-0.5 w-4 h-4 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center flex-shrink-0">
                        <Plus
                          className="w-2.5 h-2.5 text-neutral-500"
                          strokeWidth={3}
                        />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-6">
                <button
                  className={`w-full py-3 px-4 rounded-xl font-normal text-xs flex items-center justify-center gap-2 group transition-all duration-200 ${tier.buttonClass}`}
                >
                  <span>Choose This Plan</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
