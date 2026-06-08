"use client";

import React from "react";
import { ArrowDownToLine, Landmark } from "lucide-react";

export default function RevenueAnalytics() {
  const cards = [
    {
      label: "Gross Earnings",
      value: "$4,850.40",
      change: "+12.4%",
      desc: "This month",
    },
    {
      label: "Net Payouts",
      value: "$4,462.37",
      change: "+11.8%",
      desc: "Transferred to bank",
    },
    {
      label: "Avg Shift Value",
      value: "$1,616.80",
      change: "+4.2%",
      desc: "Across 3 shifts",
    },
    {
      label: "Total Transactions",
      value: "384 Customers",
      change: "Current Week",
      desc: "Lunch/dinner blocks",
    },
  ];

  const breakdowns = [
    {
      name: "Pier 14 Terminal",
      value: "$2,850.00",
      percentage: "58.7%",
      color: "bg-brand-teal",
    },
    {
      name: "Soma Office Plaza",
      value: "$1,385.40",
      percentage: "28.5%",
      color: "bg-brand-blue",
    },
    {
      name: "Mission Park Meadow",
      value: "$615.00",
      percentage: "12.8%",
      color: "bg-amber-500",
    },
  ];

  const payouts = [
    {
      id: "TXN-9021",
      bank: "Chase Checking (...4902)",
      amount: "$2,104.20",
      date: "June 6, 2026",
      status: "Settled",
    },
    {
      id: "TXN-8840",
      bank: "Chase Checking (...4902)",
      amount: "$1,450.00",
      date: "June 2, 2026",
      status: "Settled",
    },
    {
      id: "TXN-7391",
      bank: "Chase Checking (...4902)",
      amount: "$908.17",
      date: "May 28, 2026",
      status: "Settled",
    },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-brand-navy">
            Revenue Analytics
          </h1>
          <p className="text-xs text-brand-slate font-medium">
            Analyze sales performance metrics, location margins, and deposit
            payouts.
          </p>
        </div>

        <button className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full border border-brand-navy/10 hover:border-brand-navy/20 bg-brand-cream/30 text-xs font-bold text-brand-navy transition-all">
          <ArrowDownToLine className="w-3.5 h-3.5" />
          <span>Export Financial Report</span>
        </button>
      </div>

      {/* Financial stats */}
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
                <span className="text-emerald-500 font-mono">
                  {card.change}
                </span>
                <span>{card.desc}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphs split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Revenue Trend Area Chart simulation */}
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-brand-navy uppercase font-mono">
              Daily Earnings Wave
            </span>
            <span className="text-[10px] text-brand-slate font-medium">
              Recharts Line Performance
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-4 pt-4 border-t border-brand-navy/5">
            {[40, 55, 48, 70, 75, 92, 60].map((h, idx) => {
              const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
              return (
                <div
                  key={idx}
                  className="flex-grow flex flex-col items-center space-y-2"
                >
                  <div className="w-full bg-brand-cream rounded-t-lg h-32 relative overflow-hidden">
                    <div
                      className="absolute bottom-0 left-0 right-0 bg-brand-teal"
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-bold text-brand-slate font-mono">
                    {days[idx]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Location Breakdowns */}
        <div className="lg:col-span-4 p-5 sm:p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-5 flex flex-col justify-between">
          <span className="block text-xs font-bold text-brand-navy uppercase font-mono">
            Sales Contribution
          </span>

          <div className="space-y-4">
            {breakdowns.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-brand-slate">
                  <span className="text-brand-navy font-bold">{item.name}</span>
                  <span className="font-mono">
                    {item.value} ({item.percentage})
                  </span>
                </div>
                <div className="w-full bg-brand-cream h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color}`}
                    style={{ width: item.percentage }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[10px] text-brand-slate font-semibold leading-relaxed border-t border-brand-navy/5 pt-4">
            Pier 14 terminal remains your highest-margin location, yielding 58%
            of gross sales this week.
          </div>
        </div>
      </div>

      {/* Payout History Ledger */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-4">
        <span className="block text-xs font-bold text-brand-navy uppercase font-mono">
          Payout Ledger
        </span>
        <div className="space-y-3">
          {payouts.map((pay) => (
            <div
              key={pay.id}
              className="p-4 rounded-2xl bg-brand-cream/30 border border-brand-navy/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-medium text-brand-slate"
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-brand-navy/5 flex items-center justify-center shrink-0 shadow-sm text-brand-navy">
                  <Landmark className="w-5 h-5 text-brand-teal" />
                </div>
                <div>
                  <span className="block font-bold text-brand-navy font-mono">
                    {pay.id}
                  </span>
                  <span className="block text-[10px] text-brand-slate">
                    {pay.bank}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">
                <div>
                  <span className="block text-[8px] text-brand-slate font-bold uppercase sm:text-right">
                    PAID ON
                  </span>
                  <span className="block text-brand-navy font-semibold">
                    {pay.date}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[8px] text-brand-slate font-bold uppercase">
                    SETTLED AMOUNT
                  </span>
                  <span className="block text-brand-teal font-extrabold font-mono">
                    {pay.amount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
