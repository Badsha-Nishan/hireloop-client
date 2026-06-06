"use client";

import React, { useState } from "react";
import {
  Form,
  Fieldset,
  TextField,
  Label,
  Input,
  Select,
  ListBox,
  TextArea,
  Button,
  toast,
} from "@heroui/react";
// Gravity UI Icons imports
import { Pin, ArrowUpToLine, Pencil } from "@gravity-ui/icons";
import { createCompany } from "@/lib/actions/companies";

export default function CompanyProfile() {
  // State management for logic flow
  const [company, setCompany] = useState(null); // Initial state: unregistered
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
    });

  // ImgBB Upload Handler
  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const base64 = await toBase64(file);

      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API}`,
        {
          method: "POST",
          body: new URLSearchParams({
            image: base64,
          }),
        }
      );

      // IMPORTANT: check response first
      const text = await res.text();
      console.log("ImgBB raw response:", text);

      const data = JSON.parse(text);

      if (data.success) {
        setLogoUrl(data.data.url);
      } else {
        console.error("Upload failed:", data);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Form Submission Strategy
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const companyData = {
      name: formData.get("companyName"),
      industry: formData.get("industry"),
      website: formData.get("websiteUrl"),
      location: formData.get("location"),
      employeeCount: formData.get("employeeCount"),
      description: formData.get("description"),
      logo: logoUrl || (company ? company.logo : ""),
      status: company ? company.status : "Pending", // Retain or set status
    };
    console.log(companyData);

    setCompany(companyData);

    const payload = await createCompany(companyData);

    console.log(payload);

    if (payload.insertedId) {
      toast.success("Company created successfully!");
    }

    setIsEditing(false);
  };

  // Status Badge Colors helper
  const getStatusStyle = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
  };

  // --- VIEW 1: UNREGISTERED STATE ---
  if (!company && !isEditing) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-zinc-950 border border-zinc-900 rounded-xl text-center shadow-2xl">
        <h2 className="text-xl font-semibold text-zinc-200 mb-2">
          No Company Registered
        </h2>
        <p className="text-sm text-zinc-400 mb-6">
          To start setup and hiring on HireLoop, please set up your business
          workspace details.
        </p>
        <Button
          onPress={() => {
            setLogoUrl("");
            setIsEditing(true);
          }}
          className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-6 h-11 transition-colors"
        >
          Register Company
        </Button>
      </div>
    );
  }

  // --- VIEW 2: DISPLAY REGISTERED DETAILS ---
  if (company && !isEditing) {
    return (
      <div className="max-w-2xl mx-auto my-8 p-8 bg-zinc-950 border border-zinc-900 rounded-xl shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-zinc-900">
          <div className="flex items-center gap-4">
            {company.logo ? (
              <img
                src={company.logo}
                alt="Logo"
                className="w-16 h-16 object-contain rounded-lg border border-zinc-800 bg-zinc-900 p-1"
              />
            ) : (
              <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center justify-center text-zinc-600 text-xs">
                No Logo
              </div>
            )}
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white">
                  {company.name}
                </h2>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full border ${getStatusStyle(
                    company.status
                  )}`}
                >
                  {company.status}
                </span>
              </div>
              <p className="text-sm text-zinc-400">
                {company.industry} • {company.employeeCount}
              </p>
            </div>
          </div>
          <Button
            variant="bordered"
            onPress={() => {
              setLogoUrl(company.logo);
              setIsEditing(true);
            }}
            className="border-zinc-800 text-zinc-300 hover:bg-zinc-900 rounded-lg px-4 h-9 text-xs flex items-center gap-2"
          >
            <Pencil size={14} /> Edit Profile
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-zinc-500 block text-xs uppercase tracking-wider">
              Website URL
            </span>
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline"
            >
              {company.website}
            </a>
          </div>
          <div>
            <span className="text-zinc-500 block text-xs uppercase tracking-wider">
              Location
            </span>
            <span className="text-zinc-300 flex items-center gap-1">
              <Pin size={14} className="text-zinc-500" /> {company.location}
            </span>
          </div>
        </div>

        <div>
          <span className="text-zinc-500 block text-xs uppercase tracking-wider mb-1">
            Brief Description
          </span>
          <p className="text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed">
            {company.description}
          </p>
        </div>
      </div>
    );
  }

  // --- VIEW 3: FORM DIALOG DIALECT (REGISTRATION & EDIT MODE) ---
  return (
    <div className="max-w-[600px] mx-auto my-8 bg-zinc-950 border border-zinc-900 rounded-xl shadow-2xl overflow-hidden">
      {/* Modal Header layout mimicking screenshot */}
      <div className="p-6 pb-4 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            {company ? "Update Company Details" : "Register New Company"}
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Enter your business details to start hiring on HireLoop.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          ✕
        </button>
      </div>

      <Form
        onSubmit={handleSubmit}
        validationBehavior="aria"
        className="p-6 pt-2 space-y-5"
      >
        <Fieldset className="space-y-4 w-full">
          {/* Row 1: Name and Industry */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              name="companyName"
              defaultValue={company?.name || ""}
              className="flex flex-col gap-1 w-full"
              isRequired
            >
              <Label className="text-zinc-400 font-medium text-xs">
                Company Name
              </Label>
              <Input
                placeholder="e.g. Acme Corp"
                className="bg-zinc-900/50 border-zinc-800 text-white rounded-lg"
              />
            </TextField>

            <Select
              name="industry"
              defaultSelectedKeys={[company?.industry || "technology"]}
              className="w-full"
            >
              <Label className="text-zinc-400 font-medium text-xs mb-1 block">
                Industry / Category
              </Label>
              <Select.Trigger className="bg-zinc-900/50 border-zinc-800 text-white rounded-lg">
                <Select.Value className="text-white placeholder:text-zinc-600" />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="outline-none bg-zinc-900 border border-zinc-800 text-zinc-200">
                  <ListBox.Item id="technology" textValue="Technology">
                    Technology
                  </ListBox.Item>
                  <ListBox.Item id="design" textValue="Design">
                    Design
                  </ListBox.Item>
                  <ListBox.Item id="marketing" textValue="Marketing">
                    Marketing
                  </ListBox.Item>
                  <ListBox.Item id="finance" textValue="Finance">
                    Finance
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          {/* Row 2: Website and Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextField
              name="websiteUrl"
              type="url"
              defaultValue={company?.website || ""}
              className="flex flex-col gap-1 w-full"
            >
              <Label className="text-zinc-400 font-medium text-xs">
                Website URL
              </Label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-zinc-600 text-xs select-none pointer-events-none z-10">
                  https://
                </span>
                <Input
                  placeholder="www.company.com"
                  className="pl-[54px] bg-zinc-900/50 border-zinc-800 text-white rounded-lg w-full"
                />
              </div>
            </TextField>

            <TextField
              name="location"
              defaultValue={company?.location || ""}
              className="flex flex-col gap-1 w-full relative"
            >
              <Label className="text-zinc-400 font-medium text-xs">
                Location
              </Label>
              <div className="relative flex items-center">
                <Pin
                  size={14}
                  className="absolute left-3 text-zinc-600 pointer-events-none z-10"
                />
                <Input
                  placeholder="City, Country"
                  className="pl-9 bg-zinc-900/50 border-zinc-800 text-white rounded-lg w-full"
                />
              </div>
            </TextField>
          </div>

          {/* Row 3: Employee Count and ImgBB Logo Upload Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <Select
              name="employeeCount"
              defaultSelectedKeys={[company?.employeeCount || "1-10 employees"]}
              className="w-full"
            >
              <Label className="text-zinc-400 font-medium text-xs mb-1 block">
                Employee Count Range
              </Label>
              <Select.Trigger className="bg-zinc-900/50 border-zinc-800 text-white rounded-lg">
                <Select.Value className="text-white" />
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="outline-none bg-zinc-900 border border-zinc-800 text-zinc-200">
                  <ListBox.Item id="1-10 employees" textValue="1-10 employees">
                    1-10 employees
                  </ListBox.Item>
                  <ListBox.Item
                    id="11-50 employees"
                    textValue="11-50 employees"
                  >
                    11-50 employees
                  </ListBox.Item>
                  <ListBox.Item
                    id="51-200 employees"
                    textValue="51-200 employees"
                  >
                    51-200 employees
                  </ListBox.Item>
                  <ListBox.Item id="201+ employees" textValue="201+ employees">
                    201+ employees
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>

            <div className="flex flex-col gap-1">
              <span className="text-zinc-400 font-medium text-xs">
                Company Logo
              </span>
              <label className="flex items-center gap-3 bg-zinc-900/30 border border-dashed border-zinc-800 rounded-lg p-3 cursor-pointer hover:bg-zinc-900/60 transition-colors group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <div className="bg-zinc-900 border border-zinc-800 rounded-md p-2 text-zinc-400 group-hover:text-zinc-200">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Logo view"
                      className="w-16 h-16 object-cover"
                    ></img>
                  ) : (
                    <ArrowUpToLine size={16} />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-zinc-300 font-medium">
                    {isUploading
                      ? "Uploading..."
                      : logoUrl
                      ? "Change image"
                      : "Upload image"}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    PNG, JPG up to 5MB
                  </span>
                </div>
              </label>
              {logoUrl && !isUploading && (
                <span className="text-[10px] text-emerald-400 truncate mt-0.5">
                  ✓ Uploaded effectively
                </span>
              )}
            </div>
          </div>

          {/* Row 4: Description */}
          <TextField
            name="description"
            defaultValue={company?.description || ""}
            className="flex flex-col gap-1 w-full"
          >
            <Label className="text-zinc-400 font-medium text-xs">
              Brief Description
            </Label>
            <TextArea
              placeholder="Tell us about your company's mission and culture..."
              rows={4}
              className="bg-zinc-900/50 border-zinc-800 text-white rounded-lg w-full p-2"
            />
          </TextField>
        </Fieldset>

        {/* Modal Style Actions Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-zinc-900 w-full">
          <Button
            type="button"
            variant="bordered"
            onPress={() => setIsEditing(false)}
            className="border-zinc-800 text-zinc-400 hover:bg-zinc-950 hover:text-zinc-200 rounded-lg px-5 text-xs font-medium h-9"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-white text-black font-semibold hover:bg-zinc-200 rounded-lg px-5 text-xs transition-colors h-9"
          >
            {company ? "Save Changes" : "Register Company"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
