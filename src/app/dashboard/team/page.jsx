"use client";

import React, { useState } from "react";
import { UserPlus, Mail, Trash2 } from "lucide-react";

export default function TeamManagement() {
  const [team, setTeam] = useState([
    {
      name: "Marcus Vance",
      email: "marcus@fireandslice.co",
      role: "Owner",
      status: "Active",
    },
    {
      name: "Julian Reyes",
      email: "julian@fireandslice.co",
      role: "Manager",
      status: "Active",
    },
    {
      name: "Carlos Mendez",
      email: "carlos@fireandslice.co",
      role: "Driver",
      status: "Active",
    },
    {
      name: "Amelia Chen",
      email: "amelia@fireandslice.co",
      role: "Driver",
      status: "Pending Invite",
    },
  ]);

  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Driver");
  const [inviteName, setInviteName] = useState("");

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteEmail || !inviteName) return;
    setTeam((prev) => [
      ...prev,
      {
        name: inviteName,
        email: inviteEmail,
        role: inviteRole,
        status: "Pending Invite",
      },
    ]);
    setInviteEmail("");
    setInviteName("");
  };

  const handleRemove = (email) => {
    setTeam((prev) => prev.filter((t) => t.email !== email));
  };

  return (
    <div className="p-6 space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-brand-navy">
          Team Management
        </h1>
        <p className="text-xs text-brand-slate font-medium">
          Configure roles and zoning dashboard access permissions for your food
          truck fleet staff.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Team Table */}
        <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-sm space-y-4">
          <span className="block text-xs font-bold text-brand-navy uppercase font-mono border-b border-brand-navy/5 pb-2">
            Active Operations Crew ({team.length})
          </span>

          <div className="space-y-3">
            {team.map((member) => (
              <div
                key={member.email}
                className="p-4 rounded-2xl bg-brand-cream/35 border border-brand-navy/5 flex items-center justify-between gap-4 text-xs font-medium text-brand-slate"
              >
                <div>
                  <h4 className="font-extrabold text-brand-navy">
                    {member.name}
                  </h4>
                  <span className="text-[10px] text-brand-slate block font-mono">
                    {member.email}
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  <div>
                    <span className="block text-[8px] font-bold text-brand-slate uppercase font-mono text-right">
                      ROLE
                    </span>
                    <span className="text-brand-navy font-bold">
                      {member.role}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[8px] font-bold text-brand-slate uppercase font-mono text-right">
                      STATUS
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-bold block ${
                        member.status === "Active"
                          ? "text-emerald-500 bg-emerald-500/10"
                          : "text-amber-500 bg-amber-500/10"
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>

                  {member.role !== "Owner" && (
                    <button
                      onClick={() => handleRemove(member.email)}
                      className="p-1.5 rounded-full hover:bg-rose-50 text-rose-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 shrink-0" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Invite Form */}
        <div className="lg:col-span-4 p-5 sm:p-6 rounded-3xl bg-white border border-brand-navy/5 shadow-xl space-y-5">
          <div className="flex items-center space-x-2 border-b border-brand-navy/5 pb-2">
            <UserPlus className="w-4.5 h-4.5 text-brand-teal" />
            <span className="text-[10px] uppercase font-bold text-brand-slate tracking-wider font-mono">
              Invite Crew Member
            </span>
          </div>

          <form onSubmit={handleInvite} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-[9px] font-bold text-brand-slate uppercase font-mono">
                Full Name
              </label>
              <input
                type="text"
                value={inviteName}
                onChange={(e) => setInviteName(e.target.value)}
                placeholder="Carlos Mendez"
                className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[9px] font-bold text-brand-slate uppercase font-mono">
                Email Address
              </label>
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="carlos@fireandslice.co"
                className="w-full text-xs font-semibold text-brand-navy border border-brand-navy/5 rounded-xl px-4 py-3 bg-brand-cream/25 focus:outline-none focus:border-brand-teal"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[9px] font-bold text-brand-slate uppercase font-mono">
                Operations Role
              </label>
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
                className="w-full text-xs font-semibold text-brand-navy bg-brand-cream/25 border border-brand-navy/5 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-teal"
              >
                <option value="Driver">Driver / Fleet Pilot</option>
                <option value="Manager">Manager / Scheduler</option>
                <option value="Staff">Operations Staff</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 rounded-full bg-brand-navy hover:bg-brand-teal text-brand-warm-white text-xs font-bold transition-all block shadow-md shadow-brand-navy/10"
            >
              Send Staff Invite
            </button>
          </form>

          <div className="p-3.5 rounded-xl bg-brand-cream/40 border border-brand-navy/5 flex items-start space-x-2 text-[10px] text-brand-slate font-medium">
            <Mail className="w-4.5 h-4.5 text-brand-teal shrink-0 mt-0.5" />
            <span>
              Invited crew members will receive an onboarding link to sync route
              coordinates and check-in schedules directly on their phones.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
