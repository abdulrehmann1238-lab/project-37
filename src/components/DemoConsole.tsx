"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  X,
  Compass,
  Briefcase,
  ShieldAlert,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers
} from "lucide-react";

interface ScreenLink {
  name: string;
  path: string;
  badge?: string;
}

interface Category {
  title: string;
  icon: React.ReactNode;
  screens: ScreenLink[];
}

export default function DemoConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const categories: Category[] = [
    {
      title: "Marketplace & Checkout",
      icon: <Compass className="w-4 h-4 text-brand-teal" />,
      screens: [
        { name: "1. Landing Page", path: "/" },
        { name: "2. Locations Marketplace", path: "/marketplace" },
        { name: "3. Location Details (Pier 14)", path: "/marketplace/pier-14" },
        { name: "4. Reservation Wizard", path: "/reserve/pier-14" },
        { name: "5. Payment Simulation", path: "/reserve/pier-14?step=6" },
        { name: "6. Reservation Success", path: "/reserve/pier-14?step=7" }
      ]
    },
    {
      title: "Truck Owner Dashboard",
      icon: <Briefcase className="w-4 h-4 text-brand-blue" />,
      screens: [
        { name: "7. Dashboard Overview", path: "/dashboard" },
        { name: "8. Upcoming Reservations", path: "/dashboard/upcoming" },
        { name: "9. Reservation History", path: "/dashboard/history" },
        { name: "10. Revenue Analytics", path: "/dashboard/revenue" },
        { name: "11. Availability Calendar", path: "/dashboard/calendar" },
        { name: "12. Notification Center", path: "/dashboard/notifications" },
        { name: "13. Profile Management", path: "/dashboard/profile" },
        { name: "14. Team Management", path: "/dashboard/team" }
      ]
    },
    {
      title: "Platform Admin Panel",
      icon: <ShieldAlert className="w-4 h-4 text-rose-500" />,
      screens: [
        { name: "15. Admin Dashboard", path: "/admin" },
        { name: "16. Location Management", path: "/admin/locations" },
        { name: "17. Reservation Monitoring", path: "/admin/reservations" },
        { name: "18. Revenue Reports", path: "/admin/revenue" }
      ]
    },
    {
      title: "Corporate & Support",
      icon: <HelpCircle className="w-4 h-4 text-brand-slate" />,
      screens: [
        { name: "19. Support Center (Live Chat)", path: "/support" },
        { name: "20. Global Settings", path: "/settings" },
        { name: "21. Pricing & Plans", path: "/pricing" },
        { name: "22. About Story", path: "/about" },
        { name: "23. Contact Form", path: "/contact" },
        { name: "24. Help Center (FAQ)", path: "/help" },
        { name: "25. Demo Walkthrough", path: "/walkthrough" }
      ]
    }
  ];

  // Filter screens based on search input
  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      screens: cat.screens.filter((screen) =>
        screen.name.toLowerCase().includes(search.toLowerCase()) ||
        cat.title.toLowerCase().includes(search.toLowerCase())
      )
    }))
    .filter((cat) => cat.screens.length > 0);

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Floating Action Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-brand-navy hover:bg-brand-navy-light text-brand-warm-white px-4 py-3 rounded-full shadow-xl shadow-brand-navy/20 border border-brand-warm-white/10 transition-colors"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-teal"></span>
        </span>
        {isOpen ? <X className="w-4 h-4" /> : <Terminal className="w-4 h-4 text-brand-teal" />}
        <span className="text-xs font-bold uppercase tracking-wider font-mono">Demo Control Panel</span>
      </motion.button>

      {/* Main Drawer Console Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 right-0 w-[360px] max-h-[500px] rounded-2xl glass-panel-dark text-slate-200 shadow-2xl flex flex-col overflow-hidden border border-white/10"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-black/20 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-brand-teal" />
                <span className="text-sm font-bold tracking-tight text-white uppercase font-mono">
                  SpotReserve Screens ({categories.reduce((acc, c) => acc + c.screens.length, 0)})
                </span>
              </div>
              <span className="text-[10px] text-brand-teal font-semibold px-2 py-0.5 rounded-full bg-brand-teal/15 font-mono">
                SaaS LIVE DEMO
              </span>
            </div>

            {/* Search */}
            <div className="px-4 py-2 border-b border-white/5 bg-black/10">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search screens (e.g. Dashboard, Payment)..."
                className="w-full text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 focus:outline-none focus:border-brand-teal/60 text-white placeholder-slate-400 font-sans"
              />
            </div>

            {/* Navigation List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat, catIdx) => (
                  <div key={catIdx} className="space-y-1.5">
                    <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                      {cat.icon}
                      <span>{cat.title}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-1 pl-2 border-l border-white/10">
                      {cat.screens.map((screen, idx) => {
                        const isActive = pathname === screen.path.split("?")[0];
                        return (
                          <Link
                            key={idx}
                            href={screen.path}
                            onClick={() => setIsOpen(false)}
                            className={`group flex items-center justify-between text-xs px-2.5 py-1.5 rounded-md transition-all ${
                              isActive
                                ? "bg-brand-teal/20 text-brand-teal font-semibold border-l-2 border-brand-teal"
                                : "hover:bg-white/5 text-slate-300"
                            }`}
                          >
                            <span className="truncate flex items-center space-x-1">
                              {isActive && (
                                <ChevronRight className="w-3.5 h-3.5 text-brand-teal shrink-0 animate-pulse" />
                              )}
                              <span>{screen.name}</span>
                            </span>
                            <ExternalLink className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  No matching screens found.
                </div>
              )}
            </div>

            {/* Mini Walkthrough footer */}
            <div className="p-3 bg-black/30 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
              <span className="font-mono">SpotReserve v1.0.0</span>
              <Link
                href="/walkthrough"
                onClick={() => setIsOpen(false)}
                className="text-brand-teal hover:underline font-semibold flex items-center space-x-1 font-mono"
              >
                <span>Demo Walkthrough Guide</span>
                <ChevronRight className="w-3 h-3 inline" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
