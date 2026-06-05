"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Textarea,
  Select,
  Switch,
  Button,
  Label,
} from "@heroui/react";

import { Briefcase, Globe } from "@gravity-ui/icons";

export default function PostJobForm() {
  const [isRemote, setIsRemote] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    const payload = {
      ...data,
      isRemote,
    };

    console.log("JOB DATA:", payload);

    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 1000));
      alert("Job posted successfully!");
      e.target.reset();
      setIsRemote(false);
    } catch (err) {
      alert("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0e] text-white flex justify-center p-6">
      <div className="w-full max-w-4xl bg-[#121214] border border-zinc-900 rounded-2xl p-8">
        {/* HEADER */}
        <div className="border-b border-zinc-800 pb-5 mb-6">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-zinc-400" />
            <h1 className="text-xl font-semibold">Post a New Job</h1>
          </div>
          <p className="text-sm text-zinc-400 mt-1">
            Create job listings for recruiters
          </p>
        </div>

        {/* FORM */}
        <Form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Title */}
          <div>
            <Label>Job Title</Label>
            <Input name="jobTitle" placeholder="Senior Developer" />
          </div>

          {/* Category + Type (SAFE: native select) */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <select
                name="category"
                className="w-full bg-black border border-zinc-800 rounded-lg p-2"
              >
                <option value="engineering">Engineering</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="sales">Sales</option>
              </select>
            </div>

            <div>
              <Label>Job Type</Label>
              <select
                name="type"
                className="w-full bg-black border border-zinc-800 rounded-lg p-2"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
          </div>

          {/* Salary */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 grid grid-cols-2 gap-3">
              <Input name="minSalary" type="number" placeholder="Min Salary" />
              <Input name="maxSalary" type="number" placeholder="Max Salary" />
            </div>

            <select
              name="currency"
              className="w-full bg-black border border-zinc-800 rounded-lg p-2"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="BDT">BDT</option>
            </select>
          </div>

          {/* Location + Remote */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between mb-1">
                <Label>Location</Label>

                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  Remote
                  <Switch isSelected={isRemote} onValueChange={setIsRemote} />
                </div>
              </div>

              <div className="relative">
                <Globe className="absolute left-3 top-3 w-4 h-4 text-zinc-600" />
                <Input
                  name="location"
                  placeholder={isRemote ? "Remote / Global" : "City, Country"}
                  disabled={isRemote}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Label>Deadline</Label>
              <Input type="date" name="deadline" />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label>Responsibilities</Label>
            <Textarea name="responsibilities" rows={4} />
          </div>

          <div>
            <Label>Requirements</Label>
            <Textarea name="requirements" rows={4} />
          </div>

          <div>
            <Label>Benefits</Label>
            <Textarea name="benefits" rows={3} />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-800">
            <Button type="button" variant="bordered">
              Cancel
            </Button>

            <Button type="submit" isLoading={loading}>
              Post Job
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
