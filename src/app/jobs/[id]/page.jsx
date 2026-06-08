import React from "react";
import { getJobById } from "@/lib/api/jobs";
import {
  Briefcase,
  MapPin,
  CircleDollar,
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Gift,
} from "@gravity-ui/icons";
import Link from "next/link";

const JobDetailPage = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-foreground">
          Job listing not found
        </h2>
        <p className="text-default-500 mt-2">
          The listing you are looking for might have expired or been removed.
        </p>
        <Link
          href="/jobs"
          className="mt-4 inline-flex items-center gap-1 text-primary text-small font-medium"
        >
          <ArrowLeft className="size-4" /> Back to listings
        </Link>
      </div>
    );
  }

  const {
    jobTitle,
    jobType,
    minSalary,
    maxSalary,
    currency,
    location,
    responsibilities,
    requirements,
    benefits,
    companyName,
    companyLogo,
  } = job;

  const salaryDisplay = `${
    currency === "USD" ? "$" : ""
  }${minSalary} - ${maxSalary}`;

  // Reusable styling utility classes matching Hero UI's Button component styles
  const buttonStyle =
    "inline-flex items-center justify-center gap-2 bg-[#006fee] hover:bg-[#005bc4] text-white font-semibold text-medium px-6 h-12 rounded-full shadow-sm transition-colors";

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Back navigation action link */}
      <div className="mb-6">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-1 text-default-500 hover:text-foreground text-small transition-colors"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to all jobs
        </Link>
      </div>

      {/* Hero Header Section */}
      <div className="bg-background border border-default-100 rounded-2xl p-6 sm:p-8 shadow-sm mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-default-50 flex items-center justify-center p-3 border border-default-200 overflow-hidden flex-shrink-0">
            <img
              src={companyLogo}
              alt={`${companyName} logo`}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-medium text-default-500 font-medium">
              {companyName}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-1">
              {jobTitle}
            </h1>
          </div>
        </div>

        {/* Desktop Primary Call To Action - Replaced with regular styled anchor link */}
        <div className="sm:block hidden">
          <Link href={`/jobs/${id}/apply`} className={buttonStyle}>
            Apply Now
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Layout Split Grid Structure */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Aspect: Descriptive Data Sheets */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div>
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <ShieldCheck className="size-5 text-primary" /> Responsibilities
            </h2>
            <div className="bg-background border border-default-100 rounded-xl p-5 text-default-600 text-medium leading-relaxed shadow-sm">
              {responsibilities}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Briefcase className="size-5 text-primary" /> Requirements
            </h2>
            <div className="bg-background border border-default-100 rounded-xl p-5 text-default-600 text-medium leading-relaxed shadow-sm whitespace-pre-line">
              {requirements}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Gift className="size-5 text-primary" /> Benefits & Perks
            </h2>
            <div className="bg-background border border-default-100 rounded-xl p-5 text-default-600 text-medium leading-relaxed shadow-sm">
              {benefits}
            </div>
          </div>
        </div>

        {/* Right Aspect: Contextual Meta Sidebar */}
        <div className="flex flex-col gap-6">
          <div className="bg-background border border-default-100 rounded-2xl p-6 shadow-sm flex flex-col gap-5 sticky top-6">
            <h3 className="font-bold text-foreground text-medium">
              Job Overview
            </h3>

            <hr className="border-default-100 my-0" />

            <div className="flex items-start gap-3">
              <MapPin className="size-5 text-default-400 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs text-default-400 font-medium uppercase tracking-wider">
                  Location
                </span>
                <span className="text-medium font-semibold text-foreground mt-0.5">
                  {location}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase className="size-5 text-default-400 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs text-default-400 font-medium uppercase tracking-wider">
                  Job Type
                </span>
                <span className="text-medium font-semibold text-foreground capitalize mt-0.5">
                  {jobType}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CircleDollar className="size-5 text-success mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs text-default-400 font-medium uppercase tracking-wider">
                  Salary Range
                </span>
                <span className="text-medium font-semibold text-foreground mt-0.5">
                  {salaryDisplay} / year
                </span>
              </div>
            </div>

            <hr className="border-default-100 my-1" />

            {/* Mobile / Persistent Sidebar Call to Action - Replaced with regular styled anchor link */}
            <Link
              href={`/jobs/${id}/apply`}
              className={`${buttonStyle} w-full sm:hidden lg:flex`}
            >
              Apply For This Position
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
