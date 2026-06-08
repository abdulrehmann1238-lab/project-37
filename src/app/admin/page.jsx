"use client";

import React, { useState } from "react";
import { Truck, TrendingUp, RefreshCw, X, Check } from "lucide-react";

export default function AdminOverview() {
  const [approvals, setApprovals] = useState([
    {
      id: "APP-402",
      name: "Green Garden Bowls",
      owner: "Elena Rostova",
      permit: "SF-FT-89104",
      type: "Salad Bowls",
    },
    {
      id: "APP-405",
      name: "Waffle Wonders",
      owner: "Danielle K.",
      permit: "SF-FT-12093",
      type: "Desserts / Waffles",
    },
    {
      id: "APP-409",
      name: "Spice Route Express",
      owner: "Rohan Nair",
      permit: "SF-FT-33491",
      type: "Indian Street Food",
    },
  ]);

  const stats = [
    {
      label: "SaaS Gross Volume",
      value: "$104,820.50",
      change: "+24.2% MoM",
      color: "text-brand-teal",
    },
    {
      label: "Active Permitted Trucks",
      value: "124 Trucks",
      change: "System Active",
      color: "text-brand-navy",
    },
    {
      label: "Global Occupancy Rate",
      value: "84.2%",
      change: "+3.8% MoM",
      color: "text-brand-blue",
    },
    {
      label: "Compliance Audits",
      value: "98.7% Clean",
      change: "0 Alerts",
      color: "text-emerald-500",
    },
  ];

  const activityLog = [
    {
      event: "Carlos Mendez checked in",
      details: "Pier 14 Spot B2, GPS verified",
      time: "5 mins ago",
    },
    {
      event: "Payment cleared",
      details: "Booking SR-6092-B14 ($195.00)",
      time: "18 mins ago",
    },
    {
      id: "TXN",
      event: "New Reservation completed",
      details: "Marcus Vance booked Pier 14",
      time: "1 hour ago",
    },
    {
      event: "License renewal verified",
      details: "Fire & Slice (SF-FT-94021)",
      time: "3 hours ago",
    },
  ];

  const handleApprove = (id) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  const handleReject = (id) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="p-6 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-brand-navy">
            Admin Console Overview
          </h1>
          <p className="text-xs text-brand-slate font-medium font-sans">
            Monitor platform-wide transactional activity, health code permits
            compliance, and spot utilization.
          </p>
        </div>

        <button className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full border border-brand-navy/10 hover:bg-brand-cream/55 text-xs font-bold text-brand-navy bg-white transition-all shadow-sm">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh System Data</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-brand-navy/5 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <span className="block text-[10px] uppercase font-bold text-brand-slate tracking-wider font-mono">
              {stat.label}
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span
                className={`text-xl sm:text-2xl font-extrabold font-mono ${stat.color}`}
              >
                {stat.value}
              </span>
              <span className="text-[10px] font-bold text-emerald-500 font-mono">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Recharts chart simulation widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Analytics bar chart card */}
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-xs font-bold text-brand-navy uppercase font-mono">
                Global Occupancy Levels by Zone
              </span>
              <span className="text-[10px] text-brand-slate font-medium">
                Comparative traffic metrics across city segments
              </span>
            </div>
            <TrendingUp className="w-4 h-4 text-brand-teal" />
          </div>

          <div className="h-48 flex items-end justify-between gap-4 pt-4 border-t border-brand-navy/5">
            {[90, 85, 62, 78, 55].map((h, i) => {
              const categories = [
                "Waterfront",
                "Office Hubs",
                "Parks",
                "Downtown",
                "Suburbs",
              ];
              return (
                <div
                  key={i}
                  className="flex-grow flex flex-col items-center space-y-2"
                >
                  <div className="w-12 bg-brand-cream rounded-t-lg h-36 relative overflow-hidden">
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-brand-blue"
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-bold text-brand-slate font-mono">
                    {categories[i]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* System activity log feed */}
        <div className="lg:col-span-4 p-5 sm:p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-4">
          <span className="block text-xs font-bold text-brand-navy uppercase font-mono border-b border-brand-navy/5 pb-2">
            Live Activities Stream
          </span>

          <div className="space-y-4">
            {activityLog.map((log, idx) => (
              <div
                key={idx}
                className="flex justify-between items-start text-xs font-medium text-brand-slate"
              >
                <div className="space-y-0.5">
                  <span className="block font-bold text-brand-navy">
                    {log.event}
                  </span>
                  <span className="block text-[10px] text-brand-slate">
                    {log.details}
                  </span>
                </div>
                <span className="text-[9px] text-brand-slate/60 font-mono font-bold shrink-0">
                  {log.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pending Approval Requests */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-4">
        <span className="block text-xs font-bold text-brand-navy uppercase font-mono">
          Pending Compliance Approvals ({approvals.length})
        </span>

        <div className="space-y-3">
          {approvals.length > 0 ? (
            approvals.map((req) => (
              <div
                key={req.id}
                className="p-4 rounded-2xl bg-brand-sand border border-brand-navy/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-medium text-brand-slate"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-navy border border-brand-navy/5 shrink-0 shadow-sm">
                    <Truck className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-extrabold text-brand-navy">
                        {req.name}
                      </h4>
                      <span className="text-[9px] text-brand-slate font-mono bg-brand-cream px-1.5 py-0.5 rounded border border-brand-navy/5">
                        REF: {req.id}
                      </span>
                    </div>
                    <span className="text-[10px] text-brand-slate block mt-0.5">
                      Owner: {req.owner} • Cuisine: {req.type}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-brand-navy/5">
                  <button
                    onClick={() => handleReject(req.id)}
                    className="p-2 rounded-full hover:bg-rose-50 text-rose-500 border border-brand-navy/5 hover:border-rose-100 transition-colors"
                  >
                    <X className="w-4 h-4 shrink-0" />
                  </button>
                  <button
                    onClick={() => handleApprove(req.id)}
                    className="p-2 rounded-full bg-brand-navy hover:bg-emerald-500 text-brand-teal hover:text-white transition-colors"
                  >
                    <Check className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-brand-slate">
              <span className="font-semibold block">
                All compliance reviews complete.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
