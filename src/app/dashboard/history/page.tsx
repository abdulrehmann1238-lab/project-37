"use client";

import React, { useState } from "react";
import { Download, Search, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

export default function BookingHistory() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const history = [
    { id: "SR-5219-F2", location: "Pier 14 Water Terminal", date: "May 28, 2026", shift: "Lunch", amount: "$195.00", status: "Completed", payout: "Transferred" },
    { id: "SR-4812-G8", location: "Soma Plaza Courtyard", date: "May 24, 2026", shift: "Dinner", amount: "$235.00", status: "Completed", payout: "Transferred" },
    { id: "SR-3912-E5", location: "Mission Park Meadow", date: "May 18, 2026", shift: "Full-Day", amount: "$125.00", status: "Cancelled", payout: "Refunded" },
    { id: "SR-2901-A1", location: "Pier 14 Water Terminal", date: "May 15, 2026", shift: "Lunch", amount: "$195.00", status: "Completed", payout: "Transferred" },
    { id: "SR-1823-D4", location: "Broadway Food Plaza", date: "May 10, 2026", shift: "Dinner", amount: "$210.00", status: "Expired", payout: "Transferred" }
  ];

  const filteredHistory = history.filter((item) => {
    const matchesSearch = item.location.toLowerCase().includes(search.toLowerCase()) || item.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterStatus === "all" || item.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-brand-navy">Booking History</h1>
        <p className="text-xs text-brand-slate font-medium">Browse historical reservation payouts, transaction statements, and downloadable tax invoices.</p>
      </div>

      {/* Filter and Search controls */}
      <div className="bg-white border border-brand-navy/5 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-slate" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reference or spot..."
            className="w-full text-xs bg-brand-cream/20 border border-brand-navy/5 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-brand-teal"
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-48 text-xs bg-white border border-brand-navy/5 rounded-xl px-4 py-2.5 focus:outline-none focus:border-brand-teal text-brand-slate font-semibold"
        >
          <option value="all">Status: All Bookings</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
          <option value="expired">Expired</option>
        </select>
      </div>

      {/* Table grid */}
      <div className="bg-white border border-brand-navy/5 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-brand-slate">
            <thead className="bg-brand-cream/30 border-b border-brand-navy/5 text-[10px] font-bold uppercase tracking-wider text-brand-navy font-mono">
              <tr>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Shift</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-navy/5 font-medium">
              {filteredHistory.length > 0 ? (
                filteredHistory.map((item) => {
                  let statusBadge = "text-emerald-500 bg-emerald-500/10";
                  if (item.status === "Cancelled") statusBadge = "text-rose-500 bg-rose-500/10";
                  if (item.status === "Expired") statusBadge = "text-slate-400 bg-slate-100";

                  return (
                    <tr key={item.id} className="hover:bg-brand-cream/10 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-brand-navy">{item.id}</td>
                      <td className="px-6 py-4 font-bold text-brand-navy">{item.location}</td>
                      <td className="px-6 py-4">{item.date}</td>
                      <td className="px-6 py-4">{item.shift}</td>
                      <td className="px-6 py-4 font-mono text-brand-navy font-bold">{item.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusBadge}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="inline-flex items-center space-x-1 hover:text-brand-teal transition-colors">
                          <Download className="w-3.5 h-3.5" />
                          <span className="font-bold">Receipt</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-brand-slate">
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
