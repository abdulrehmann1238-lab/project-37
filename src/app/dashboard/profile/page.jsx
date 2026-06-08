"use client";

import React, { useState } from "react";
import { User, ShieldCheck, Save, Truck, Award } from "lucide-react";

export default function ProfileManagement() {
  const [ownerName, setOwnerName] = useState("Marcus Vance");
  const [email, setEmail] = useState("marcus@fireandslice.co");
  const [phone, setPhone] = useState("(415) 555-8901");
  const [truckName, setTruckName] = useState("Fire & Slice Woodfired Pizza");
  const [cuisine, setCuisine] = useState("Pizza / Italian");
  const [length, setLength] = useState("28ft");
  const [power, setPower] = useState("50A");
  const [permitNo, setPermitNo] = useState("SF-FT-94021");

  const [savedAlert, setSavedAlert] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedAlert(true);
    setTimeout(() => {
      setSavedAlert(false);
    }, 3000);
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-brand-navy">
          Truck Owner Profile
        </h1>
        <p className="text-xs text-brand-slate font-medium">
          Manage your contact information, truck dimensions, power hookups, and
          permit certifications.
        </p>
      </div>

      {savedAlert && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold flex items-center space-x-2 shadow-sm animate-pulse">
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <span>
            Profile configuration saved successfully! Details synced with zoning
            systems.
          </span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Contact Details */}
        <div className="p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-brand-navy/5">
            <User className="w-4.5 h-4.5 text-brand-teal" />
            <h3 className="text-sm font-extrabold text-brand-navy uppercase font-mono">
              Personal Contact Details
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-brand-slate uppercase font-mono">
                Owner Name
              </label>
              <input
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-brand-slate uppercase font-mono">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-brand-slate uppercase font-mono">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Fleet / Truck Specs */}
        <div className="p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-brand-navy/5">
            <Truck className="w-4.5 h-4.5 text-brand-teal" />
            <h3 className="text-sm font-extrabold text-brand-navy uppercase font-mono">
              Food Truck Specifications
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-brand-slate uppercase font-mono">
                Truck Brand / Registered Name
              </label>
              <input
                type="text"
                value={truckName}
                onChange={(e) => setTruckName(e.target.value)}
                className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-brand-slate uppercase font-mono">
                Cuisine Category
              </label>
              <input
                type="text"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
                className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-brand-slate uppercase font-mono">
                Truck Length (Max 40ft compatibility)
              </label>
              <input
                type="text"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-brand-slate uppercase font-mono">
                Electrical Hookup Requirements
              </label>
              <select
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="w-full text-xs font-semibold text-brand-navy bg-brand-cream/25 border border-brand-navy/5 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal"
              >
                <option value="50A">50A Power Supply Grid</option>
                <option value="30A">30A Power Supply Grid</option>
                <option value="Generator">Generator Only (No hookups)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Permit Compliance */}
        <div className="p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-brand-navy/5">
            <Award className="w-4.5 h-4.5 text-brand-teal" />
            <h3 className="text-sm font-extrabold text-brand-navy uppercase font-mono">
              Permits & Compliance Checklist
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-brand-slate uppercase font-mono">
                Municipal Permit Number
              </label>
              <input
                type="text"
                value={permitNo}
                onChange={(e) => setPermitNo(e.target.value)}
                className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
              />
            </div>

            <div className="p-4 rounded-xl bg-brand-cream/35 border border-brand-navy/5 text-xs text-brand-slate font-medium">
              <span className="text-[9px] uppercase font-bold text-brand-teal block">
                CITY LICENSE COMPLIANCE
              </span>
              <span className="block mt-1">
                Health Certificate verified by department. Spot bookings are
                unlocked.
              </span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all shadow-md"
        >
          <Save className="w-4 h-4 text-brand-teal" />
          <span>Save Profile Configuration</span>
        </button>
      </form>
    </div>
  );
}
