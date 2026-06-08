"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MapPin, Calendar, Clock, Download, XCircle, Info, ShieldCheck } from "lucide-react";

export default function UpcomingBookings() {
  const [bookings, setBookings] = useState([
    {
      id: "SR-6092-B14",
      location: "Pier 14 Water Terminal",
      address: "14 Embarcadero, SF",
      date: "June 12, 2026",
      shift: "Lunch Shift (10am-3pm)",
      power: "50A Hookup",
      rate: "$195.00",
      status: "Confirmed"
    },
    {
      id: "SR-8104-A9",
      location: "Soma Plaza Courtyard",
      address: "500 Howard St, SF",
      date: "June 15, 2026",
      shift: "Dinner Shift (4pm-9pm)",
      power: "30A Hookup",
      rate: "$235.00",
      status: "Confirmed"
    },
    {
      id: "SR-9912-E5",
      location: "Pier 14 Water Terminal",
      address: "14 Embarcadero, SF",
      date: "June 18, 2026",
      shift: "Full-Day Shift (10am-9pm)",
      power: "50A Hookup",
      rate: "$303.00",
      status: "Confirmed"
    }
  ]);

  const handleCancel = (id: string) => {
    // In mock data, set status or remove
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-brand-navy">Upcoming Bookings</h1>
        <p className="text-xs text-brand-slate font-medium">Verify permits and configure scheduling details for upcoming location assignments.</p>
      </div>

      <div className="space-y-4">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white border border-brand-navy/5 rounded-3xl p-6 shadow-sm space-y-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Side details */}
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-extrabold text-brand-navy font-mono bg-brand-cream border border-brand-navy/5 px-2 py-0.5 rounded-full">
                    REF: {booking.id}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Permit Active</span>
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-brand-navy">{booking.location}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-semibold text-brand-slate">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-brand-teal" />
                      <span>{booking.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-brand-teal" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-brand-teal" />
                      <span>{booking.shift}</span>
                    </div>
                  </div>
                </div>

                {/* Logistics tags */}
                <div className="flex space-x-4 border-t border-brand-navy/5 pt-4 text-xs font-medium text-brand-slate">
                  <div>
                    <span className="block text-[8px] font-bold text-brand-slate uppercase font-mono">UTILITY</span>
                    <span className="text-brand-navy font-semibold">{booking.power}</span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-brand-slate uppercase font-mono">INVOICED AMOUNT</span>
                    <span className="text-brand-navy font-semibold font-mono">{booking.rate}</span>
                  </div>
                </div>
              </div>

              {/* Right Side action items */}
              <div className="flex flex-row md:flex-col justify-end items-center md:items-end gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-brand-navy/5">
                <button className="flex items-center space-x-1.5 px-4 py-2 rounded-full border border-brand-navy/10 hover:border-brand-navy/20 text-xs font-bold text-brand-navy bg-brand-cream/30 transition-all">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Permit</span>
                </button>
                <button
                  onClick={() => handleCancel(booking.id)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-full border border-rose-500/10 hover:bg-rose-50 text-xs font-bold text-rose-500 transition-all"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Cancel Booking</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white border border-brand-navy/5 rounded-3xl space-y-4">
            <span className="text-xs text-brand-slate font-semibold block">No upcoming bookings.</span>
            <Link
              href="/marketplace"
              className="px-6 py-2.5 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all inline-block shadow-sm"
            >
              Browse Spots
            </Link>
          </div>
        )}
      </div>

      <div className="p-4 rounded-2xl bg-brand-cream/40 border border-brand-navy/5 flex items-start space-x-3 text-xs font-semibold text-brand-slate shadow-sm">
        <Info className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
        <div>
          <span className="block text-brand-navy font-bold">Cancellation policy</span>
          <span className="block text-[10px] text-brand-slate font-medium leading-relaxed mt-0.5">
            Cancellations made more than 48 hours prior to the reserved shift slot are eligible for a 100% platform credit refund. Late cancellations are charged a 30% retention fee for city zoning holds.
          </span>
        </div>
      </div>
    </div>
  );
}
