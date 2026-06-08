"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, CheckCircle2, LifeBuoy, ShieldAlert, Sparkles } from "lucide-react";

export default function SupportCenterPage() {
  // Ticket Form state
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketCat, setTicketCat] = useState("Technical");
  const [ticketDesc, setTicketDesc] = useState("");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject || !ticketDesc) return;
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setTicketSubject("");
      setTicketDesc("");
    }, 3000);
  };

  // Live Chat state
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: "agent", text: "Hello! I am SpotBot, your operations assistant. How can I help coordinate your food truck slot today?", time: "10:00 AM" }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput) return;

    const userMessage = { sender: "user", text: chatInput, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, userMessage]);
    setChatInput("");

    // Simulate Agent typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      let replyText = "Understood. Let me look up your current reservation coordinates and check compliance codes.";
      if (chatInput.toLowerCase().includes("permit") || chatInput.toLowerCase().includes("zoning")) {
        replyText = "SpotReserve handles city permits automatically. You can download active permit tags inside Dashboard > Upcoming Bookings.";
      } else if (chatInput.toLowerCase().includes("payout") || chatInput.toLowerCase().includes("revenue")) {
        replyText = "Your revenue payouts settle in Chase Checking. Processing takes up to 24 hours depending on your plan tier.";
      } else if (chatInput.toLowerCase().includes("power") || chatInput.toLowerCase().includes("hookup")) {
        replyText = "Pier 14 provides 50A utility grid hookups, SOMA Plaza provides 30A. Double check spec dimensions in Profile.";
      }

      setMessages((prev) => [
        ...prev,
        { sender: "agent", text: replyText, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
      ]);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-20 bg-brand-warm-white text-brand-navy min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Title */}
        <div className="text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-teal font-mono">SUPPORT DESK</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Help Desk & Live Chat</h1>
          <p className="text-sm sm:text-base text-brand-slate font-medium max-w-xl mx-auto">
            Create compliance support tickets or talk directly to our automated chatbot system for quick replies.
          </p>
        </div>

        {ticketSubmitted && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold flex items-center space-x-2 shadow-sm animate-pulse max-w-lg mx-auto">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Support ticket submitted! A compliance operator will reply to your inbox within 2 hours.</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Left: Create Ticket Form */}
          <form onSubmit={handleTicketSubmit} className="md:col-span-5 p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 border-b border-brand-navy/5 pb-2">
                <LifeBuoy className="w-4.5 h-4.5 text-brand-teal" />
                <span className="text-[10px] uppercase font-bold text-brand-slate tracking-wider font-mono">
                  Create Support Ticket
                </span>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="block text-[9px] font-bold text-brand-slate uppercase font-mono">Category</label>
                  <select
                    value={ticketCat}
                    onChange={(e) => setTicketCat(e.target.value)}
                    className="w-full text-xs font-semibold text-brand-navy bg-brand-cream/25 border border-brand-navy/5 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal"
                  >
                    <option value="Technical">Technical (electrical, WiFi)</option>
                    <option value="Billing">Billing (payouts, transactions)</option>
                    <option value="Zoning">Zoning Permits compliance</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-bold text-brand-slate uppercase font-mono">Subject</label>
                  <input
                    type="text"
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="Pier 14 electrical failure"
                    className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[9px] font-bold text-brand-slate uppercase font-mono">Issue Description</label>
                  <textarea
                    value={ticketDesc}
                    onChange={(e) => setTicketDesc(e.target.value)}
                    rows={4}
                    placeholder="Describe specific coordinate issues or billing discrepancy details..."
                    className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all block mt-6 shadow-md"
            >
              Submit Support Ticket
            </button>
          </form>

          {/* Right: Live Chat Window Console */}
          <div className="md:col-span-7 rounded-3xl bg-white border border-brand-navy/5 shadow-xl flex flex-col h-[480px] overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-brand-navy/5 bg-brand-cream/20 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-[10px] font-extrabold text-brand-warm-white relative">
                  SB
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white"></span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-brand-navy">SpotReserve Assistant</span>
                  <span className="block text-[9px] text-brand-slate font-mono font-semibold">BOT SUPPORT ACTIVE</span>
                </div>
              </div>
            </div>

            {/* Chat Messages scroll area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-cream/10">
              {messages.map((m, idx) => {
                const isAgent = m.sender === "agent";
                return (
                  <div key={idx} className={`flex ${isAgent ? "justify-start" : "justify-end"} items-end space-x-2`}>
                    {isAgent && (
                      <div className="w-6 h-6 rounded-full bg-brand-navy flex items-center justify-center text-[8px] font-bold text-white shrink-0">
                        SB
                      </div>
                    )}
                    <div className={`p-3 max-w-[75%] rounded-2xl text-xs leading-relaxed ${
                      isAgent
                        ? "bg-white border border-brand-navy/5 text-brand-navy rounded-bl-none shadow-sm"
                        : "bg-brand-navy text-brand-warm-white rounded-br-none"
                    }`}>
                      <p>{m.text}</p>
                      <span className={`block text-[8px] mt-1 text-right ${isAgent ? "text-brand-slate/60" : "text-white/60"}`}>
                        {m.time}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex justify-start items-center space-x-2">
                  <div className="w-6 h-6 rounded-full bg-brand-navy flex items-center justify-center text-[8px] font-bold text-white shrink-0">
                    SB
                  </div>
                  <div className="p-3 bg-white border border-brand-navy/5 rounded-2xl rounded-bl-none shadow-sm flex items-center space-x-1.5 py-4 px-5">
                    <span className="w-1.5 h-1.5 bg-brand-slate rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-brand-slate rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-brand-slate rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input form */}
            <form onSubmit={handleSendChat} className="p-3 border-t border-brand-navy/5 bg-white flex items-center space-x-2 shrink-0">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask SpotBot (e.g. permit, payout, electrical)..."
                className="w-full text-xs bg-brand-cream/25 border border-brand-navy/5 focus:border-brand-teal/60 rounded-full px-4 py-2.5 focus:outline-none text-brand-navy font-semibold placeholder-slate-400"
              />
              <button
                type="submit"
                className="p-2.5 rounded-full bg-brand-navy hover:bg-brand-teal text-white flex items-center justify-center transition-colors shrink-0"
              >
                <Send className="w-4 h-4 text-brand-teal shrink-0" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
