"use client";

import React from "react";
import { Compass, Sparkles, ShieldCheck, Heart } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Zoning Transparency",
      text: "We compile verified city zoning and permitting compliance rules directly into our platform filters. No fine structures or guessing permits.",
      icon: <Compass className="w-5 h-5 text-brand-teal" />,
    },
    {
      title: "Data-Driven Placements",
      text: "Location grades are derived from cell phone traffic grids, historical sales reports, and peak commute hours data.",
      icon: <Sparkles className="w-5 h-5 text-brand-teal" />,
    },
    {
      title: "Secure Operations",
      text: "Stripe secure checkouts, direct deposit payouts, and 24/7 hookup protection guarantees peace of mind.",
      icon: <ShieldCheck className="w-5 h-5 text-brand-teal" />,
    },
  ];

  return (
    <div className="pt-32 pb-20 bg-brand-warm-white text-brand-navy min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Title */}
        <div className="space-y-4 text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Streamlining street food logistics
          </h1>
          <p className="text-sm sm:text-base text-brand-slate font-medium max-w-xl mx-auto leading-relaxed">
            SpotReserve was built by food industry operators and developers
            tired of parking code negotiations, municipal permit queues, and
            cash deposit latency.
          </p>
        </div>

        {/* Mission statement */}
        <div className="p-8 rounded-3xl bg-brand-cream/40 border border-brand-navy/5 shadow-sm space-y-4">
          <h3 className="text-lg font-extrabold text-brand-navy flex items-center space-x-2">
            <Heart className="w-5 h-5 text-brand-teal shrink-0" />
            <span>Our Mission</span>
          </h3>
          <p className="text-xs text-brand-slate font-medium leading-relaxed">
            To empower gourmet culinary groups, local vendor trucks, and
            municipal planning offices with verified data grids, instant slots
            permitting, and next-day payout routing. We turn street dining spots
            into secure, high-yield retail corridors.
          </p>
        </div>

        {/* Core Values grid */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-brand-navy text-center">
            Core Platform Pillars
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-brand-navy/5 shadow-sm space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-cream/45 flex items-center justify-center border border-brand-navy/5">
                  {val.icon}
                </div>
                <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider font-mono">
                  {val.title}
                </h4>
                <p className="text-[11px] text-brand-slate font-medium leading-relaxed">
                  {val.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
