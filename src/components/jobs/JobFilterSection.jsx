// @/components/jobs/JobFilterSection.jsx
"use client";

import React from "react";
import { Select, Label, ListBox } from "@heroui/react";
import { Magnifier, Briefcase, MapPin } from "@gravity-ui/icons";

export default function JobFilterSection({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedLocation,
  setSelectedLocation,
  uniqueLocations,
  uniqueTypes,
}) {
  return (
    <div className="w-full bg-background border border-default-100 rounded-2xl p-5 shadow-sm flex flex-col gap-4 md:flex-row md:items-end">
      {/* Search Bar Input */}
      <div className="flex-1 flex flex-col gap-1.5">
        <label
          htmlFor="search"
          className="text-small font-medium text-foreground"
        >
          Search Jobs
        </label>
        <div className="relative w-full">
          <Magnifier
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-default-400 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="search"
            type="text"
            placeholder="Search by title, company, or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-small bg-default-50 border border-default-200 rounded-xl focus:outline-none focus:border-primary text-foreground placeholder:text-default-400 transition-colors"
          />
        </div>
      </div>

      {/* Hero UI Select: Job Type */}
      <div className="w-full md:w-[200px]">
        <Select
          value={selectedType}
          onChange={setSelectedType}
          placeholder="All Types"
        >
          <Label className="text-small font-medium text-foreground mb-1.5 block">
            Job Type
          </Label>
          <Select.Trigger className="w-full flex items-center justify-between rounded-xl border border-default-200 bg-default-50 p-2 text-small text-foreground">
            <div className="flex items-center gap-2">
              <Briefcase className="size-4 text-default-400" />
              <Select.Value />
            </div>
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="bg-background border border-default-100 rounded-xl shadow-lg mt-1">
            <ListBox>
              <ListBox.Item
                id="all"
                textValue="All Types"
                className="text-small p-2 hover:bg-default-100 rounded-lg cursor-pointer"
              >
                All Types
              </ListBox.Item>
              {uniqueTypes.map((type) => (
                <ListBox.Item
                  key={type}
                  id={type}
                  textValue={type}
                  className="text-small p-2 hover:bg-default-100 rounded-lg capitalize cursor-pointer"
                >
                  {type}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>

      {/* Hero UI Select: Location */}
      <div className="w-full md:w-[200px]">
        <Select
          value={selectedLocation}
          onChange={setSelectedLocation}
          placeholder="All Locations"
        >
          <Label className="text-small font-medium text-foreground mb-1.5 block">
            Location
          </Label>
          <Select.Trigger className="w-full flex items-center justify-between rounded-xl border border-default-200 bg-default-50 p-2 text-small text-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-default-400" />
              <Select.Value />
            </div>
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="bg-background border border-default-100 rounded-xl shadow-lg mt-1">
            <ListBox>
              <ListBox.Item
                id="all"
                textValue="All Locations"
                className="text-small p-2 hover:bg-default-100 rounded-lg cursor-pointer"
              >
                All Locations
              </ListBox.Item>
              {uniqueLocations.map((loc) => (
                <ListBox.Item
                  key={loc}
                  id={loc}
                  textValue={loc}
                  className="text-small p-2 hover:bg-default-100 rounded-lg cursor-pointer"
                >
                  {loc}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
}
