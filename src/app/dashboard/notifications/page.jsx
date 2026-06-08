"use client";

import React, { useState } from "react";
import { ShieldCheck, CreditCard, AlertTriangle } from "lucide-react";

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Pier 14 Booking Confirmed",
      text: "Your reservation for June 12 at Pier 14 Waterfront has been approved by the City Permit Office. View details and print your physical permit tag.",
      time: "2 hours ago",
      type: "booking",
      unread: true,
    },
    {
      id: 2,
      title: "Payout of $1,450.00 Deposited",
      text: "Gross revenue deposits from the previous SOMA Plaza lunch shifts have been cleared and transferred to your Chase Checking account.",
      time: "1 day ago",
      type: "billing",
      unread: false,
    },
    {
      id: 3,
      title: "Zoning Maintenance Schedule",
      text: "Please note that Howard St corridors will undergo light road repairs on June 22. Some access angles will be blocked. Generators are advised.",
      time: "3 days ago",
      type: "alert",
      unread: false,
    },
  ]);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const getIcon = (type) => {
    if (type === "booking")
      return <ShieldCheck className="w-5 h-5 text-brand-teal" />;
    if (type === "billing")
      return <CreditCard className="w-5 h-5 text-emerald-500" />;
    return <AlertTriangle className="w-5 h-5 text-amber-500" />;
  };

  return (
    <div className="p-6 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-brand-navy">
            Notification Center
          </h1>
          <p className="text-xs text-brand-slate font-medium">
            Review real-time system alerts, booking permits status, and direct
            payout receipts.
          </p>
        </div>

        <button
          onClick={handleMarkAllRead}
          className="inline-flex items-center space-x-1 px-4 py-2 rounded-full border border-brand-navy/10 hover:border-brand-navy/20 bg-brand-cream/30 text-xs font-bold text-brand-navy transition-all"
        >
          <span>Mark all as read</span>
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-5 rounded-3xl bg-white border border-brand-navy/5 shadow-sm flex items-start space-x-4 transition-all relative ${
              notif.unread ? "ring-1 ring-brand-teal/40" : ""
            }`}
          >
            {notif.unread && (
              <span className="absolute top-5 right-5 w-2 h-2 rounded-full bg-brand-teal animate-pulse"></span>
            )}

            <div className="w-10 h-10 rounded-xl bg-brand-cream/45 flex items-center justify-center shrink-0 border border-brand-navy/5 text-brand-navy">
              {getIcon(notif.type)}
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-baseline space-x-2">
                <h3
                  className={`text-sm font-extrabold ${notif.unread ? "text-brand-navy font-bold" : "text-brand-slate"}`}
                >
                  {notif.title}
                </h3>
                <span className="text-[9px] text-brand-slate/60 font-mono font-bold">
                  {notif.time}
                </span>
              </div>
              <p className="text-xs text-brand-slate font-medium leading-relaxed max-w-2xl">
                {notif.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
