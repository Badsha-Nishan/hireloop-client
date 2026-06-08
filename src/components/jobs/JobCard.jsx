"use client";
import React from "react";
import { Card, Link } from "@heroui/react";
import {
  Briefcase,
  MapPin,
  CircleDollar,
  ArrowUpRight,
} from "@gravity-ui/icons";

export default function JobCard({ job }) {
  // Destructure the needed data from the job prop
  const {
    jobTitle,
    jobType,
    minSalary,
    maxSalary,
    currency,
    location,
    companyName,
    companyLogo,
    _id,
  } = job;

  // Format salary display (e.g., $100k - $150k if the values imply thousands, or just raw numbers)
  const salaryDisplay = `${
    currency === "USD" ? "$" : ""
  }${minSalary} - ${maxSalary}`;

  return (
    <Card className="w-full max-w-[420px] p-5 border border-default-100 shadow-sm hover:shadow-md transition-shadow bg-background">
      {/* Header Section: Company Logo, Name & Title */}
      <Card.Header className="flex flex-col items-start gap-4 p-0 pb-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-default-50 flex items-center justify-center p-2 border border-default-200 overflow-hidden">
              <img
                src={companyLogo}
                alt={`${companyName} logo`}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-small text-default-500 font-medium">
                {companyName}
              </span>
              <Card.Title className="text-xl font-bold tracking-tight text-foreground mt-0.5">
                {jobTitle}
              </Card.Title>
            </div>
          </div>
        </div>
      </Card.Header>

      <hr className="border-default-100 my-0" />

      {/* Description/Body Section: Job Metadata Badges */}
      <div className="py-4 flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-default-600 text-small">
          <Briefcase className="size-4 text-default-400" aria-hidden="true" />
          <span className="capitalize">{jobType}</span>
        </div>

        <div className="flex items-center gap-2 text-default-600 text-small">
          <MapPin className="size-4 text-default-400" aria-hidden="true" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2 text-default-600 text-small font-medium">
          <CircleDollar className="size-4 text-success" aria-hidden="true" />
          <span>{salaryDisplay} / year</span>
        </div>
      </div>

      <hr className="border-default-100 my-0" />

      {/* Footer Section: Action Link */}
      <Card.Footer className="flex justify-end p-0 pt-4">
        <Link
          aria-label={`Apply for ${jobTitle} at ${companyName} (opens in new tab)`}
          href={`/jobs/${_id?.$oid || _id}`} // Fallback for standard or mongo-style ID string
          rel="noopener noreferrer"
          className="text-primary font-semibold flex items-center gap-1 hover:underline"
        >
          Apply Now
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </Card.Footer>
    </Card>
  );
}
