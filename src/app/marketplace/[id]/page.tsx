"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Star,
  Zap,
  Clock,
  DollarSign,
  TrendingUp,
  Award,
  ShieldCheck,
  ChevronRight,
  Wifi,
  Trash2,
  Calendar,
  Layers,
  ArrowLeft,
  ThumbsUp
} from "lucide-react";

interface SpotDetail {
  id: string;
  name: string;
  category: string;
  price: number;
  occupancy: number;
  capacity: string;
  power: string;
  rating: number;
  reviewsCount: number;
  coords: { x: number; y: number };
  description: string;
  amenities: { name: string; icon: React.ReactNode }[];
  payoutTime: string;
  trafficVolume: string;
  historicalSales: { day: string; count: number }[];
  hourlyTraffic: { hour: string; traffic: number }[];
  reviews: { author: string; rating: number; date: string; content: string }[];
}

const mockDetails: Record<string, SpotDetail> = {
  "pier-14": {
    id: "pier-14",
    name: "Pier 14 Water Terminal",
    category: "Waterfront",
    price: 180,
    occupancy: 92,
    capacity: "Up to 32ft truck size",
    power: "50A Grid Hookup",
    rating: 4.9,
    reviewsCount: 38,
    coords: { x: 250, y: 180 },
    description: "Nestled along the main waterfront corridor, Pier 14 connects major corporate headquarters with ferry terminals. It attracts an exceptional lunch rush from Monday to Friday, followed by solid evening crowds looking for gourmet dining before boarding.",
    amenities: [
      { name: "50A Electrical Hookup", icon: <Zap className="w-4 h-4 text-brand-teal" /> },
      { name: "WiFi Hotspot (SpotNet)", icon: <Wifi className="w-4 h-4 text-brand-teal" /> },
      { name: "Trash Valet & Recycle", icon: <Trash2 className="w-4 h-4 text-brand-teal" /> },
      { name: "24/7 Security Patrols", icon: <ShieldCheck className="w-4 h-4 text-brand-teal" /> }
    ],
    payoutTime: "Next-Day Direct Payout",
    trafficVolume: "12,000 visitors daily average",
    historicalSales: [
      { day: "Mon", count: 480 },
      { day: "Tue", count: 590 },
      { day: "Wed", count: 620 },
      { day: "Thu", count: 710 },
      { day: "Fri", count: 880 },
      { day: "Sat", count: 420 },
      { day: "Sun", count: 350 }
    ],
    hourlyTraffic: [
      { hour: "10am", traffic: 20 },
      { hour: "12pm", traffic: 95 },
      { hour: "2pm", traffic: 40 },
      { hour: "4pm", traffic: 30 },
      { hour: "6pm", traffic: 80 },
      { hour: "8pm", traffic: 60 }
    ],
    reviews: [
      {
        author: "Marcus Vance (Pizza Truck)",
        rating: 5,
        date: "June 2, 2026",
        content: "Absolutely the best spot in our portfolio. The lunch rush from the financial towers next door is like clockwork. Hooking up to the 50A grid is simple and saves us $30/day in generator fuel!"
      },
      {
        author: "Sarah Lin (Sushi Bowls)",
        rating: 5,
        date: "May 28, 2026",
        content: "Very high foot traffic, and the SpotReserve app check-in is seamless. Payouts arrive in our bank account the next morning without issues."
      }
    ]
  }
};

export default function LocationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  // Fallback to pier-14 if path param isn't in details list
  const spot = mockDetails[id] || mockDetails["pier-14"];

  const [selectedShift, setSelectedShift] = useState<"morning" | "evening" | "full">("morning");
  const [selectedDate, setSelectedDate] = useState("2026-06-12");

  const calendarDays = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  // Shift pricing details
  const getPrice = () => {
    if (selectedShift === "full") return spot.price * 1.6;
    if (selectedShift === "evening") return spot.price * 1.1;
    return spot.price;
  };

  return (
    <div className="pt-28 pb-20 bg-brand-warm-white text-brand-navy min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-brand-slate uppercase font-mono">
          <Link href="/marketplace" className="hover:text-brand-teal flex items-center space-x-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Marketplace</span>
          </Link>
          <span>/</span>
          <span className="text-brand-navy">{spot.name}</span>
        </div>

        {/* Header Title & Ratings */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5">
              <span className="text-xs font-bold uppercase tracking-wider bg-brand-cream border border-brand-navy/5 px-2.5 py-0.5 rounded-full text-brand-slate">
                {spot.category}
              </span>
              <span className="text-xs font-extrabold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                {spot.occupancy}% Occupancy Rate
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-brand-navy">{spot.name}</h1>
            <div className="flex items-center space-x-4 text-xs font-semibold text-brand-slate">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-brand-navy font-bold">{spot.rating}</span>
                <span>({spot.reviewsCount} reviews)</span>
              </div>
              <span>•</span>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4 text-brand-teal" />
                <span>Downtown Corridor, Zone A</span>
              </div>
            </div>
          </div>

          <Link
            href={`/reserve/${spot.id}`}
            className="px-8 py-3.5 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white font-semibold text-xs transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-navy/15"
          >
            <span>Initiate Reservation wizard</span>
            <ChevronRight className="w-4 h-4 text-brand-teal" />
          </Link>
        </div>

        {/* Premium Graphic Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-[280px] sm:h-[350px]">
          {/* Main big image placeholder */}
          <div className="md:col-span-8 rounded-2xl bg-brand-cream border border-brand-navy/5 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-cream-dark to-brand-cream opacity-40"></div>
            <Layers className="w-12 h-12 text-brand-slate/30 mb-2" />
            <span className="absolute bottom-4 left-4 text-xs font-bold text-brand-slate font-mono uppercase bg-white/80 backdrop-blur-md px-3 py-1 rounded-full">
              Exterior Waterfront View
            </span>
          </div>

          {/* Sub images side column */}
          <div className="md:col-span-4 grid grid-rows-2 gap-4 h-full">
            <div className="rounded-2xl bg-brand-cream border border-brand-navy/5 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-cream-dark to-brand-cream opacity-40"></div>
              <Zap className="w-8 h-8 text-brand-slate/30" />
              <span className="absolute bottom-3 left-3 text-[10px] font-bold text-brand-slate font-mono uppercase bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-full">
                50A Utility Hookup
              </span>
            </div>
            <div className="rounded-2xl bg-brand-cream border border-brand-navy/5 relative overflow-hidden flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-cream-dark to-brand-cream opacity-40"></div>
              <Clock className="w-8 h-8 text-brand-slate/30" />
              <span className="absolute bottom-3 left-3 text-[10px] font-bold text-brand-slate font-mono uppercase bg-white/80 backdrop-blur-md px-2 py-0.5 rounded-full">
                Lunch Crowd Corridor
              </span>
            </div>
          </div>
        </div>

        {/* Content Splitting Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column - Details */}
          <div className="lg:col-span-8 space-y-10">
            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-brand-navy">About this location</h3>
              <p className="text-sm text-brand-slate leading-relaxed font-medium">
                {spot.description}
              </p>
            </div>

            {/* Amenities Checkboxes */}
            <div className="space-y-4 border-t border-brand-navy/5 pt-8">
              <h3 className="text-xl font-bold text-brand-navy">Included Amenities</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {spot.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-brand-cream/40 border border-brand-navy/5 shadow-sm"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                      {amenity.icon}
                    </div>
                    <span className="text-xs font-semibold text-brand-navy">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Performance Graphics (Recharts Simulation) */}
            <div className="space-y-6 border-t border-brand-navy/5 pt-8">
              <h3 className="text-xl font-bold text-brand-navy">Historical Performance & Traffic</h3>
              <p className="text-xs text-brand-slate font-medium">
                Review historical weekly customer metrics and hourly traffic distribution below to estimate menu logistics.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weekly Customers */}
                <div className="p-5 rounded-2xl bg-white border border-brand-navy/5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-brand-navy uppercase font-mono">Weekly Customer Count</span>
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="h-44 flex items-end justify-between gap-2 pt-2">
                    {spot.historicalSales.map((item, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center space-y-1.5">
                        <div className="w-full bg-brand-cream rounded-t-sm h-32 relative">
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-brand-teal rounded-t-sm"
                            style={{ height: `${(item.count / 900) * 100}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-brand-slate font-mono">{item.day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hourly traffic line simulation */}
                <div className="p-5 rounded-2xl bg-white border border-brand-navy/5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-brand-navy uppercase font-mono">Hourly Busy Index</span>
                    <Clock className="w-4 h-4 text-brand-blue" />
                  </div>
                  <div className="h-44 flex items-end justify-between gap-2 pt-2">
                    {spot.hourlyTraffic.map((item, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center space-y-1.5">
                        <div className="w-full bg-brand-cream rounded-t-sm h-32 relative">
                          <div
                            className="absolute bottom-0 left-0 right-0 bg-brand-blue rounded-t-sm"
                            style={{ height: `${item.traffic}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-bold text-brand-slate font-mono">{item.hour}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews list */}
            <div className="space-y-6 border-t border-brand-navy/5 pt-8">
              <h3 className="text-xl font-bold text-brand-navy">Truck Vendor Reviews</h3>
              <div className="space-y-4">
                {spot.reviews.map((review, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-brand-navy/5 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-xs font-bold text-brand-navy">{review.author}</span>
                        <span className="block text-[10px] text-brand-slate font-semibold">{review.date}</span>
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-brand-slate font-medium leading-relaxed italic">
                      "{review.content}"
                    </p>
                    <button className="flex items-center space-x-1 text-[10px] font-bold text-brand-teal uppercase font-mono hover:underline">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Helpful (4)</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card widget */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-xl space-y-6">
              {/* Pricing section */}
              <div className="pb-4 border-b border-brand-navy/5">
                <span className="block text-[10px] text-brand-slate font-bold uppercase">SPOT RATE</span>
                <div className="flex items-baseline space-x-1 mt-1">
                  <span className="text-3xl font-extrabold text-brand-navy font-mono">${getPrice()}</span>
                  <span className="text-xs font-semibold text-brand-slate">/shift</span>
                </div>
              </div>

              {/* Form elements */}
              <div className="space-y-4">
                {/* Date Selection */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-slate mb-1.5 font-mono">
                    Select Date
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full text-xs font-semibold text-brand-navy bg-brand-cream/40 border border-brand-navy/5 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal"
                  >
                    {calendarDays.map((d, idx) => (
                      <option key={idx} value={d}>
                        {new Date(d).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric"
                        })}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Shift Selector */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-brand-slate mb-1.5 font-mono">
                    Select Shift Slot
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSelectedShift("morning")}
                      className={`py-2 px-1 rounded-xl text-[10px] font-bold uppercase border transition-all text-center ${
                        selectedShift === "morning"
                          ? "bg-brand-navy border-brand-navy text-brand-warm-white shadow-md"
                          : "bg-white border-brand-navy/5 hover:border-brand-navy/15 text-brand-slate"
                      }`}
                    >
                      <span className="block">Lunch</span>
                      <span className="text-[8px] font-normal block font-sans lowercase mt-0.5">10am-3pm</span>
                    </button>
                    <button
                      onClick={() => setSelectedShift("evening")}
                      className={`py-2 px-1 rounded-xl text-[10px] font-bold uppercase border transition-all text-center ${
                        selectedShift === "evening"
                          ? "bg-brand-navy border-brand-navy text-brand-warm-white shadow-md"
                          : "bg-white border-brand-navy/5 hover:border-brand-navy/15 text-brand-slate"
                      }`}
                    >
                      <span className="block">Dinner</span>
                      <span className="text-[8px] font-normal block font-sans lowercase mt-0.5">4pm-9pm</span>
                    </button>
                    <button
                      onClick={() => setSelectedShift("full")}
                      className={`py-2 px-1 rounded-xl text-[10px] font-bold uppercase border transition-all text-center ${
                        selectedShift === "full"
                          ? "bg-brand-navy border-brand-navy text-brand-warm-white shadow-md"
                          : "bg-white border-brand-navy/5 hover:border-brand-navy/15 text-brand-slate"
                      }`}
                    >
                      <span className="block">Full-Day</span>
                      <span className="text-[8px] font-normal block font-sans lowercase mt-0.5">save 20%</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Calculation breakdown */}
              <div className="bg-brand-cream/30 border border-brand-navy/5 p-4 rounded-2xl space-y-2 text-xs font-medium text-brand-slate">
                <div className="flex justify-between">
                  <span>Shift Rate</span>
                  <span className="font-mono text-brand-navy font-bold">${getPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Permitting Fee</span>
                  <span className="font-mono text-brand-navy font-bold">$15.00</span>
                </div>
                <div className="flex justify-between border-t border-brand-navy/5 pt-2 font-bold text-brand-navy text-sm">
                  <span>Total Amount</span>
                  <span className="font-mono text-brand-teal font-extrabold">${(getPrice() + 15).toFixed(2)}</span>
                </div>
              </div>

              {/* Book Button */}
              <Link
                href={`/reserve/${spot.id}?date=${selectedDate}&shift=${selectedShift}`}
                className="w-full text-center py-4 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all block shadow-lg shadow-brand-navy/15"
              >
                Reserve Location Spot
              </Link>

              <div className="text-center">
                <span className="text-[9px] uppercase font-bold text-brand-slate/40 tracking-wider">
                  Permits auto-authorized upon checkout
                </span>
              </div>
            </div>

            {/* Quality assurance box */}
            <div className="p-4 rounded-2xl bg-brand-cream/60 border border-brand-navy/5 flex items-start space-x-3 text-xs font-semibold text-brand-slate shadow-sm">
              <Award className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
              <div>
                <span className="block text-brand-navy font-bold">SpotReserve Trust Guarantee</span>
                <span className="block text-[10px] text-brand-slate font-medium leading-relaxed mt-0.5">
                  Full refund if severe weather alert cancels operations, or if utility hookup experiences technical issues.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
