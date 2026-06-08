"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, HelpCircle, Compass, ShieldAlert, CreditCard } from "lucide-react";

export default function HelpCenterPage() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("all");

  const articles = [
    { title: "How do I download my municipal permit tag?", cat: "permits", desc: "Permits are generated automatically upon successful checkout. You can print them under Dashboard > Upcoming." },
    { title: "When do location payout deposits settle?", cat: "payouts", desc: "For Starter plans, payouts clear in 3-5 days. Premium and Enterprise plans support next-day or instant transfers." },
    { title: "What electrical hookups are available at Pier 14?", cat: "utilities", desc: "Pier 14 provides 50A utility grid outlets. Soma Plaza Courtyard provides 30A outlets. Generators are required elsewhere." },
    { title: "How do I cancel a scheduled spot reservation?", cat: "permits", desc: "Select 'Cancel Booking' inside Dashboard > Upcoming. Cancellations made 48h prior receive a 100% platform refund." }
  ];

  const filtered = articles.filter(
    (a) =>
      (activeCat === "all" || a.cat === activeCat) &&
      (a.title.toLowerCase().includes(search.toLowerCase()) || a.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="pt-32 pb-20 bg-brand-warm-white text-brand-navy min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Title */}
        <div className="text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal font-mono">Knowledge Base</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Help Center & FAQ Desk</h1>
          <p className="text-sm sm:text-base text-brand-slate font-medium max-w-xl mx-auto">
            Search documented guides on zoning, utility grid hookups, invoice billing, and direct bank payouts.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-lg mx-auto bg-white border border-brand-navy/5 rounded-full shadow-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-slate" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search help articles (e.g. payout, permit)..."
            className="w-full text-xs font-semibold text-brand-navy pl-11 pr-4 py-3.5 bg-transparent rounded-full focus:outline-none focus:border-brand-teal"
          />
        </div>

        {/* Categories Pills */}
        <div className="flex justify-center space-x-2 overflow-x-auto pb-2 border-b border-brand-navy/5 scrollbar-none">
          {["all", "permits", "payouts", "utilities"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full border transition-all ${
                activeCat === cat
                  ? "bg-brand-navy border-brand-navy text-brand-warm-white"
                  : "bg-white border-brand-navy/5 hover:border-brand-navy/15 text-brand-slate"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles List */}
        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((art, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-2.5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-2">
                  <HelpCircle className="w-4.5 h-4.5 text-brand-teal shrink-0" />
                  <h3 className="text-sm font-extrabold text-brand-navy">{art.title}</h3>
                </div>
                <p className="text-xs text-brand-slate font-medium leading-relaxed pl-6">
                  {art.desc}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-brand-slate text-xs">
              No articles found matching search parameters.
            </div>
          )}
        </div>

        {/* Live support ticket redirection footer */}
        <div className="p-6 rounded-3xl bg-brand-cream/40 border border-brand-navy/5 shadow-sm text-center space-y-4">
          <div>
            <span className="block text-xs font-bold text-brand-navy uppercase font-mono">Need live assistance?</span>
            <span className="block text-[11px] text-brand-slate font-medium mt-1">
              Create a support ticket to chat directly with a live SpotReserve zoning specialist.
            </span>
          </div>
          <Link
            href="/support"
            className="inline-flex items-center space-x-1 px-6 py-2.5 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all shadow-sm"
          >
            <span>Create Support Ticket</span>
            <ChevronRight className="w-3.5 h-3.5 text-brand-teal" />
          </Link>
        </div>
      </div>
    </div>
  );
}
