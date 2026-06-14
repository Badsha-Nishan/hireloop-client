"use client";

import React, { useState } from "react";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";

import {
  ArrowRight,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [role, setRole] = useState("seeker");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Better Auth Submission Handler
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role,
      });

      if (authError) {
        setError(authError.message || "An authentication error occurred.");
        return;
      }

      setSuccess(
        "Account created successfully! Check your inbox or redirecting..."
      );
      setFormData({ name: "", email: "", password: "" });
      router.push(redirectTo);
    } catch (err) {
      setError("A network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Background Decorative Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-fuchsia-600/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Main Container Card */}
      <div className="relative z-10 w-full max-w-md bg-[#0c0c0c] border border-neutral-800/60 p-8 rounded-3xl shadow-2xl backdrop-blur-3xl space-y-6">
        {/* Page Top Branding & Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-xs text-indigo-400 px-3 py-1 rounded-full uppercase tracking-wider font-medium mb-1">
            <span className="h-1 w-1 bg-indigo-500 inline-block rounded-full"></span>
            Join Leverage
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-100">
            Create your account
          </h1>
          <p className="text-xs text-neutral-400 font-light">
            Start receiving smart job matches tailored for you.
          </p>
        </div>

        {/* Dynamic Status Notification Banners */}
        {error && (
          <div className="flex items-center gap-2.5 bg-red-950/40 border border-red-900/50 p-3.5 rounded-xl text-xs text-red-400 animate-in fade-in slide-in-from-top-2 duration-200">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2.5 bg-emerald-950/40 border border-emerald-900/50 p-3.5 rounded-xl text-xs text-emerald-400 animate-in fade-in slide-in-from-top-2 duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Form Fields */}
        <form className="space-y-4" onSubmit={onSubmit}>
          {/* Full Name Field Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-neutral-400 tracking-wide uppercase block">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="absolute left-4 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full bg-[#121212] border border-neutral-800/80 rounded-xl py-3 pl-11 pr-4 text-xs text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-700 focus:bg-[#141414] transition-all"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email Address Field Input */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-neutral-400 tracking-wide uppercase block">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="absolute left-4 w-4 h-4 text-neutral-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full bg-[#121212] border border-neutral-800/80 rounded-xl py-3 pl-11 pr-4 text-xs text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-700 focus:bg-[#141414] transition-all"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field Input with Show/Hide toggle */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-medium text-neutral-400 tracking-wide uppercase block">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="absolute left-4 w-4 h-4 text-neutral-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••••••"
                className="w-full bg-[#121212] border border-neutral-800/80 rounded-xl py-3 pl-11 pr-12 text-xs text-neutral-200 placeholder-neutral-600 outline-none focus:border-neutral-700 focus:bg-[#141414] transition-all"
                required
                disabled={isLoading}
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 p-0.5 text-neutral-500 hover:text-neutral-300 focus:outline-none transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Role Select */}
          <div className="flex flex-col gap-4">
            <Label>Tell us about you.</Label>
            <RadioGroup
              defaultValue="seeker"
              name="role"
              orientation="horizontal"
              onChange={(value) => setRole(value)}
            >
              <Radio value="seeker">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Seeker</Label>
                </Radio.Content>
              </Radio>
              <Radio value="recruiter">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Recruiter</Label>
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          {/* Terms Agreement Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="terms"
              className="mt-0.5 accent-indigo-500 h-3.5 w-3.5 border-neutral-800 bg-neutral-900 rounded opacity-80 cursor-pointer"
              required
              disabled={isLoading}
            />
            <label
              htmlFor="terms"
              className="text-[11px] leading-tight text-neutral-400 select-none cursor-pointer font-light"
            >
              I agree to the{" "}
              <span className="text-neutral-300 underline hover:text-white transition-colors">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-neutral-300 underline hover:text-white transition-colors">
                Privacy Policy
              </span>
              .
            </label>
          </div>

          {/* Finalize Account Submit Trigger */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 text-white font-medium text-xs flex items-center justify-center gap-2 group hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-600/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>
                {isLoading ? "Creating Account..." : "Create Account"}
              </span>
              {!isLoading && (
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              )}
            </button>
          </div>
        </form>

        {/* Existing Accounts Routing */}
        <div className="text-center pt-2">
          <p className="text-xs text-neutral-400 font-light">
            Already have an account?{" "}
            <Link
              href={`/auth/signin?redirect=${redirectTo}`}
              type="button"
              className="text-indigo-400 font-normal hover:underline hover:text-indigo-300 transition-all pl-0.5"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
