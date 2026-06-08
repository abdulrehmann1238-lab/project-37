"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 3000);
  };

  return (
    <div className="pt-32 pb-20 bg-brand-warm-white text-brand-navy min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Connect with SpotReserve</h1>
          <p className="text-sm sm:text-base text-brand-slate font-medium">
            Have questions about city permits or fleet pricing? Drop us a line and we’ll reply under 4 hours.
          </p>
        </div>

        {submitted && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold flex items-center space-x-2 shadow-sm animate-pulse max-w-2xl mx-auto">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span>Message sent successfully! Our zoning support crew will contact you shortly.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info */}
          <div className="md:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-brand-cream/40 border border-brand-navy/5 shadow-sm space-y-6">
              <span className="block text-xs font-bold text-brand-navy uppercase font-mono border-b border-brand-navy/5 pb-2">
                Corporate Contacts
              </span>

              <div className="space-y-4 text-xs font-semibold text-brand-slate">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border shadow-sm">
                    <Mail className="w-4.5 h-4.5 text-brand-teal" />
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-brand-slate uppercase font-mono">SUPPORT EMAIL</span>
                    <span className="text-brand-navy">operations@spotreserve.co</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border shadow-sm">
                    <Phone className="w-4.5 h-4.5 text-brand-teal" />
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-brand-slate uppercase font-mono">HOTLINE PHONE</span>
                    <span className="text-brand-navy">(415) 555-8900</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border shadow-sm">
                    <MapPin className="w-4.5 h-4.5 text-brand-teal" />
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-brand-slate uppercase font-mono">HEADQUARTERS</span>
                    <span className="text-brand-navy">100 Pine St, San Francisco, CA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <form onSubmit={handleSubmit} className="md:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-brand-navy/5 shadow-xl space-y-4">
            <span className="block text-xs font-bold text-brand-navy uppercase font-mono border-b border-brand-navy/5 pb-2">
              Send an Inquiry Message
            </span>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-[9px] font-bold text-brand-slate uppercase font-mono">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Marcus Vance"
                  className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-bold text-brand-slate uppercase font-mono">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marcus@fireandslice.co"
                  className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-[9px] font-bold text-brand-slate uppercase font-mono">Your Inquiry Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="Describe your fleet size, permitting questions, or custom integrations request..."
                  className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
                />
              </div>

              <button
                type="submit"
                className="w-full text-center py-3.5 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all block shadow-md"
              >
                <Send className="w-4 h-4 text-brand-teal inline-block mr-1.5" />
                <span>Submit Inquiry Form</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
