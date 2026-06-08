"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  ChevronRight,
  Star,
  Check,
  Truck,
  Zap,
  Users,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Clock,
  Map,
  Layers,
  Sparkles
} from "lucide-react";

export default function LandingPage() {
  // Stats Counters
  const [availableSpots, setAvailableSpots] = useState(1420);
  const [totalRevenue, setTotalRevenue] = useState(648250);
  const [activeBookings, setActiveBookings] = useState(384);

  // Interval for ticking stats
  useEffect(() => {
    const statsTimer = setInterval(() => {
      // Simulate live activity
      setAvailableSpots((prev) => prev + (Math.random() > 0.7 ? 1 : 0));
      setTotalRevenue((prev) => prev + (Math.random() > 0.4 ? Math.floor(Math.random() * 45) + 15 : 0));
      setActiveBookings((prev) => prev + (Math.random() > 0.85 ? 1 : 0));
    }, 4000);

    return () => clearInterval(statsTimer);
  }, []);

  // Selected Spot for Interactive Intelligence Map Section
  const [selectedSpot, setSelectedSpot] = useState(0);

  const mockIntelSpots = [
    {
      id: 0,
      name: "Pier 14 Terminal",
      coords: { x: 380, y: 180 },
      occupancy: "92%",
      footTraffic: "High (12k/day)",
      peakHours: "11:30 AM - 2:00 PM",
      avgRevenue: "$1,850/day",
      powerGrid: "Yes (50A)",
      description: "Waterfront corridor with massive lunch crowds and tourist foot traffic. Ideal for gourmet options."
    },
    {
      id: 1,
      name: "Soma Office Plaza",
      coords: { x: 620, y: 240 },
      occupancy: "85%",
      footTraffic: "Very High (18k/day)",
      peakHours: "12:00 PM - 1:30 PM",
      avgRevenue: "$2,100/day",
      powerGrid: "Yes (30A)",
      description: "Mid-town plaza flanked by tech offices. Heavy lunch rush from Monday to Thursday."
    },
    {
      id: 2,
      name: "Mission Green Park",
      coords: { x: 490, y: 320 },
      occupancy: "64%",
      footTraffic: "Medium (8k/day)",
      peakHours: "5:00 PM - 8:00 PM",
      avgRevenue: "$1,200/day",
      powerGrid: "No",
      description: "Scenic neighborhood park. Massive weekend crowds, evening family events, and food festivals."
    }
  ];

  // Calendar Preview State
  const [calendarViewMonth, setCalendarViewMonth] = useState("June 2026");
  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    // Mock occupancy status
    let status: "full" | "medium" | "open" = "open";
    if ([3, 7, 10, 14, 15, 17, 21, 24, 28].includes(day)) status = "full";
    else if ([1, 5, 8, 12, 19, 22, 26, 29].includes(day)) status = "medium";
    return { day, status };
  });

  // Testimonials list
  const testimonials = [
    {
      name: "Marcus Vance",
      role: "Founder, Fire & Slice Woodfired Pizza",
      text: "SpotReserve changed how we run our operations. We no longer negotiate permits or drive around guessing. We book premium locations in 3 clicks and our weekly revenues are up 42%.",
      rating: 5,
      avatar: "M"
    },
    {
      name: "Elena Rostova",
      role: "Owner, Green Garden Bowls",
      text: "The analytics engine is incredibly accurate. We reserved spots based on SpotReserve's historical revenue estimates and hit our target within the first hour. An indispensable platform.",
      rating: 5,
      avatar: "E"
    },
    {
      name: "Derrick Jenkins",
      role: "Operations lead, Taco Loco Group",
      text: "Managing a fleet of 5 food trucks was a scheduling nightmare. With SpotReserve Team Management and booking calendar, our logistics are entirely streamlined. The support is top-notch.",
      rating: 5,
      avatar: "D"
    }
  ];

  // Pricing Toggle (Monthly / Annual)
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("annual");

  return (
    <div className="w-full flex flex-col bg-brand-warm-white text-brand-navy min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-brand-cream border border-brand-navy/5 px-3 py-1 rounded-full text-xs font-semibold text-brand-teal uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Food Truck Infrastructure</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-brand-navy leading-[1.08]"
            >
              Secure the city’s <br />
              <span className="text-brand-teal">highest-yield</span> locations
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base sm:text-lg text-brand-slate max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
            >
              Browse and reserve premium food truck spots with live location intelligence, real-time calendars, instant permits, and automated payouts. Build your street dining empire on verified data.
            </motion.p>

            {/* Live Hero Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-brand-cream/60 border border-brand-navy/5 max-w-lg mx-auto lg:mx-0 shadow-sm"
            >
              <div className="text-center lg:text-left">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-brand-slate">Active Spots</span>
                <span className="text-xl sm:text-2xl font-extrabold text-brand-navy font-mono">
                  {availableSpots.toLocaleString()}
                </span>
              </div>
              <div className="text-center lg:text-left border-x border-brand-navy/10 px-2">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-brand-slate">Avg. Occupancy</span>
                <span className="text-xl sm:text-2xl font-extrabold text-brand-teal font-mono">87.4%</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-brand-slate">Bookings Today</span>
                <span className="text-xl sm:text-2xl font-extrabold text-brand-navy font-mono">
                  {activeBookings}
                </span>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                href="/reserve/pier-14"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-navy hover:bg-brand-navy-light text-brand-warm-white font-semibold text-sm shadow-lg shadow-brand-navy/15 flex items-center justify-center space-x-2 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Reserve Your Spot</span>
                <ArrowRight className="w-4 h-4 text-brand-teal" />
              </Link>
              <Link
                href="/marketplace"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-brand-navy/10 hover:border-brand-navy/20 hover:bg-brand-cream/50 text-brand-navy font-semibold text-sm flex items-center justify-center space-x-2 transition-all duration-200"
              >
                <span>Explore Locations</span>
                <ChevronRight className="w-4 h-4 text-brand-slate" />
              </Link>
            </motion.div>
          </div>

          {/* Hero Visual: Styled Vector City Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div className="w-full aspect-square rounded-3xl bg-brand-cream/70 border border-brand-navy/5 shadow-xl relative overflow-hidden flex items-center justify-center p-6">
              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 z-10 bg-brand-navy text-brand-warm-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center space-x-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Live Grid Active</span>
              </div>

              {/* City Map SVG Background */}
              <svg
                viewBox="0 0 500 500"
                className="w-full h-full text-brand-cream-dark opacity-60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {/* City Blocks */}
                <rect x="20" y="20" width="130" height="130" rx="8" fill="#FDFCFA" strokeWidth="0.5" />
                <rect x="170" y="20" width="160" height="90" rx="8" fill="#FDFCFA" strokeWidth="0.5" />
                <rect x="350" y="20" width="130" height="130" rx="8" fill="#FDFCFA" strokeWidth="0.5" />
                <rect x="20" y="170" width="130" height="160" rx="8" fill="#FDFCFA" strokeWidth="0.5" />
                <rect x="170" y="130" width="160" height="200" rx="8" fill="#FDFCFA" strokeWidth="0.5" />
                <rect x="350" y="170" width="130" height="160" rx="8" fill="#FDFCFA" strokeWidth="0.5" />
                <rect x="20" y="350" width="310" height="130" rx="8" fill="#FDFCFA" strokeWidth="0.5" />
                <rect x="350" y="350" width="130" height="130" rx="8" fill="#FDFCFA" strokeWidth="0.5" />

                {/* River */}
                <path d="M-50,420 C180,410 240,250 550,230" stroke="#E0F2FE" strokeWidth="30" strokeLinecap="round" />

                {/* Grid Lines/Roads */}
                <path d="M160,0 L160,500" strokeWidth="2.5" strokeDasharray="4 4" className="text-brand-slate/15" />
                <path d="M340,0 L340,500" strokeWidth="2.5" strokeDasharray="4 4" className="text-brand-slate/15" />
                <path d="M0,160 L500,160" strokeWidth="2.5" strokeDasharray="4 4" className="text-brand-slate/15" />
                <path d="M0,340 L500,340" strokeWidth="2.5" strokeDasharray="4 4" className="text-brand-slate/15" />

                {/* Animated Truck path */}
                <path d="M160,500 L160,160 L340,160 L340,0" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" />
              </svg>

              {/* Pulsing Reservation Pin 1 */}
              <div className="absolute top-[160px] left-[160px] -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inline-flex h-10 w-10 rounded-full bg-brand-teal/20 pulse-ring"></span>
                <span className="relative flex h-3.5 w-3.5 rounded-full bg-brand-teal pulse-dot"></span>
              </div>

              {/* Pulsing Reservation Pin 2 */}
              <div className="absolute top-[340px] left-[340px] -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inline-flex h-10 w-10 rounded-full bg-brand-blue/20 pulse-ring"></span>
                <span className="relative flex h-3.5 w-3.5 rounded-full bg-brand-blue pulse-dot"></span>
              </div>

              {/* Pulsing Reservation Pin 3 */}
              <div className="absolute top-[160px] left-[340px] -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inline-flex h-10 w-10 rounded-full bg-brand-teal/20 pulse-ring"></span>
                <span className="relative flex h-3.5 w-3.5 rounded-full bg-brand-teal pulse-dot"></span>
              </div>

              {/* Interactive Hover Card Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-brand-navy/5 shadow-lg flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-brand-navy">Pier 14 Terminal</span>
                    <span className="block text-[10px] text-brand-slate font-semibold">Gourmet Food Trucks only</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] uppercase font-bold text-brand-teal">92% Occupied</span>
                  <span className="block text-xs font-bold text-brand-navy">$1,850/day avg.</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTERACTIVE LOCATION INTELLIGENCE SECTION */}
      <section className="py-24 bg-brand-cream/40 border-y border-brand-navy/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Location Intelligence</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Verify high-yield spots before booking</h2>
            <p className="text-sm sm:text-base text-brand-slate font-medium">
              We compile cell phone foot traffic, peak hours data, and historical sales volumes to grade locations. Select a spot below to view its premium metrics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Intel selectors */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
              {mockIntelSpots.map((spot, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedSpot(spot.id)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                    selectedSpot === spot.id
                      ? "bg-brand-navy border-brand-navy text-brand-warm-white shadow-xl shadow-brand-navy/15"
                      : "bg-white border-brand-navy/5 hover:border-brand-navy/15 text-brand-navy"
                  }`}
                >
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider opacity-60 font-mono mb-1">
                      LOCATION GRADE: A+
                    </span>
                    <span className="text-lg font-bold">{spot.name}</span>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      selectedSpot === spot.id ? "translate-x-1 text-brand-teal" : "text-brand-slate"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Intel Display Map + Stats Grid */}
            <div className="lg:col-span-7 bg-white border border-brand-navy/5 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* SVG Mini Map showing active coordinates */}
                <div className="aspect-square rounded-2xl bg-brand-cream/50 relative overflow-hidden border border-brand-navy/5">
                  <svg className="w-full h-full text-brand-cream-dark opacity-80" viewBox="0 0 800 800" fill="none" stroke="currentColor">
                    <rect x="50" y="50" width="300" height="300" rx="12" fill="#fff" strokeWidth="0.5" />
                    <rect x="450" y="50" width="300" height="300" rx="12" fill="#fff" strokeWidth="0.5" />
                    <rect x="50" y="450" width="300" height="300" rx="12" fill="#fff" strokeWidth="0.5" />
                    <rect x="450" y="450" width="300" height="300" rx="12" fill="#fff" strokeWidth="0.5" />
                    <path d="M400,0 L400,800" strokeWidth="4" strokeDasharray="10 10" className="text-brand-slate/10" />
                    <path d="M0,400 L800,400" strokeWidth="4" strokeDasharray="10 10" className="text-brand-slate/10" />
                  </svg>

                  {/* Pulsing Active Pin coordinates */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedSpot}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      style={{
                        position: "absolute",
                        top: `${mockIntelSpots[selectedSpot].coords.y}px`,
                        left: `${mockIntelSpots[selectedSpot].coords.x}px`
                      }}
                      className="-translate-x-1/2 -translate-y-1/2"
                    >
                      <span className="absolute inline-flex h-16 w-16 rounded-full bg-brand-teal/20 pulse-ring"></span>
                      <span className="relative flex h-5 w-5 rounded-full bg-brand-teal pulse-dot border-2 border-white shadow-md"></span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Metrics Breakdown */}
                <div className="space-y-6">
                  <div>
                    <span className="text-xs uppercase font-extrabold text-brand-teal">VERIFIED DATA</span>
                    <h3 className="text-2xl font-extrabold text-brand-navy mt-1">
                      {mockIntelSpots[selectedSpot].name}
                    </h3>
                    <p className="text-xs text-brand-slate font-medium mt-2 leading-relaxed">
                      {mockIntelSpots[selectedSpot].description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-t border-brand-navy/5 pt-4">
                    <div>
                      <span className="block text-[10px] font-bold text-brand-slate uppercase">Foot Traffic</span>
                      <span className="text-sm font-extrabold text-brand-navy">
                        {mockIntelSpots[selectedSpot].footTraffic}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-brand-slate uppercase">Avg. Sales</span>
                      <span className="text-sm font-extrabold text-brand-teal">
                        {mockIntelSpots[selectedSpot].avgRevenue}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-brand-slate uppercase">Peak Lunch Rush</span>
                      <span className="text-sm font-extrabold text-brand-navy">
                        {mockIntelSpots[selectedSpot].peakHours}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-brand-slate uppercase">Electrical Hookups</span>
                      <span className="text-sm font-extrabold text-brand-navy">
                        {mockIntelSpots[selectedSpot].powerGrid}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to action within panel */}
              <div className="border-t border-brand-navy/5 mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs font-semibold text-brand-slate">
                  <ShieldCheck className="w-4 h-4 text-brand-teal" />
                  <span>Licensed and permitted for immediate booking.</span>
                </div>
                <Link
                  href="/reserve/pier-14"
                  className="px-6 py-2.5 rounded-full bg-brand-navy hover:bg-brand-navy-light text-brand-warm-white text-xs font-bold transition-all"
                >
                  Book This Spot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED LOCATIONS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Spot Showcase</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Top food truck spots in high demand</h2>
          </div>
          <Link
            href="/marketplace"
            className="flex items-center space-x-1 text-xs font-bold uppercase tracking-wider text-brand-navy hover:text-brand-teal transition-colors"
          >
            <span>View all locations marketplace</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group rounded-3xl bg-white border border-brand-navy/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="h-48 bg-brand-cream/80 relative flex items-center justify-center text-brand-slate font-medium text-xs">
                {/* Styled placeholder */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-cream-dark to-brand-cream opacity-50"></div>
                <Map className="w-10 h-10 text-brand-slate/40 mb-2 block" />
                <span className="absolute bottom-4 left-4 bg-brand-navy text-brand-warm-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Downtown
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy">Pier 14 Water Terminal</h3>
                    <p className="text-xs text-brand-slate font-medium">Gourmet & Beverage Spot</p>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    92% Occupied
                  </span>
                </div>
                <p className="text-xs text-brand-slate font-medium leading-relaxed">
                  Stunning views, maximum office worker density, and heavy evening commuter paths.
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-brand-navy/5 bg-brand-cream/20 flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-brand-slate font-bold uppercase">DAILY RATE</span>
                <span className="text-sm font-extrabold text-brand-navy">$180<span className="text-xs font-normal">/day</span></span>
              </div>
              <Link
                href="/marketplace/pier-14"
                className="px-4 py-2 rounded-full bg-brand-navy group-hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all flex items-center space-x-1"
              >
                <span>View Spot</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group rounded-3xl bg-white border border-brand-navy/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="h-48 bg-brand-cream/80 relative flex items-center justify-center text-brand-slate font-medium text-xs">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-cream-dark to-brand-cream opacity-50"></div>
                <Map className="w-10 h-10 text-brand-slate/40 mb-2 block" />
                <span className="absolute bottom-4 left-4 bg-brand-navy text-brand-warm-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Business Park
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy">Soma Plaza Courtyard</h3>
                    <p className="text-xs text-brand-slate font-medium">Bustling Lunch Market</p>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    85% Occupied
                  </span>
                </div>
                <p className="text-xs text-brand-slate font-medium leading-relaxed">
                  Surrounded by financial and technology skyscrapers. Heavy traffic Monday through Thursday.
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-brand-navy/5 bg-brand-cream/20 flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-brand-slate font-bold uppercase">DAILY RATE</span>
                <span className="text-sm font-extrabold text-brand-navy">$220<span className="text-xs font-normal">/day</span></span>
              </div>
              <Link
                href="/marketplace/soma-plaza"
                className="px-4 py-2 rounded-full bg-brand-navy group-hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all flex items-center space-x-1"
              >
                <span>View Spot</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group rounded-3xl bg-white border border-brand-navy/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="h-48 bg-brand-cream/80 relative flex items-center justify-center text-brand-slate font-medium text-xs">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-cream-dark to-brand-cream opacity-50"></div>
                <Map className="w-10 h-10 text-brand-slate/40 mb-2 block" />
                <span className="absolute bottom-4 left-4 bg-brand-navy text-brand-warm-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Park / Marina
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy">Mission Park Meadow</h3>
                    <p className="text-xs text-brand-slate font-medium">Family Weekend Spot</p>
                  </div>
                  <span className="text-xs font-extrabold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
                    64% Occupied
                  </span>
                </div>
                <p className="text-xs text-brand-slate font-medium leading-relaxed">
                  Best suited for weekends, evening picnics, family dinners, dessert trucks and cafes.
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-brand-navy/5 bg-brand-cream/20 flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-brand-slate font-bold uppercase">DAILY RATE</span>
                <span className="text-sm font-extrabold text-brand-navy">$110<span className="text-xs font-normal">/day</span></span>
              </div>
              <Link
                href="/marketplace/mission-park"
                className="px-4 py-2 rounded-full bg-brand-navy group-hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all flex items-center space-x-1"
              >
                <span>View Spot</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. AVAILABILITY CALENDAR PREVIEW & REVENUE INSIGHTS */}
      <section className="py-24 bg-brand-navy text-brand-warm-white relative overflow-hidden">
        {/* Subtle grid styling */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(#FAF9F6_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Calendar Widget */}
            <div className="space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Platform Previews</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Real-Time Calendar & Schedule Control
              </h2>
              <p className="text-sm text-slate-300 font-medium leading-relaxed">
                Check exact spot availability instantly. Our calendar lets owners filter by morning, evening, or full-day shifts. Click directly on available dates to initiate booking.
              </p>

              {/* Visual mini-calendar */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {calendarViewMonth}
                  </span>
                  <div className="flex space-x-2 text-[10px] font-semibold">
                    <span className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0"></span>
                      <span>Full</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
                      <span>Medium</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0"></span>
                      <span>Open</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-[10px] text-slate-400 font-bold mb-2">
                  <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map(({ day, status }) => {
                    let statusColor = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30";
                    if (status === "full") statusColor = "bg-rose-500/20 text-rose-400 border border-rose-500/30";
                    else if (status === "medium") statusColor = "bg-amber-500/20 text-amber-400 border border-amber-500/30";

                    return (
                      <div
                        key={day}
                        className={`aspect-square rounded-lg flex items-center justify-center text-xs font-semibold font-mono ${statusColor}`}
                      >
                        {day}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Revenue insights / Graph preview */}
            <div className="space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Revenue Engine</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Simulate & Track Daily Earnings
              </h2>
              <p className="text-sm text-slate-300 font-medium leading-relaxed">
                SpotReserve provides a live dashboard reporting daily revenue metrics, customer counts, and electrical grid consumption. Manage payout transfers instantly.
              </p>

              {/* Graphic mini analytics card */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                      WEEKLY EARNINGS PROJECTION
                    </span>
                    <span className="text-2xl font-extrabold font-mono text-brand-teal">$14,850.40</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center space-x-1 text-xs font-bold font-mono">
                    <TrendingUp className="w-4 h-4" />
                    <span>+18.4%</span>
                  </div>
                </div>

                {/* Animated bar graph simulation */}
                <div className="h-32 flex items-end justify-between gap-3 pt-4 border-t border-white/10">
                  {[45, 60, 52, 78, 85, 95, 70].map((height, idx) => {
                    const days = ["M", "T", "W", "T", "F", "S", "S"];
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center space-y-2">
                        <div className="w-full bg-white/5 hover:bg-brand-teal/20 rounded-t-md relative overflow-hidden transition-colors" style={{ height: "90px" }}>
                          <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: `${height}%` }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute bottom-0 left-0 right-0 bg-brand-teal"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 font-mono">{days[idx]}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (RESERVATION PROCESS) */}
      <section className="py-24 bg-brand-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Workflow</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">How SpotReserve Works</h2>
            <p className="text-sm sm:text-base text-brand-slate font-medium">
              Seamlessly browse, permit, book, and transact. We handle all logistics under the hood.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="relative space-y-4 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-cream border border-brand-navy/5 flex items-center justify-center shadow-sm text-brand-navy font-bold text-xl font-mono">
                01
              </div>
              <h3 className="text-lg font-bold text-brand-navy">Browse & Grade</h3>
              <p className="text-xs text-brand-slate font-medium max-w-xs leading-relaxed">
                Filter coordinates by city borough, power configurations, historical sales grades, and price points.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative space-y-4 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-cream border border-brand-navy/5 flex items-center justify-center shadow-sm text-brand-navy font-bold text-xl font-mono">
                02
              </div>
              <h3 className="text-lg font-bold text-brand-navy">Select Shifts</h3>
              <p className="text-xs text-brand-slate font-medium max-w-xs leading-relaxed">
                Choose custom slots (Morning lunch blocks, evening dinner blocks, or 24h reservations) directly on our interactive calendar.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative space-y-4 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-cream border border-brand-navy/5 flex items-center justify-center shadow-sm text-brand-navy font-bold text-xl font-mono">
                03
              </div>
              <h3 className="text-lg font-bold text-brand-navy">Simulated Stripe Pay</h3>
              <p className="text-xs text-brand-slate font-medium max-w-xs leading-relaxed">
                Confirm bookings with modern card details. Permits, certificates, and compliance check out instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PLATFORM SHOWCASE (SAAS DASHBOARD SCREENSHOT CONTEXT) */}
      <section className="py-24 bg-brand-cream/30 border-y border-brand-navy/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Fleet Logistics</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy leading-tight">
                Enterprise Dashboard for Fleet Operators
              </h2>
              <p className="text-sm text-brand-slate font-medium leading-relaxed">
                Running multiple trucks? Manage your entire crew, monitor schedules, review weekly financial charts, download tax receipts, and access support tickets inside a streamlined interface.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2 text-xs font-semibold text-brand-navy">
                  <Check className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Interactive sales charts powered by Recharts.</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-brand-navy">
                  <Check className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Crew invite system with detailed permissions control.</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-brand-navy">
                  <Check className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Support Center featuring live ticketing and settings configuration.</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-brand-navy hover:bg-brand-navy-light text-brand-warm-white text-xs font-bold transition-all shadow-md"
                >
                  <span>Launch Owner Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Dashboard Mock Grid Graphic */}
            <div className="lg:col-span-7 bg-brand-navy rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider">SpotReserve Portal</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-white/5 border border-white/15">
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">Total Sales</span>
                  <span className="text-base font-extrabold text-white font-mono">$18,420</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/15">
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">Permit Status</span>
                  <span className="text-xs font-extrabold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full inline-block mt-1">
                    Compliant
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/15">
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">Fleet Trucks</span>
                  <span className="text-base font-extrabold text-white font-mono">3 Active</span>
                </div>
              </div>

              {/* Graphical placeholder representing interactive charts */}
              <div className="p-5 rounded-xl bg-white/5 border border-white/15 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-300 font-bold">
                  <span>Weekly Utilization Rates</span>
                  <span className="text-[10px] text-brand-teal font-mono">82% Capacity</span>
                </div>
                <div className="h-24 flex items-end justify-between gap-2">
                  {[20, 35, 40, 30, 65, 80, 50, 45, 60, 70, 85, 90].map((h, i) => (
                    <div key={i} className="flex-grow bg-white/10 rounded-t-sm h-full relative">
                      <div className="absolute bottom-0 left-0 right-0 bg-brand-teal rounded-t-sm" style={{ height: `${h}%` }}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRICING PREVIEW */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">SaaS Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Transparent, growth-focused pricing</h2>
          <p className="text-sm sm:text-base text-brand-slate font-medium">
            Choose the tier matching your truck fleet size. Toggle annual billing to save 20%.
          </p>

          {/* Pricing Toggle Button */}
          <div className="inline-flex items-center bg-brand-cream border border-brand-navy/5 p-1 rounded-full mt-4">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                billingPeriod === "monthly" ? "bg-brand-navy text-brand-warm-white shadow-md" : "text-brand-slate"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1 ${
                billingPeriod === "annual" ? "bg-brand-navy text-brand-warm-white shadow-md" : "text-brand-slate"
              }`}
            >
              <span>Annually</span>
              <span className="text-[9px] bg-brand-teal text-brand-warm-white px-1.5 py-0.5 rounded-full lowercase font-semibold font-sans">
                save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan 1 */}
          <div className="p-8 rounded-3xl bg-white border border-brand-navy/5 flex flex-col justify-between shadow-sm hover:border-brand-navy/15 transition-all">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase text-brand-slate tracking-wider">Starter Spot</span>
                <span className="block text-3xl font-extrabold text-brand-navy font-mono mt-2">
                  {billingPeriod === "annual" ? "$49" : "$59"}
                  <span className="text-xs font-normal text-brand-slate">/mo</span>
                </span>
                <p className="text-xs text-brand-slate font-medium mt-2">Perfect for single food truck operators.</p>
              </div>

              <div className="border-t border-brand-navy/5 pt-6 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-semibold text-brand-navy">
                  <Check className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Book up to 3 spots concurrently</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-brand-navy">
                  <Check className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Standard location filters</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-brand-navy">
                  <Check className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Basic payout transfers</span>
                </div>
              </div>
            </div>

            <Link
              href="/pricing"
              className="w-full text-center py-3 rounded-full border border-brand-navy/10 hover:border-brand-navy/20 text-brand-navy text-xs font-bold transition-all mt-8 block"
            >
              Select Plan
            </Link>
          </div>

          {/* Plan 2 - Recommended */}
          <div className="p-8 rounded-3xl bg-brand-navy text-brand-warm-white flex flex-col justify-between shadow-xl relative overflow-hidden border border-white/5">
            <div className="absolute top-4 right-4 bg-brand-teal text-brand-warm-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
              Recommended
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase text-brand-teal tracking-wider">Fleet Premium</span>
                <span className="block text-3xl font-extrabold font-mono mt-2">
                  {billingPeriod === "annual" ? "$99" : "$119"}
                  <span className="text-xs font-normal text-slate-400">/mo</span>
                </span>
                <p className="text-xs text-slate-300 font-medium mt-2">Ideal for operators running 2-5 food trucks.</p>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-semibold">
                  <Check className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Book up to 10 spots concurrently</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold">
                  <Check className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Advanced Location Intelligence metrics</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold">
                  <Check className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Next-day payout speed</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold">
                  <Check className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Priority Support access</span>
                </div>
              </div>
            </div>

            <Link
              href="/pricing"
              className="w-full text-center py-3 rounded-full bg-brand-teal hover:bg-brand-teal-dark text-brand-warm-white text-xs font-bold transition-all mt-8 block"
            >
              Get Started
            </Link>
          </div>

          {/* Plan 3 */}
          <div className="p-8 rounded-3xl bg-white border border-brand-navy/5 flex flex-col justify-between shadow-sm hover:border-brand-navy/15 transition-all">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase text-brand-slate tracking-wider">Enterprise Group</span>
                <span className="block text-3xl font-extrabold text-brand-navy font-mono mt-2">
                  {billingPeriod === "annual" ? "$199" : "$239"}
                  <span className="text-xs font-normal text-brand-slate">/mo</span>
                </span>
                <p className="text-xs text-brand-slate font-medium mt-2">For large hospitality fleets & franchises.</p>
              </div>

              <div className="border-t border-brand-navy/5 pt-6 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-semibold text-brand-navy">
                  <Check className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Unlimited concurrent bookings</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-brand-navy">
                  <Check className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Full database API integration</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-brand-navy">
                  <Check className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Instant payouts processing</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-semibold text-brand-navy">
                  <Check className="w-4 h-4 text-brand-teal shrink-0" />
                  <span>Dedicated accounts manager</span>
                </div>
              </div>
            </div>

            <Link
              href="/pricing"
              className="w-full text-center py-3 rounded-full border border-brand-navy/10 hover:border-brand-navy/20 text-brand-navy text-xs font-bold transition-all mt-8 block"
            >
              Select Plan
            </Link>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-24 bg-brand-cream/30 border-y border-brand-navy/5 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Success Stories</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy">Loved by premium street vendors</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex text-amber-400">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-brand-slate font-medium leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-brand-navy/5">
                  <div className="w-9 h-9 rounded-full bg-brand-cream-dark flex items-center justify-center text-xs font-bold text-brand-navy font-sans shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-brand-navy">{t.name}</span>
                    <span className="block text-[10px] text-brand-slate font-semibold">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <div className="bg-brand-navy text-brand-warm-white rounded-3xl p-8 sm:p-12 relative overflow-hidden border border-white/10 shadow-2xl space-y-8">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(#FAF9F6_1px,transparent_1px)] [background-size:32px_32px]"></div>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            <span className="text-[10px] font-bold tracking-widest text-brand-teal uppercase font-mono">
              READY TO SCALE?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Start reserving your spots on SpotReserve today
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Join thousands of food truck owners building sustainable dining streams with SpotReserve.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/reserve/pier-14"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-teal hover:bg-brand-teal-dark text-brand-warm-white text-xs font-bold transition-all"
            >
              Reserve Spot Now
            </Link>
            <Link
              href="/marketplace"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 text-brand-warm-white text-xs font-bold transition-all"
            >
              Browse Map
            </Link>
          </div>
        </div>
      </section>

      {/* 10. FOOTER */}
      <footer className="bg-brand-cream/40 border-t border-brand-navy/5 pt-16 pb-12 px-4 sm:px-6 lg:px-8 w-full mt-auto">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 border-b border-brand-navy/5 pb-12">
          {/* Logo column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center">
                <span className="text-brand-warm-white font-bold text-sm">S</span>
              </div>
              <span className="text-lg font-bold tracking-tight text-brand-navy">
                Spot<span className="text-brand-teal">Reserve</span>
              </span>
            </div>
            <p className="text-xs text-brand-slate max-w-sm font-medium leading-relaxed">
              SpotReserve provides verified location logistics, reservation calendars, permits compliance, and revenue reporting systems for next-generation street dining groups.
            </p>
          </div>

          {/* Platform column */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-4 font-mono">Platform</span>
            <ul className="space-y-2.5 text-xs text-brand-slate font-medium">
              <li><Link href="/marketplace" className="hover:text-brand-teal">Spots Marketplace</Link></li>
              <li><Link href="/pricing" className="hover:text-brand-teal">Pricing Plans</Link></li>
              <li><Link href="/walkthrough" className="hover:text-brand-teal">Demo Walkthrough</Link></li>
              <li><Link href="/dashboard" className="hover:text-brand-teal">Truck Owner Portal</Link></li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-4 font-mono">Company</span>
            <ul className="space-y-2.5 text-xs text-brand-slate font-medium">
              <li><Link href="/about" className="hover:text-brand-teal">About Story</Link></li>
              <li><Link href="/contact" className="hover:text-brand-teal">Contact Us</Link></li>
              <li><Link href="/help" className="hover:text-brand-teal">Help & FAQ</Link></li>
            </ul>
          </div>

          {/* Admin column */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-brand-navy mb-4 font-mono">Systems</span>
            <ul className="space-y-2.5 text-xs text-brand-slate font-medium">
              <li><Link href="/admin" className="hover:text-brand-teal">Admin Dashboard</Link></li>
              <li><Link href="/support" className="hover:text-brand-teal">Support Help Desk</Link></li>
              <li><Link href="/settings" className="hover:text-brand-teal">Settings</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-brand-slate font-medium uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} SpotReserve Inc. All rights reserved.</span>
          <div className="flex space-x-6">
            <span className="hover:underline cursor-pointer">Security Protocol</span>
            <span className="hover:underline cursor-pointer">Privacy Charter</span>
            <span className="hover:underline cursor-pointer">Service Agreement</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
