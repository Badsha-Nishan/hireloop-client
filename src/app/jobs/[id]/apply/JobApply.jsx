"use client";

import React from "react";
import {
  Form,
  Button,
  TextField,
  Label,
  Input,
  Description,
  FieldError,
} from "@heroui/react";
import { submitApplication } from "@/lib/actions/applications";

const JobApply = ({ job, applicant }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Easily extract values using standard FormData
    const formData = new FormData(e.currentTarget);
    const data = {
      resumeUrl: formData.get("resumeUrl"),
      coverLetter: formData.get("coverLetter"),
      portfolioUrl: formData.get("portfolioUrl"),
      jobId: job?._id,
      jobTitle: job?.jobTitle,
      companyName: job?.companyName,
      applicantId: applicant?.id,
      applicantName: applicant?.name,
      applicantEmail: applicant?.email,
    };

    console.log("Submitting application for:", job?.title, data);
    // Handle your submission logic here (e.g., API call)
    const res = await submitApplication(data);
    if (res.insertedId) {
      alert("Application Submitted Successfully!");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-neutral-200">
      {/* Header section pre-populated with your existing job info */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-neutral-900">
          Apply for {job?.title || "Position"}
        </h2>
        {job?.department && (
          <p className="text-sm text-neutral-500 mt-1">{job.department}</p>
        )}
        {applicant?.name && (
          <p className="text-xs text-neutral-400 mt-2">
            Applying as: <span className="font-medium">{applicant.name}</span> (
            {applicant.email})
          </p>
        )}
      </div>

      {/* Hero UI Form Component */}
      <Form onSubmit={handleSubmit} className="space-y-5">
        {/* REQUIRED: Resume Link Field */}
        <TextField name="resumeUrl" isRequired type="url" className="w-full">
          <Label className="text-sm font-semibold text-neutral-700">
            Resume Link
          </Label>
          <Input
            placeholder="https://dropbox.com/s/your-resume.pdf"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Description className="text-xs text-neutral-400 mt-1">
            Please provide a public link to your resume (Google Drive, Dropbox,
            Notion, etc.)
          </Description>
          <FieldError className="text-xs text-danger-500 mt-1">
            Please enter a valid website URL.
          </FieldError>
        </TextField>

        {/* OPTIONAL: Portfolio/Website Link */}
        <TextField name="portfolioUrl" type="url" className="w-full">
          <Label className="text-sm font-semibold text-neutral-700">
            Portfolio or LinkedIn Link (Optional)
          </Label>
          <Input
            placeholder="https://linkedin.com/in/username"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Description className="text-xs text-neutral-400 mt-1">
            Link to your personal website, GitHub, or LinkedIn profile.
          </Description>
          <FieldError className="text-xs text-danger-500 mt-1">
            Please enter a valid URL.
          </FieldError>
        </TextField>

        {/* OPTIONAL: Additional Notes / Short Cover Letter */}
        <TextField name="coverLetter" className="w-full">
          <Label className="text-sm font-semibold text-neutral-700">
            Additional Information (Optional)
          </Label>
          <Input
            placeholder="Anything else you'd like us to know?"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Description className="text-xs text-neutral-400 mt-1">
            Max 500 characters.
          </Description>
          <FieldError className="text-xs text-danger-500 mt-1" />
        </TextField>

        {/* Form Actions */}
        <div className="flex gap-3 pt-2 justify-end">
          <Button
            type="reset"
            className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-700 bg-transparent hover:bg-neutral-50 transition-colors"
          >
            Clear Form
          </Button>
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Submit Application
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default JobApply;
