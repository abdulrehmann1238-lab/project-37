"use client";

import React, { useState } from "react";
import { Bell, Lock, Save, ShieldCheck } from "lucide-react";

export default function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [browserAlerts, setBrowserAlerts] = useState(true);
  const [savedAlert, setSavedAlert] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
    }, 3000);
  };

  return (
    <div className="pt-32 pb-20 bg-brand-warm-white text-brand-navy min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Title */}
        <div className="text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal font-mono">
            Control Panel
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            App Configurations
          </h1>
          <p className="text-sm sm:text-base text-brand-slate font-medium max-w-xl mx-auto">
            Manage your default spot search criteria, toggle notifications, and
            audit secure Stripe keys.
          </p>
        </div>

        {savedAlert && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold flex items-center space-x-2 shadow-sm max-w-lg mx-auto">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span>
              Settings configurations saved successfully! Changes apply
              globally.
            </span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Section 1: Notifications */}
          <div className="p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-brand-navy/5">
              <Bell className="w-4.5 h-4.5 text-brand-teal" />
              <h3 className="text-sm font-extrabold text-brand-navy uppercase font-mono">
                Notification Toggles
              </h3>
            </div>

            <div className="space-y-4 text-xs font-semibold text-brand-navy">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="block font-bold">
                    Email alerts for booking confirmations
                  </span>
                  <span className="block text-[10px] text-brand-slate font-medium mt-0.5">
                    Receive PDF permit slips via email.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={() => setEmailAlerts(!emailAlerts)}
                  className="accent-brand-teal w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer border-t border-brand-navy/5 pt-4">
                <div>
                  <span className="block font-bold">
                    SMS notifications on shift changes
                  </span>
                  <span className="block text-[10px] text-brand-slate font-medium mt-0.5">
                    Instant alerts on permit schedule audits.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={() => setSmsAlerts(!smsAlerts)}
                  className="accent-brand-teal w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer border-t border-brand-navy/5 pt-4">
                <div>
                  <span className="block font-bold">
                    Browser dashboard updates
                  </span>
                  <span className="block text-[10px] text-brand-slate font-medium mt-0.5">
                    Receive real-time alerts inside operator shell.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={browserAlerts}
                  onChange={() => setBrowserAlerts(!browserAlerts)}
                  className="accent-brand-teal w-4 h-4"
                />
              </label>
            </div>
          </div>

          {/* Section 2: Security settings */}
          <div className="p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-6">
            <div className="flex items-center space-x-2 pb-2 border-b border-brand-navy/5">
              <Lock className="w-4.5 h-4.5 text-brand-teal" />
              <h3 className="text-sm font-extrabold text-brand-navy uppercase font-mono">
                Default Account Credentials
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-brand-slate">
              <div className="space-y-1">
                <label className="block text-[9px] font-bold text-brand-slate uppercase font-mono">
                  App Currency
                </label>
                <select className="w-full text-xs font-semibold text-brand-navy bg-brand-cream/25 border border-brand-navy/5 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal">
                  <option value="usd">USD ($) - Dollar</option>
                  <option value="cad">CAD ($) - Canadian Dollar</option>
                  <option value="eur">EUR (€) - Euro</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-[9px] font-bold text-brand-slate uppercase font-mono">
                  Default Search Radius
                </label>
                <select className="w-full text-xs font-semibold text-brand-navy bg-brand-cream/25 border border-brand-navy/5 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal">
                  <option value="5">Within 5 miles</option>
                  <option value="15">Within 15 miles</option>
                  <option value="30">Within 30 miles</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all shadow-md mx-auto"
          >
            <Save className="w-4 h-4 text-brand-teal" />
            <span>Save System configurations</span>
          </button>
        </form>
      </div>
    </div>
  );
}
