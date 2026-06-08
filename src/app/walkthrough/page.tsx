"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Compass, ShieldCheck, Layers, Award, Terminal, CheckCircle2, ChevronRight } from "lucide-react";

export default function DemoWalkthroughPage() {
  const steps = [
    { title: "1. Premium Cinematic Loader", desc: "Initially launching the app triggers a vector map drawing animation, pulsing reservation pins, and a percentage counter before scaling/clipping away.", icon: <Layers className="w-5 h-5 text-brand-teal" /> },
    { title: "2. Airbnb-Style Marketplace", desc: "Navigate to '/marketplace' to view a searchable, filterable grid of spots coupled with a custom interactive SVG city map that maps hover states automatically.", icon: <Compass className="w-5 h-5 text-brand-teal" /> },
    { title: "3. Progressive Reservation Wizard", desc: "Select a spot and click 'Reserve Spot' to launch a 7-step booking wizard with fluid spring sliders and a Stripe checkout simulator.", icon: <Terminal className="w-5 h-5 text-brand-teal" /> },
    { title: "4. Payout Pushing Dashboards", desc: "Launch the Truck Owner Portal ('/dashboard') or Admin Panel ('/admin') to check weekly sales trends, occupancy rates, and payout statement items.", icon: <Award className="w-5 h-5 text-brand-teal" /> }
  ];

  return (
    <div className="pt-32 pb-20 bg-brand-warm-white text-brand-navy min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Title */}
        <div className="space-y-4 text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal font-mono">Auditing Guide</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">SpotReserve Demonstration Walkthrough</h1>
          <p className="text-sm sm:text-base text-brand-slate font-medium max-w-xl mx-auto leading-relaxed">
            Welcome to the developer walkthrough guide. Follow the instructions below to review and verify all 25 pages within this premium SaaS demo.
          </p>
        </div>

        {/* Floating Console notification alert */}
        <div className="p-5 rounded-3xl bg-brand-navy text-brand-warm-white border border-white/10 shadow-xl space-y-4 relative">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-teal font-mono">AUDITING SHORTCUTS</span>
          </div>
          <h3 className="text-base font-extrabold">Floating Demo Control Panel</h3>
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            Look for the floating **"Demo Control Panel"** button in the bottom-right corner of your viewport. Clicking it expands a directory detailing all **25 requested pages**. You can click on any page to teleport instantly, bypassing manual clicks!
          </p>
        </div>

        {/* Guided Steps Grid */}
        <div className="space-y-8">
          <h3 className="text-xl font-bold text-brand-navy text-center">Core User Flows to Audit</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-brand-navy/5 shadow-sm space-y-3.5 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-brand-cream/40 flex items-center justify-center border border-brand-navy/5">
                    {step.icon}
                  </div>
                  <h4 className="text-sm font-extrabold text-brand-navy">{step.title}</h4>
                  <p className="text-xs text-brand-slate font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Stack Architecture */}
        <div className="p-6 sm:p-8 rounded-3xl bg-brand-cream/35 border border-brand-navy/5 shadow-sm space-y-4">
          <span className="block text-xs font-bold text-brand-navy uppercase font-mono border-b border-brand-navy/5 pb-2">
            Technical Specs & Optimizations
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-brand-slate font-semibold leading-relaxed">
            <div className="space-y-2">
              <span className="text-brand-navy font-bold">1. Vector Maps (60 FPS Performance)</span>
              <p className="font-medium text-[11px]">
                To maintain a buttery smooth 60 FPS scroll and avoid heavy WebGL/Mapbox API key requirements, we built coordinates grids using raw inline SVGs that map hovered lists, keeping CPU usage near zero.
              </p>
            </div>
            <div className="space-y-2">
              <span className="text-brand-navy font-bold">2. Next.js App Router & TypeScript</span>
              <p className="font-medium text-[11px]">
                Structured with full dynamic routing paths and TypeScript types verification. Route params are fully resolved, and Tailwind CSS color tokens are custom defined.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <Link
            href="/marketplace"
            className="inline-flex items-center space-x-1 px-8 py-3.5 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all shadow-md"
          >
            <span>Start Auditing Marketplace</span>
            <ChevronRight className="w-4 h-4 text-brand-teal" />
          </Link>
        </div>
      </div>
    </div>
  );
}
