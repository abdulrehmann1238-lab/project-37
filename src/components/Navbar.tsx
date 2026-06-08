"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, LogIn, Laptop } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Hide main navbar on dashboard and admin paths
  const isDashboardOrAdmin = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  if (isDashboardOrAdmin) return null;

  const links = [
    { name: "Marketplace", path: "/marketplace" },
    { name: "Pricing", path: "/pricing" },
    { name: "About Story", path: "/about" },
    { name: "Help Desk", path: "/help" },
    { name: "Support Chat", path: "/support" }
  ];

  return (
    <nav className="fixed top-4 left-4 right-4 z-30 transition-all duration-300">
      <div className="max-w-7xl mx-auto glass-panel px-4 sm:px-6 lg:px-8 py-3 rounded-full flex items-center justify-between shadow-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 shrink-0 select-none">
          <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center shadow-md shadow-brand-navy/10">
            <span className="text-brand-warm-white font-bold text-sm">S</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-brand-navy">
            Spot<span className="text-brand-teal">Reserve</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {links.map((link, idx) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={idx}
                href={link.path}
                className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                  isActive ? "text-brand-teal" : "text-brand-slate hover:text-brand-navy"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Link
            href="/dashboard"
            className="flex items-center space-x-1 px-4 py-2 rounded-full border border-brand-navy/10 hover:border-brand-navy/20 bg-brand-cream/40 text-xs font-semibold text-brand-navy transition-all duration-200"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Truck Owner Portal</span>
          </Link>
          <Link
            href="/admin"
            className="flex items-center space-x-1 px-4 py-2 rounded-full bg-brand-navy hover:bg-brand-navy-light text-xs font-semibold text-brand-warm-white transition-all duration-200"
          >
            <Laptop className="w-3.5 h-3.5 text-brand-teal" />
            <span>Admin Shell</span>
            <ArrowUpRight className="w-3 h-3 text-brand-teal" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-full hover:bg-brand-cream-dark/40 text-brand-navy focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-1 glass-panel rounded-2xl p-4 shadow-xl border border-brand-navy/5">
          <div className="flex flex-col space-y-3">
            {links.map((link, idx) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={idx}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    isActive ? "bg-brand-teal/10 text-brand-teal" : "text-brand-slate hover:bg-brand-cream-dark/20"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="border-t border-brand-navy/5 pt-3 flex flex-col space-y-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-full border border-brand-navy/10 bg-brand-cream/40 text-xs font-semibold text-brand-navy"
              >
                <LogIn className="w-4 h-4" />
                <span>Truck Owner Portal</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-full bg-brand-navy text-xs font-semibold text-brand-warm-white"
              >
                <Laptop className="w-4 h-4 text-brand-teal" />
                <span>Admin Shell</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-brand-teal" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
