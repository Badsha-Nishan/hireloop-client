"use client";

import { useState } from "react";

// Pricing Data matching Screenshot 2026-06-15 124729.png
const pricingData = {
  seekers: [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Essential tools to get your job search started.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile visibility",
        "Email alerts for new matches",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Perfect for active job seekers looking to level up.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Full application tracking system",
        "Exclusive salary insights",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
    {
      name: "Premium",
      price: "$39",
      period: "/month",
      description: "Maximum visibility and unlimited applications.",
      features: [
        "Everything in Pro + unlimited applications",
        "Profile boost directly to recruiters",
        "Early access to new job listings",
        "Priority 24/7 customer support",
      ],
      cta: "Go Premium",
      popular: false,
    },
  ],
  recruiters: [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Great for a company's first year of hiring.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management tools",
        "Standard listing visibility",
      ],
      cta: "Post a Job Free",
      popular: false,
    },
    {
      name: "Growth",
      price: "$49",
      period: "/month",
      description: "Scale your team with comprehensive tracking tools.",
      features: [
        "Up to 10 active job posts",
        "Advanced applicant tracking (ATS)",
        "Basic performance analytics",
        "Email support",
      ],
      cta: "Choose Growth",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "/month",
      description: "Built for high-volume hiring and collaborative teams.",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics dashboard",
        "Featured job listings (higher visibility)",
        "Team collaboration tools",
        "Custom company branding",
        "Priority dedicated support",
      ],
      cta: "Contact Enterprise",
      popular: false,
    },
  ],
};

const faqs = [
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, absolutely. You can cancel your subscription at any time directly from your account settings. You will retain access to your premium features until the end of your current billing cycle.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a 14-day money-back guarantee if you are not satisfied with your Pro, Premium, or Recruiter growth tiers. Just reach out to our support team.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) and payment via Stripe for secure, encrypted processing.",
  },
  {
    question: "Can I switch between plans later?",
    answer:
      "Of course. You can upgrade or downgrade your plan at any time. When upgrading, your new features are unlocked immediately and charges will be prorated.",
  },
];

export default function PricingPage() {
  const [userType, setUserType] = useState("seekers");
  const [openFaq, setOpenFaq] = useState(null);

  const currentPlans = pricingData[userType];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-20 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Flexible Pricing for Hireloop
        </h1>
        <p className="mt-4 text-xl text-slate-400">
          Choose the plan that fits your goals, whether you are hunting for your
          dream job or building a world-class team.
        </p>

        {/* Toggle Switch */}
        <div className="mt-10 flex justify-center">
          <div className="relative flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setUserType("seekers")}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                userType === "seekers"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              For Job Seekers
            </button>
            <button
              onClick={() => setUserType("recruiters")}
              className={`px-6 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                userType === "recruiters"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              For Recruiters
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-3 items-stretch px-2">
        {currentPlans.map((plan, index) => (
          <div
            key={index}
            className={`relative flex flex-col justify-between bg-slate-900 rounded-2xl p-8 border transition-all duration-300 hover:translate-y-[-4px] ${
              plan.popular
                ? "border-blue-500 shadow-xl shadow-blue-950/40 ring-1 ring-blue-500"
                : "border-slate-800 hover:border-slate-700"
            }`}
          >
            {plan.popular && (
              <span className="absolute top-0 right-6 transform -translate-y-1/2 bg-blue-500 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                Most Popular
              </span>
            )}

            <div>
              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
              <p className="mt-2 text-sm text-slate-400 h-10">
                {plan.description}
              </p>

              <div className="mt-6 flex items-baseline text-white">
                <span className="text-5xl font-extrabold tracking-tight">
                  {plan.price}
                </span>
                <span className="ml-1 text-xl font-semibold text-slate-400">
                  {plan.period}
                </span>
              </div>

              {/* Feature List */}
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg
                        className="h-5 w-5 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-sm text-slate-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <button
                className={`w-full py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg"
                    : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Accordion Section */}
      <div className="max-w-3xl mx-auto mt-28">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex justify-between items-center p-5 text-left text-white font-medium hover:bg-slate-800/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                      isOpen ? "transform rotate-180 text-blue-400" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-40 border-t border-slate-800" : "max-h-0"
                  }`}
                >
                  <p className="p-5 text-sm text-slate-400 leading-relaxed bg-slate-950/40">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
