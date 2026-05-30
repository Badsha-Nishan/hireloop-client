"use client";

import Link from "next/link";
import { FaFacebookF, FaPinterestP, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500">
                <span className="text-xl font-bold text-white">H</span>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-white">HireHub</h2>
              </div>
            </Link>

            <p className="max-w-xs leading-8">
              The AI-powered hiring platform connecting talented professionals
              with top employers worldwide.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-4">
              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 hover:bg-violet-600 transition"
              >
                <FaFacebookF className="text-lg text-white" />
              </Link>

              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 hover:bg-violet-700 transition"
              >
                <FaPinterestP className="text-lg text-white" />
              </Link>

              <Link
                href="#"
                className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 hover:bg-violet-600 transition"
              >
                <FaLinkedinIn className="text-lg text-white" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-violet-500">
              Product
            </h3>

            <ul className="space-y-4">
              <li>
                <Link href="/jobs" className="hover:text-white transition">
                  Job Discovery
                </Link>
              </li>

              <li>
                <Link
                  href="/ai-matching"
                  className="hover:text-white transition"
                >
                  AI Matching
                </Link>
              </li>

              <li>
                <Link href="/companies" className="hover:text-white transition">
                  Companies
                </Link>
              </li>

              <li>
                <Link
                  href="/salary-guide"
                  className="hover:text-white transition"
                >
                  Salary Data
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-violet-500">
              Navigation
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/help-center"
                  className="hover:text-white transition"
                >
                  Help Center
                </Link>
              </li>

              <li>
                <Link
                  href="/career-library"
                  className="hover:text-white transition"
                >
                  Career Library
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-violet-500">
              Resources
            </h3>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/brand-guidelines"
                  className="hover:text-white transition"
                >
                  Brand Guidelines
                </Link>
              </li>

              <li>
                <Link href="/newsroom" className="hover:text-white transition">
                  Newsroom
                </Link>
              </li>

              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-20 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-sm md:flex-row">
          <p>© {new Date().getFullYear()} HireHub. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/terms" className="hover:text-white transition">
              Terms & Conditions
            </Link>

            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>

            <Link href="/cookies" className="hover:text-white transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
