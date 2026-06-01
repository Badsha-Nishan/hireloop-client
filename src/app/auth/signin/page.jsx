"use client";

import React, { useState } from "react";
import { authClient } from "@/lib/auth-client"; // Adjust this import path to match your better-auth client setup
import {
  ArrowRight,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Better Auth Sign In Submission Handler
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const { data, error: authError } = await authClient.signIn.email({
        email: formData.email,
        password: formData.password,
        // Better Auth automatically maps this session context back down to MongoDB
      });

      if (authError) {
        setError(authError.message || "Invalid email or password.");
        return;
      }

      setSuccess("Successfully signed in! Redirecting to dashboard...");
      // Optional: window.location.href = "/dashboard";
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
            Welcome Back
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-100">
            Sign in to Hireloop
          </h1>
          <p className="text-xs text-neutral-400 font-light">
            Continue matching with vetted tech opportunities.
          </p>
        </div>

        {/* Social Authentication */}
        <div className="space-y-3">
          <button
            type="button"
            className="w-full py-3 px-4 rounded-xl bg-white text-black text-xs font-medium flex items-center justify-center gap-3 hover:bg-neutral-200 transition-all duration-200"
          >
            {/* Google SVG Graphic */}
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
            >
              <path
                fill="#EA4335"
                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3A11.94 11.94 0 0 0 12 0C7.355 0 3.307 2.486 1.09 6.182l4.176 3.583Z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.275c0-.796-.073-1.564-.19-2.305H12v4.51h6.47c-.29 1.48-.114 2.73-.973 3.614l3.81 2.955c2.23-2.06 3.183-5.09 3.183-8.774Z"
              />
              <path
                fill="#FBBC05"
                d="M5.266 14.235A7.12 7.12 0 0 1 4.91 12c0-.79.123-1.55.356-2.265L1.09 6.15C.395 7.91 0 9.845 0 12s.395 4.09 1.09 5.85l4.176-3.615Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.97-1.075 7.964-2.92l-3.81-2.955c-1.055.71-2.405 1.13-4.154 1.13-3.227 0-5.964-2.18-6.94-5.11L.882 17.69C3.105 21.405 7.195 24 12 24Z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Separator Divider Lines */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-neutral-800/80"></div>
          <span className="px-3 text-[10px] text-neutral-500 uppercase tracking-widest font-medium">
            or email credentials
          </span>
          <div className="flex-grow border-t border-neutral-800/80"></div>
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

          {/* Password Field Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-medium text-neutral-400 tracking-wide uppercase block">
                Password
              </label>
              <button
                type="button"
                className="text-[11px] text-indigo-400 hover:underline hover:text-indigo-300 font-light bg-transparent border-0 p-0"
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

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

          {/* Remember Me Option */}
          <div className="flex items-center gap-2.5 pt-1">
            <input
              type="checkbox"
              id="remember"
              className="accent-indigo-500 h-3.5 w-3.5 border-neutral-800 bg-neutral-900 rounded opacity-80 cursor-pointer"
              disabled={isLoading}
            />
            <label
              htmlFor="remember"
              className="text-[11px] text-neutral-400 select-none cursor-pointer font-light"
            >
              Keep me signed in on this device
            </label>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-indigo-600 text-white font-medium text-xs flex items-center justify-center gap-2 group hover:bg-indigo-500 transition-all duration-200 shadow-lg shadow-indigo-600/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isLoading ? "Signing In..." : "Sign In"}</span>
              {!isLoading && (
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              )}
            </button>
          </div>
        </form>

        {/* Missing Accounts Navigation Redirect */}
        <div className="text-center pt-2">
          <p className="text-xs text-neutral-400 font-light">
            New to Hireloop?{" "}
            <button
              type="button"
              className="text-indigo-400 font-normal hover:underline hover:text-indigo-300 transition-all pl-0.5"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
