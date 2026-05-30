"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@heroui/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    {
      label: "Find Jobs",
      href: "/jobs",
    },
    {
      label: "Companies",
      href: "/companies",
    },
    {
      label: "For Recruiters",
      href: "/recruiters",
    },
    {
      label: "Career Resources",
      href: "/resources",
    },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-4 py-5">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-[#111111]/80 px-6 py-4 backdrop-blur-xl">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500">
              <span className="text-xl font-bold text-white">H</span>
            </div>

            <div>
              <h1 className="text-xl font-bold text-white">HireLoop</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Menu */}
            <div className="flex items-center gap-10 rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-300 transition-all duration-300 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-white/20" />

            {/* Sign In */}
            <Link
              href="/login"
              className="text-base font-medium text-violet-400 transition hover:text-violet-300"
            >
              Sign In
            </Link>

            {/* CTA Button */}
            <Button
              as={Link}
              href="/register"
              className="h-14 rounded-2xl bg-white px-8 text-base font-semibold text-black hover:bg-gray-100"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white text-2xl"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mt-3 overflow-hidden rounded-3xl border border-white/10 bg-[#111111]/95 backdrop-blur-xl lg:hidden">
            <div className="flex flex-col p-6">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-white/10 py-4 text-gray-300 transition hover:text-white"
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/login"
                className="mt-4 py-3 text-center text-violet-400"
              >
                Sign In
              </Link>

              <Button
                as={Link}
                href="/register"
                className="mt-4 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
