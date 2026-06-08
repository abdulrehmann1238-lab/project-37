"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  History,
  TrendingUp,
  Bell,
  User,
  Users,
  Compass,
  Menu,
  X,
  ChevronRight,
  Laptop,
} from "lucide-react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const menuItems = [
    {
      name: "Overview",
      path: "/dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      name: "Upcoming Bookings",
      path: "/dashboard/upcoming",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      name: "Booking History",
      path: "/dashboard/history",
      icon: <History className="w-4 h-4" />,
    },
    {
      name: "Revenue Analytics",
      path: "/dashboard/revenue",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      name: "Availability Calendar",
      path: "/dashboard/calendar",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      name: "Notifications",
      path: "/dashboard/notifications",
      icon: <Bell className="w-4 h-4" />,
    },
    {
      name: "Truck Owner Profile",
      path: "/dashboard/profile",
      icon: <User className="w-4 h-4" />,
    },
    {
      name: "Team Management",
      path: "/dashboard/team",
      icon: <Users className="w-4 h-4" />,
    },
  ];

  const notifications = [
    {
      text: "Pier 14 booking confirmed for June 12.",
      time: "2 hours ago",
      unread: true,
    },
    {
      text: "Payment of $195.00 completed successfully.",
      time: "2 hours ago",
      unread: false,
    },
    {
      text: "Electrical Hookup maintenance scheduled at Soma Plaza.",
      time: "1 day ago",
      unread: false,
    },
  ];

  return (
    <div className="flex h-screen bg-brand-warm-white overflow-hidden text-brand-navy">
      {/* 1. Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 border-r border-brand-navy/5 bg-brand-cream/30 shrink-0 select-none">
        {/* Logo */}
        <div className="p-6 border-b border-brand-navy/5">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center shadow-md">
              <span className="text-brand-warm-white font-bold text-sm">S</span>
            </div>
            <div>
              <span className="text-sm font-extrabold text-brand-navy block tracking-tight">
                SpotReserve
              </span>
              <span className="text-[9px] text-brand-teal font-extrabold uppercase font-mono tracking-widest block">
                Owner Portal
              </span>
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
                    ? "bg-brand-navy text-brand-warm-white font-semibold shadow-md shadow-brand-navy/10"
                    : "text-brand-slate hover:bg-brand-cream-dark/30 hover:text-brand-navy"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={
                      isActive ? "text-brand-teal" : "text-brand-slate"
                    }
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </div>
                {isActive && (
                  <ChevronRight className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer shortcuts */}
        <div className="p-4 border-t border-brand-navy/5 space-y-2">
          <Link
            href="/marketplace"
            className="flex items-center space-x-2.5 text-xs text-brand-slate hover:text-brand-navy font-semibold px-3 py-2 rounded-lg"
          >
            <Compass className="w-4 h-4 text-brand-teal" />
            <span>Marketplace Map</span>
          </Link>
          <Link
            href="/admin"
            className="flex items-center space-x-2.5 text-xs text-brand-slate hover:text-brand-navy font-semibold px-3 py-2 rounded-lg"
          >
            <Laptop className="w-4 h-4 text-rose-500" />
            <span>Admin Shell</span>
          </Link>
        </div>
      </aside>

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header bar */}
        <header className="h-16 border-b border-brand-navy/5 bg-white flex items-center justify-between px-6 shrink-0 relative z-20">
          <div className="flex items-center space-x-3">
            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-full hover:bg-brand-cream text-brand-navy focus:outline-none"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="hidden sm:inline-block text-xs font-bold text-brand-slate uppercase font-mono tracking-wider">
              OPERATOR SUITE
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications panel trigger */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 rounded-full hover:bg-brand-cream/80 text-brand-navy relative"
              >
                <Bell className="w-4.5 h-4.5" />
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
                </span>
              </button>

              {/* Mini Alerts dropdown panel */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-white border border-brand-navy/10 shadow-2xl p-4 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-brand-navy/5">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-navy">
                      Notifications
                    </span>
                    <Link
                      href="/dashboard/notifications"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-[10px] text-brand-teal hover:underline font-semibold font-mono"
                    >
                      View All
                    </Link>
                  </div>
                  <div className="space-y-2.5">
                    {notifications.map((notif, idx) => (
                      <div key={idx} className="text-xs space-y-0.5">
                        <p
                          className={`font-semibold ${notif.unread ? "text-brand-navy" : "text-brand-slate"}`}
                        >
                          {notif.text}
                        </p>
                        <span className="text-[9px] text-brand-slate/60 font-mono block">
                          {notif.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar trigger */}
            <Link
              href="/dashboard/profile"
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 rounded-full bg-brand-teal flex items-center justify-center text-xs font-extrabold text-brand-warm-white shadow-sm">
                F
              </div>
              <span className="hidden sm:inline-block text-xs font-bold text-brand-navy">
                Fire & Slice
              </span>
            </Link>
          </div>
        </header>

        {/* Content body */}
        <main className="flex-grow overflow-y-auto bg-brand-warm-white">
          {children}
        </main>
      </div>

      {/* 3. Mobile Sidebar Drawer overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden flex select-none">
          <div
            className="fixed inset-0 bg-brand-navy/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
          <aside className="relative flex flex-col w-64 bg-white h-full border-r border-brand-navy/5 p-4 justify-between">
            <div className="space-y-6">
              {/* Logo & close */}
              <div className="flex items-center justify-between pb-4 border-b border-brand-navy/5">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center">
                    <span className="text-brand-warm-white font-bold text-sm">
                      S
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-extrabold text-brand-navy block">
                      SpotReserve
                    </span>
                    <span className="text-[9px] text-brand-teal font-extrabold block">
                      Owner Portal
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full hover:bg-brand-cream text-brand-navy"
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
                          ? "bg-brand-navy text-brand-warm-white font-semibold"
                          : "text-brand-slate hover:bg-brand-cream/55"
                      }`}
                    >
                      <span
                        className={
                          isActive ? "text-brand-teal" : "text-brand-slate"
                        }
                      >
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer shortcuts */}
            <div className="space-y-2 border-t border-brand-navy/5 pt-4">
              <Link
                href="/marketplace"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2.5 text-xs text-brand-slate font-semibold px-3 py-2"
              >
                <Compass className="w-4 h-4 text-brand-teal" />
                <span>Marketplace Map</span>
              </Link>
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2.5 text-xs text-brand-slate font-semibold px-3 py-2"
              >
                <Laptop className="w-4 h-4 text-rose-500" />
                <span>Admin Shell</span>
              </Link>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
