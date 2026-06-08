"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Calendar,
  Truck,
  Sparkles,
  MapPin,
  Clock,
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function DashboardOverview() {
  const stats = [
    { name: "Monthly Revenue Proj.", value: "$14,820.00", change: "+14.8%", color: "text-brand-teal" },
    { name: "Active Reserved spots", value: "3 Locations", change: "Current Week", color: "text-brand-navy" },
    { name: "Capacity Utilization", value: "87.5%", change: "+4.2%", color: "text-brand-blue" },
    { name: "Compliance Permit", value: "Fully Verified", change: "Valid SF City", color: "text-emerald-500" }
  ];

  const upcomingBookings = [
    { id: "B1", location: "Pier 14 Water Terminal", date: "June 12, 2026", shift: "Lunch Shift (10am-3pm)", status: "Active" },
    { id: "B2", location: "Soma Plaza Courtyard", date: "June 15, 2026", shift: "Dinner Shift (4pm-9pm)", status: "Active" },
    { id: "B3", location: "Pier 14 Water Terminal", date: "June 18, 2026", shift: "Full-Day (10am-9pm)", status: "Active" }
  ];

  const insights = [
    { title: "Downtown corridor spike", text: "Evening food traffic at Pier 14 is up 22%. We recommend checking next week's availability.", icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { title: "Soma electrical maintenance", text: "Electrical grid hookups will undergo standard municipal audits next Friday. Prepare generators.", icon: <AlertCircle className="w-4 h-4 text-rose-500" /> }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Title greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-brand-navy">Welcome back, Marcus!</h1>
          <p className="text-xs text-brand-slate font-medium">Here’s how your food truck operations are performing this week.</p>
        </div>

        <Link
          href="/marketplace"
          className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all shadow-sm"
        >
          <span>Reserve a New Spot</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Stats Counters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="p-5 rounded-2xl bg-white border border-brand-navy/5 shadow-sm space-y-2.5 flex flex-col justify-between"
          >
            <span className="block text-[10px] uppercase font-bold text-brand-slate tracking-wider font-mono">
              {stat.name}
            </span>
            <div className="flex items-baseline justify-between">
              <span className={`text-xl sm:text-2xl font-extrabold font-mono ${stat.color}`}>
                {stat.value}
              </span>
              <span className="text-[10px] font-bold text-emerald-500 font-mono">
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recharts chart simulation widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Analytics bar chart card */}
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-brand-navy uppercase font-mono">Weekly Revenue Trends</span>
              <span className="text-[10px] text-brand-slate font-medium">Aggregated across all active food truck bays</span>
            </div>
            <TrendingUp className="w-4 h-4 text-brand-teal" />
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-4 border-t border-brand-navy/5">
            {[30, 48, 35, 68, 72, 88, 54].map((h, i) => {
              const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
              return (
                <div key={i} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="w-full bg-brand-cream rounded-t-lg h-36 relative overflow-hidden">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute bottom-0 left-0 right-0 bg-brand-teal"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-brand-slate font-mono">{days[i]}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic spot performance list */}
        <div className="lg:col-span-4 p-5 sm:p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <span className="block text-xs font-bold text-brand-navy uppercase font-mono mb-4">Top Performing Zones</span>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-brand-navy/5">
                <div>
                  <span className="block font-bold text-brand-navy">Pier 14 Terminal</span>
                  <span className="block text-[10px] text-brand-slate">Waterfront zone</span>
                </div>
                <span className="font-extrabold text-brand-teal font-mono">$1,850/day</span>
              </div>
              <div className="flex items-center justify-between text-xs pb-3 border-b border-brand-navy/5">
                <div>
                  <span className="block font-bold text-brand-navy">Soma Office Plaza</span>
                  <span className="block text-[10px] text-brand-slate">Office core</span>
                </div>
                <span className="font-extrabold text-brand-teal font-mono">$1,640/day</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <div>
                  <span className="block font-bold text-brand-navy">Mission Park</span>
                  <span className="block text-[10px] text-brand-slate">Park lawn</span>
                </div>
                <span className="font-extrabold text-brand-teal font-mono">$1,100/day</span>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard/revenue"
            className="w-full text-center py-2.5 rounded-full border border-brand-navy/10 hover:border-brand-navy/20 text-brand-navy text-xs font-bold transition-all block mt-4"
          >
            Detailed Financials
          </Link>
        </div>
      </div>

      {/* Lower grid: Upcoming reservations & insights */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Upcoming list */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-brand-navy uppercase font-mono">Upcoming Scheduled Spots</span>
            <Link href="/dashboard/upcoming" className="text-[10px] text-brand-teal hover:underline font-bold font-mono">
              View Calendar
            </Link>
          </div>

          <div className="space-y-3">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="p-4 rounded-2xl bg-brand-cream/30 border border-brand-navy/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-medium text-brand-slate"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-brand-teal shrink-0" />
                    <span className="font-bold text-brand-navy">{booking.location}</span>
                  </div>
                  <div className="flex items-center space-x-4 pl-5">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{booking.shift}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 pl-5 sm:pl-0">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-500 bg-emerald-500/10">
                    {booking.status}
                  </span>
                  <Link
                    href="/dashboard/upcoming"
                    className="p-1 rounded-full hover:bg-brand-cream text-brand-navy"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: AI Insights */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-4">
          <span className="block text-xs font-bold text-brand-navy uppercase font-mono">Operations Insights</span>
          <div className="space-y-3">
            {insights.map((insight, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-brand-cream/30 border border-brand-navy/5 flex items-start space-x-3 text-xs font-semibold text-brand-slate"
              >
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm shrink-0">
                  {insight.icon}
                </div>
                <div>
                  <span className="block text-brand-navy font-bold">{insight.title}</span>
                  <span className="block text-[10px] text-brand-slate font-medium mt-0.5 leading-relaxed">
                    {insight.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
