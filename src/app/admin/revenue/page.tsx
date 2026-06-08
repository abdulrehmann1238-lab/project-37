"use client";

import React, { useState } from "react";
import { Landmark, ArrowUpRight, TrendingUp, Landmark as BankIcon, Save, ShieldCheck } from "lucide-react";

export default function AdminRevenue() {
  const [takeRate, setTakeRate] = useState("15");
  const [savedAlert, setSavedAlert] = useState(false);

  const cards = [
    { label: "SaaS Gross Merchandise Value (GMV)", value: "$104,820.50", change: "+18.4% MoM", desc: "Across all active spots" },
    { label: "Platform Take-Rate (Commission)", value: "$15,723.07", change: `${takeRate}% Config.`, desc: "SpotReserve platform cut" },
    { label: "Total Paid Out to Operators", value: "$89,097.43", change: "98.2% settled", desc: "Chase Automated Payouts" },
    { label: "Pending Payout settlements", value: "$1,625.50", change: "Standard 24h", desc: "Awaiting next banking cycle" }
  ];

  const payouts = [
    { id: "PAY-9041", operator: "Fire & Slice Pizza", bank: "Chase checking (*4902)", amount: "$2,104.20", date: "June 6, 2026", status: "Settled" },
    { id: "PAY-8821", operator: "Taco Loco Express", bank: "Wells Fargo checking (*0821)", amount: "$1,640.00", date: "June 4, 2026", status: "Settled" },
    { id: "PAY-7038", operator: "Green Garden Bowls", bank: "BofA checking (*9401)", amount: "$908.17", date: "May 28, 2026", status: "Settled" }
  ];

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
    }, 3000);
  };

  return (
    <div className="p-6 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-brand-navy">Revenue Reports & Platform Fees</h1>
        <p className="text-xs text-brand-slate font-medium font-sans">Audit platform-wide transaction invoices, configure take-rate commissions, and review payout settlement logs.</p>
      </div>

      {savedAlert && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold flex items-center space-x-2 shadow-sm">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <span>Platform Commission configurations updated! Real-time checks sync with checkout portals.</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white border border-brand-navy/5 shadow-sm space-y-2 flex flex-col justify-between"
          >
            <span className="block text-[10px] uppercase font-bold text-brand-slate tracking-wider font-mono">
              {card.label}
            </span>
            <div className="space-y-1">
              <span className="text-xl sm:text-2xl font-extrabold text-brand-navy font-mono block">
                {card.value}
              </span>
              <div className="flex items-center justify-between text-[10px] font-semibold text-brand-slate">
                <span className="text-brand-teal font-mono">{card.change}</span>
                <span>{card.desc}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Platform Commission Config Form */}
        <div className="lg:col-span-5 p-5 sm:p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-5">
          <span className="block text-xs font-bold text-brand-navy uppercase font-mono border-b border-brand-navy/5 pb-2">
            Configure Payout Commission
          </span>

          <form onSubmit={handleSaveConfig} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[9px] font-bold text-brand-slate uppercase font-mono">Take-Rate Cut (%)</label>
              <div className="relative">
                <input
                  type="number"
                  value={takeRate}
                  onChange={(e) => setTakeRate(e.target.value)}
                  className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl pl-4 pr-10 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-brand-slate font-mono">%</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all block shadow-md"
            >
              <Save className="w-4 h-4 text-brand-teal inline-block mr-1.5" />
              <span>Update Fee Configuration</span>
            </button>
          </form>
        </div>

        {/* Right: Settled Payout List */}
        <div className="lg:col-span-7 p-5 sm:p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-4">
          <span className="block text-xs font-bold text-brand-navy uppercase font-mono border-b border-brand-navy/5 pb-2">
            Settled Payout Deposits Ledger
          </span>

          <div className="space-y-3.5">
            {payouts.map((pay) => (
              <div
                key={pay.id}
                className="p-4 rounded-2xl bg-brand-sand border border-brand-navy/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-medium text-brand-slate"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-brand-navy/5 flex items-center justify-center shrink-0 shadow-sm text-brand-navy">
                    <BankIcon className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-brand-navy">{pay.operator}</h4>
                    <span className="text-[10px] text-brand-slate block mt-0.5">{pay.bank} • Ref: {pay.id}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
                  <div>
                    <span className="block text-[8px] text-brand-slate font-bold uppercase sm:text-right">PAID ON</span>
                    <span className="block text-brand-navy font-semibold">{pay.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[8px] text-brand-slate font-bold uppercase">SETTLED AMOUNT</span>
                    <span className="block text-brand-teal font-extrabold font-mono">{pay.amount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
