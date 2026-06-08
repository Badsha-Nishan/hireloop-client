// @/components/jobs/JobContainer.jsx
"use client";

import React, { useState, useMemo } from "react";
import JobCard from "@/components/jobs/JobCard";
import JobFilterSection from "@/components/jobs/JobFilterSection";

export default function JobContainer({ initialJobs = [] }) {
  // 1. Setup Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  // 2. Extract unique select options dynamically from the fetched server dataset
  const uniqueTypes = useMemo(() => {
    return [...new Set(initialJobs.map((job) => job.jobType).filter(Boolean))];
  }, [initialJobs]);

  const uniqueLocations = useMemo(() => {
    return [...new Set(initialJobs.map((job) => job.location).filter(Boolean))];
  }, [initialJobs]);

  // 3. Multi-criteria Dynamic Filtering
  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const title = job.jobTitle?.toLowerCase() || "";
      const company = job.companyName?.toLowerCase() || "";
      const reqs = job.requirements?.toLowerCase() || "";
      const search = searchQuery.toLowerCase();

      const matchesSearch =
        title.includes(search) ||
        company.includes(search) ||
        reqs.includes(search);

      const matchesType =
        selectedType === "all" || !selectedType || job.jobType === selectedType;
      const matchesLocation =
        selectedLocation === "all" ||
        !selectedLocation ||
        job.location === selectedLocation;

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [searchQuery, selectedType, selectedLocation, initialJobs]);

  return (
    <div className="flex flex-col gap-8">
      {/* Search and Dropdowns Filter bar */}
      <JobFilterSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        uniqueLocations={uniqueLocations}
        uniqueTypes={uniqueTypes}
      />

      {/* 3-Column Responsive Grid Layout Output */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job._id?.$oid || job._id} job={job} />
          ))}
        </div>
      ) : (
        /* Empty State Fallback */
        <div className="text-center py-16 bg-default-50 rounded-2xl border border-dashed border-default-200">
          <p className="text-default-500 font-medium">
            No active job listings match your selected filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedType("all");
              setSelectedLocation("all");
            }}
            className="text-primary mt-2 text-small font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
