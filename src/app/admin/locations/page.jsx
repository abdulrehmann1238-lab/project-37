"use client";

import React, { useState } from "react";
import { MapPin, Plus, Edit3, Power, Calendar } from "lucide-react";

export default function AdminLocations() {
  const [spots, setSpots] = useState([
    {
      id: "L-14",
      name: "Pier 14 Water Terminal",
      zone: "Zone A (Waterfront)",
      price: "$180",
      occupancy: "92%",
      status: "Active",
      power: "50A Hookup",
    },
    {
      id: "L-50",
      name: "Soma Plaza Courtyard",
      zone: "Zone B (Office Hubs)",
      price: "$220",
      occupancy: "85%",
      status: "Active",
      power: "30A Hookup",
    },
    {
      id: "L-08",
      name: "Mission Park Meadow",
      zone: "Zone C (Parks)",
      price: "$110",
      occupancy: "64%",
      status: "Active",
      power: "Generator Only",
    },
    {
      id: "L-22",
      name: "Broadway Food Plaza",
      zone: "Zone A (Downtown)",
      price: "$195",
      occupancy: "78%",
      status: "Active",
      power: "50A Hookup",
    },
  ]);

  const toggleStatus = (id) => {
    setSpots((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "Active" ? "Suspended" : "Active" }
          : s,
      ),
    );
  };

  return (
    <div className="p-6 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-brand-navy">
            Location Management
          </h1>
          <p className="text-xs text-brand-slate font-medium font-sans">
            Register municipal dining corridors, adjust pricing plans, and
            toggle slot availability status.
          </p>
        </div>

        <button className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all shadow-sm">
          <Plus className="w-4 h-4 text-brand-teal shrink-0" />
          <span>Add New Location</span>
        </button>
      </div>

      <div className="space-y-4">
        {spots.map((spot) => (
          <div
            key={spot.id}
            className="bg-white border border-brand-navy/5 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            {/* Left Side */}
            <div className="space-y-4 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-extrabold text-brand-navy font-mono bg-brand-cream border border-brand-navy/5 px-2 py-0.5 rounded-full">
                  ID: {spot.id}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    spot.status === "Active"
                      ? "text-emerald-500 bg-emerald-500/10"
                      : "text-rose-500 bg-rose-500/10"
                  }`}
                >
                  {spot.status}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-brand-navy">
                  {spot.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-brand-slate">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-brand-teal" />
                    <span>{spot.zone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Power className="w-4 h-4 text-brand-teal" />
                    <span>{spot.power}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-brand-teal" />
                    <span>Occupancy: {spot.occupancy}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side price and toggle actions */}
            <div className="flex flex-row md:flex-col justify-between md:justify-end items-center md:items-end gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-brand-navy/5">
              <div className="text-left md:text-right">
                <span className="block text-[8px] text-brand-slate font-bold uppercase font-mono">
                  BASE RATE
                </span>
                <span className="text-base font-extrabold text-brand-navy font-mono">
                  {spot.price}
                  <span className="text-xs font-normal">/shift</span>
                </span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => toggleStatus(spot.id)}
                  className="px-4 py-2 rounded-full border border-brand-navy/10 hover:border-brand-navy/20 bg-brand-cream/30 text-xs font-bold text-brand-navy transition-all"
                >
                  {spot.status === "Active" ? "Suspend" : "Activate"}
                </button>
                <button className="p-2 rounded-full border border-brand-navy/10 hover:bg-brand-cream text-brand-navy transition-all">
                  <Edit3 className="w-4 h-4 shrink-0" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
