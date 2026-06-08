"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShieldAlert,
  Map,
  CalendarRange,
  BarChart4,
  Compass,
  Menu,
  X,
  ChevronRight,
  BellRing,
  Laptop
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: "Admin Overview", path: "/admin", icon: <ShieldAlert className="w-4.5 h-4.5" /> },
    { name: "Manage Locations", path: "/admin/locations", icon: <Map className="w-4.5 h-4.5" /> },
    { name: "Reservation Activity", path: "/admin/reservations", icon: <CalendarRange className="w-4.5 h-4.5" /> },
    { name: "Revenue Reports", path: "/admin/revenue", icon: <BarChart4 className="w-4.5 h-4.5" /> }
  ];

  return (
    <div className="flex h-screen bg-brand-sand overflow-hidden text-brand-navy">
      {/* 1. Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 border-r border-brand-navy/10 bg-brand-navy text-slate-300 shrink-0 select-none">
        {/* Logo */}
        <div className="p-6 border-b border-white/10 bg-black/15">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <div>
              <span className="text-sm font-extrabold text-white block tracking-tight">SpotReserve</span>
              <span className="text-[9px] text-brand-teal font-extrabold uppercase font-mono tracking-widest block">Admin Console</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {menuItems.map((item, idx) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={idx}
                href={item.path}
                className={`flex items-center justify-between text-xs px-3.5 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-white/10 text-white font-semibold shadow-md"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={isActive ? "text-brand-teal" : "text-slate-400"}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-brand-teal shrink-0" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer shortcuts */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-black/15">
          <Link
            href="/marketplace"
            className="flex items-center space-x-2.5 text-xs text-slate-300 hover:text-white font-semibold px-3 py-2"
          >
            <Compass className="w-4 h-4 text-brand-teal" />
            <span>Marketplace Map</span>
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center space-x-2.5 text-xs text-slate-300 hover:text-white font-semibold px-3 py-2"
          >
            <Laptop className="w-4 h-4 text-brand-blue" />
            <span>Owner Portal</span>
          </Link>
        </div>
      </aside>

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header bar */}
        <header className="h-16 border-b border-brand-navy/10 bg-white flex items-center justify-between px-6 shrink-0 relative z-20">
          <div className="flex items-center space-x-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-full hover:bg-brand-cream text-brand-navy focus:outline-none"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="hidden sm:inline-block text-xs font-bold text-brand-slate uppercase font-mono tracking-wider">
              ENTERPRISE PLATFORM ADMIN
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <span className="flex h-2 w-2 absolute top-0.5 right-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
              </span>
              <BellRing className="w-4.5 h-4.5 text-brand-navy" />
            </div>

            <div className="flex items-center space-x-2 border-l border-brand-navy/10 pl-4">
              <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-xs font-bold text-white shadow-sm">
                A
              </div>
              <span className="hidden sm:inline-block text-xs font-bold text-brand-navy">SysAdmin</span>
            </div>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-grow overflow-y-auto bg-brand-sand">
          {children}
        </main>
      </div>

      {/* 3. Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden flex select-none">
          <div className="fixed inset-0 bg-brand-navy/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <aside className="relative flex flex-col w-64 bg-brand-navy text-slate-300 h-full p-4 justify-between">
            <div className="space-y-6">
              {/* Logo & close */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-teal flex items-center justify-center">
                    <span className="text-white font-bold text-sm">S</span>
                  </div>
                  <div>
                    <span className="text-sm font-extrabold text-white block">SpotReserve</span>
                    <span className="text-[9px] text-brand-teal font-extrabold block">Admin Console</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-white/5 text-slate-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation list */}
              <nav className="space-y-1">
                {menuItems.map((item, idx) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={idx}
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 text-xs px-3.5 py-3 rounded-xl transition-all ${
                        isActive
                          ? "bg-white/10 text-white font-semibold"
                          : "text-slate-300 hover:bg-white/5"
                      }`}
                    >
                      <span className={isActive ? "text-brand-teal" : "text-slate-400"}>
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer shortcuts */}
            <div className="space-y-2 border-t border-white/10 pt-4">
              <Link
                href="/marketplace"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2.5 text-xs text-slate-300 font-semibold px-3 py-2"
              >
                <Compass className="w-4 h-4 text-brand-teal" />
                <span>Marketplace Map</span>
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2.5 text-xs text-slate-300 font-semibold px-3 py-2"
              >
                <Laptop className="w-4 h-4 text-brand-blue" />
                <span>Owner Portal</span>
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
