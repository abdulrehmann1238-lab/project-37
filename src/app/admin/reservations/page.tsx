"use client";

import React, { useState } from "react";
import { Search, MapPin, Truck, Calendar, Trash2, ArrowUpRight } from "lucide-react";

export default function AdminReservations() {
  const [search, setSearch] = useState("");

  const [bookings, setBookings] = useState([
    { id: "SR-6092-B14", truck: "Fire & Slice Pizza", spot: "Pier 14 Water Terminal", date: "June 12, 2026", shift: "Lunch", amount: "$195.00", status: "Active" },
    { id: "SR-8104-A9", truck: "Taco Loco Express", spot: "Soma Plaza Courtyard", date: "June 15, 2026", shift: "Dinner", amount: "$235.00", status: "Active" },
    { id: "SR-9912-E5", truck: "Fire & Slice Pizza", spot: "Pier 14 Water Terminal", date: "June 18, 2026", shift: "Full-Day", amount: "$303.00", status: "Active" },
    { id: "SR-5219-F2", truck: "Green Garden Bowls", spot: "Pier 14 Water Terminal", date: "May 28, 2026", shift: "Lunch", amount: "$195.00", status: "Completed" },
    { id: "SR-4812-G8", truck: "Waffle Wonders", spot: "Soma Plaza Courtyard", date: "May 24, 2026", shift: "Dinner", amount: "$235.00", status: "Completed" }
  ]);

  const cancelBooking = (id: string) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b)));
  };

  const filteredBookings = bookings.filter(
    (b) =>
      b.truck.toLowerCase().includes(search.toLowerCase()) ||
      b.spot.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-brand-navy">Reservation Activity</h1>
        <p className="text-xs text-brand-slate font-medium font-sans">Audit real-time spot occupancy logs, track operator permits, and coordinate check-in codes.</p>
      </div>

      {/* Filter and Search controls */}
      <div className="bg-white border border-brand-navy/5 p-4 rounded-2xl shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-slate" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reference, operator or location..."
            className="w-full text-xs bg-brand-cream/20 border border-brand-navy/5 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-brand-teal"
          />
        </div>
      </div>

      {/* Bookings rows */}
      <div className="space-y-4">
        {filteredBookings.map((b) => (
          <div
            key={b.id}
            className="bg-white border border-brand-navy/5 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            {/* Left Info */}
            <div className="space-y-4 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-extrabold text-brand-navy font-mono bg-brand-cream border border-brand-navy/5 px-2 py-0.5 rounded-full">
                  REF: {b.id}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  b.status === "Active" ? "text-emerald-500 bg-emerald-500/10" : b.status === "Completed" ? "text-brand-blue bg-brand-blue/10" : "text-rose-500 bg-rose-500/10"
                }`}>
                  {b.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-brand-teal shrink-0" />
                  <span className="font-extrabold text-brand-navy text-base">{b.truck}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-brand-slate">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-brand-teal" />
                    <span>{b.spot}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-brand-teal" />
                    <span>{b.date} • {b.shift}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Rate and actions */}
            <div className="flex flex-row md:flex-col justify-between md:justify-end items-center md:items-end gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-brand-navy/5">
              <div className="text-left md:text-right">
                <span className="block text-[8px] text-brand-slate font-bold uppercase font-mono">REVENUE INVOICED</span>
                <span className="text-base font-extrabold text-brand-navy font-mono">{b.amount}</span>
              </div>

              {b.status === "Active" && (
                <button
                  onClick={() => cancelBooking(b.id)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-full border border-rose-500/10 hover:bg-rose-50 text-xs font-bold text-rose-500 transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Void Booking</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
