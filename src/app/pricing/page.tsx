"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Info, ShieldCheck } from "lucide-react";

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("annual");

  const plans = [
    {
      name: "Starter Spot",
      desc: "Perfect for single food truck operators getting started.",
      price: billingPeriod === "annual" ? 49 : 59,
      features: [
        "Book up to 3 spots concurrently",
        "Standard location filters",
        "Standard payout transfer speeds (3-5 days)",
        "Email support response in 24h",
        "Basic sales metrics reports"
      ]
    },
    {
      name: "Fleet Premium",
      desc: "Ideal for operators running a fleet of 2-5 food trucks.",
      price: billingPeriod === "annual" ? 99 : 119,
      recommended: true,
      features: [
        "Book up to 10 spots concurrently",
        "Advanced Location Intelligence data",
        "Next-day payout speeds",
        "Priority support via chat (under 2h)",
        "In-depth Recharts weekly reports",
        "Crew invites & manager accounts"
      ]
    },
    {
      name: "Enterprise Group",
      desc: "For franchises, dining groups, and fleets over 5 trucks.",
      price: billingPeriod === "annual" ? 199 : 239,
      features: [
        "Unlimited concurrent spot bookings",
        "Zoning database API access",
        "Instant cash-out payouts",
        "Dedicated accounts support manager",
        "Custom municipality permits templates",
        "Advanced team role hierarchies"
      ]
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-brand-warm-white text-brand-navy min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">SpotReserve Pricing</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Flexible plans for food truck operators</h1>
          <p className="text-sm sm:text-base text-brand-slate font-medium">
            Choose the plan that matches your truck capacity. Save 20% by subscribing to annual billing.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center bg-brand-cream border border-brand-navy/5 p-1 rounded-full mt-6">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                billingPeriod === "monthly" ? "bg-brand-navy text-brand-warm-white shadow-md" : "text-brand-slate"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                billingPeriod === "annual" ? "bg-brand-navy text-brand-warm-white shadow-md" : "text-brand-slate"
              }`}
            >
              <span>Annually</span>
              <span className="text-[9px] bg-brand-teal text-brand-warm-white px-2 py-0.5 rounded-full lowercase font-semibold">
                save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                plan.recommended
                  ? "bg-brand-navy text-brand-warm-white shadow-2xl relative overflow-hidden border border-white/5"
                  : "bg-white border border-brand-navy/5 shadow-sm hover:border-brand-navy/15"
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-4 right-4 bg-brand-teal text-brand-warm-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  Recommended
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <span className={`text-xs font-bold uppercase tracking-wider ${plan.recommended ? "text-brand-teal" : "text-brand-slate"}`}>
                    {plan.name}
                  </span>
                  <div className="flex items-baseline space-x-1 mt-3">
                    <span className="text-3xl font-extrabold font-mono">${plan.price}</span>
                    <span className={`text-xs ${plan.recommended ? "text-slate-400" : "text-brand-slate"}`}>/mo</span>
                  </div>
                  <p className={`text-xs font-medium mt-2 leading-relaxed ${plan.recommended ? "text-slate-300" : "text-brand-slate"}`}>
                    {plan.desc}
                  </p>
                </div>

                <div className={`border-t pt-6 space-y-3.5 ${plan.recommended ? "border-white/10" : "border-brand-navy/5"}`}>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start space-x-2.5 text-xs font-semibold">
                      <Check className="w-4.5 h-4.5 text-brand-teal shrink-0 mt-0.5" />
                      <span className={plan.recommended ? "text-slate-200" : "text-brand-navy"}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/reserve/pier-14"
                className={`w-full text-center py-3.5 rounded-full text-xs font-bold transition-all mt-8 block ${
                  plan.recommended
                    ? "bg-brand-teal hover:bg-brand-teal-dark text-brand-warm-white"
                    : "border border-brand-navy/10 hover:border-brand-navy/20 hover:bg-brand-cream/40 text-brand-navy"
                }`}
              >
                Get Started Now
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ section */}
        <div className="max-w-4xl mx-auto space-y-8 border-t border-brand-navy/5 pt-16">
          <h3 className="text-2xl font-extrabold text-brand-navy text-center">Frequently Asked Questions</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-semibold text-brand-slate">
            <div className="space-y-2">
              <h4 className="text-brand-navy font-bold">Are city permitting fees included in the subscription?</h4>
              <p className="leading-relaxed font-medium">
                No, city permitting and parking fees are charged per shift reserved, depending on the location grade. The subscription covers booking queue access, location intelligence reports, next-day payout transfers, and automated scheduling dashboards.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-brand-navy font-bold">Can I switch plans or cancel mid-subscription?</h4>
              <p className="leading-relaxed font-medium">
                Yes, you can upgrade, downgrade, or cancel your active plan at any time inside your Profile settings page. Changes take effect on the next billing statement period.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
