"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  ShieldCheck,
} from "lucide-react";

export default function AvailabilityCalendar() {
  const [currentMonth, setCurrentMonth] = useState("June 2026");
  const [selectedDay, setSelectedDay] = useState(12);

  // Mock days of the month with status
  const calendarDays = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    let status = "available";
    let bookingRef = "";
    let location = "";

    if ([12, 15, 18].includes(day)) {
      status = "booked";
      bookingRef =
        day === 12 ? "SR-6092-B14" : day === 15 ? "SR-8104-A9" : "SR-9912-E5";
      location = day === 15 ? "Soma Plaza Courtyard" : "Pier 14 Water Terminal";
    } else if ([24, 25].includes(day)) {
      status = "blocked";
    }

    return { day, status, bookingRef, location };
  });

  const getActiveDayInfo = () => {
    if (!selectedDay) return null;
    return calendarDays.find((d) => d.day === selectedDay) || null;
  };

  const activeDay = getActiveDayInfo();

  return (
    <div className="p-6 space-y-8">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-brand-navy">
            Scheduling Calendar
          </h1>
          <p className="text-xs text-brand-slate font-medium">
            Coordinate your food truck active dates, block-out maintenance
            slots, and review upcoming locations.
          </p>
        </div>

        <Link
          href="/marketplace"
          className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all shadow-sm"
        >
          <PlusCircle className="w-4 h-4 text-brand-teal" />
          <span>Book a New Spot</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column - Calendar matrix */}
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-brand-navy/5">
            <h3 className="text-sm font-extrabold text-brand-navy font-mono uppercase">
              {currentMonth}
            </h3>
            <div className="flex space-x-2">
              <button className="p-1.5 rounded-full hover:bg-brand-cream border border-brand-navy/5">
                <ChevronLeft className="w-4 h-4 text-brand-slate" />
              </button>
              <button className="p-1.5 rounded-full hover:bg-brand-cream border border-brand-navy/5">
                <ChevronRight className="w-4 h-4 text-brand-slate" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-[10px] text-brand-slate font-bold font-mono">
            <span>MON</span>
            <span>TUE</span>
            <span>WED</span>
            <span>THU</span>
            <span>FRI</span>
            <span>SAT</span>
            <span>SUN</span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((d) => {
              let cellStyle =
                "bg-white border-brand-navy/5 text-brand-navy hover:border-brand-teal/40";
              if (d.status === "booked") {
                cellStyle =
                  "bg-brand-navy border-brand-navy text-brand-warm-white hover:bg-brand-navy/90";
              } else if (d.status === "blocked") {
                cellStyle =
                  "bg-brand-cream-dark/40 border-brand-navy/5 text-brand-slate line-through";
              }
              if (selectedDay === d.day) {
                cellStyle += " ring-2 ring-brand-teal ring-offset-2";
              }

              return (
                <button
                  key={d.day}
                  onClick={() => setSelectedDay(d.day)}
                  className={`aspect-square rounded-xl border flex flex-col items-center justify-center text-xs font-semibold font-mono transition-all ${cellStyle}`}
                >
                  <span>{d.day}</span>
                  {d.status === "booked" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-1"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right column - Selection Details panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-xl space-y-5">
            <span className="block text-[10px] uppercase font-bold text-brand-slate tracking-wider font-mono border-b border-brand-navy/5 pb-2">
              Slot Details: June {selectedDay || "N/A"}
            </span>

            {activeDay ? (
              activeDay.status === "booked" ? (
                <div className="space-y-4 text-xs font-medium text-brand-slate">
                  <div className="flex items-center space-x-1.5 text-emerald-500 font-bold">
                    <ShieldCheck className="w-4.5 h-4.5" />
                    <span>RESERVATION ACTIVE</span>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <span className="block text-[8px] font-bold text-brand-slate uppercase font-mono">
                        LOCATION
                      </span>
                      <span className="text-sm font-extrabold text-brand-navy block mt-0.5">
                        {activeDay.location}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-bold text-brand-slate uppercase font-mono">
                        REFERENCE ID
                      </span>
                      <span className="text-brand-navy font-bold font-mono">
                        {activeDay.bookingRef}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-4 border-t border-brand-navy/5">
                    <Link
                      href="/dashboard/upcoming"
                      className="w-full text-center py-2.5 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-[10px] font-bold transition-all block"
                    >
                      Manage Booking
                    </Link>
                  </div>
                </div>
              ) : activeDay.status === "blocked" ? (
                <div className="space-y-3 text-xs text-brand-slate font-medium">
                  <p className="text-brand-navy font-bold">Zoning Block Out</p>
                  <p className="text-[10px] leading-relaxed">
                    This day is blocked due to scheduled truck maintenance or
                    permit audits. Generators and water valves will undergo
                    checks.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-xs text-brand-slate font-medium">
                  <p className="text-emerald-500 font-bold">AVAILABLE DATE</p>
                  <p className="text-[10px] leading-relaxed">
                    No active assignments booked. Secure a spot to fill
                    operations schedules.
                  </p>
                  <Link
                    href="/marketplace"
                    className="w-full text-center py-2.5 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-[10px] font-bold transition-all block"
                  >
                    Select Location Spot
                  </Link>
                </div>
              )
            ) : (
              <span className="text-xs text-brand-slate font-medium block">
                Select a date cell to view active shift schedules.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
