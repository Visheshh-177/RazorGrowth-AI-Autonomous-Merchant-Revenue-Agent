"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { Sparkles, Play, Pause, ArrowUpRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const campaignPerformanceData = [
  { day: "Day 1", revenue: 28000, conversions: 8 },
  { day: "Day 2", revenue: 42000, conversions: 12 },
  { day: "Day 3", revenue: 65000, conversions: 19 },
  { day: "Day 4", revenue: 89000, conversions: 27 },
  { day: "Day 5", revenue: 142000, conversions: 43 },
  { day: "Day 6", revenue: 218000, conversions: 66 },
  { day: "Day 7", revenue: 286000, conversions: 87 },
];

const metrics = [
  { label: "Audience Reach", value: "1,200", color: "text-zinc-100" },
  { label: "Conversions", value: "87", color: "text-emerald-400" },
  { label: "Revenue Generated", value: "₹2,86,000", color: "text-amber-400" },
  { label: "Avg. Order Value", value: "₹3,284", color: "text-zinc-100" },
  { label: "ROI", value: "4.8x", color: "text-emerald-400" },
  { label: "Budget Spent", value: "₹2,450 / ₹5k", color: "text-zinc-300" },
];

export default function CampaignsPage() {
  const [campaignStatus, setCampaignStatus] = useState<"Active" | "Paused">("Active");

  return (
    <div className="-m-8 min-h-screen bg-[#09090B] flex flex-col">
      {/* Background glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full bg-gradient-radial from-amber-600/30 via-orange-600/10 to-transparent blur-3xl" />
      </div>

      <Header />

      <div className="p-8 max-w-7xl mx-auto w-full space-y-8 relative">
        {/* Title */}
        <div className="animate-fade-in-up flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Campaign Manager</p>
            <h2 className="text-3xl font-black text-zinc-100 flex items-center gap-3">
              AI Growth Campaigns
              <span className="text-sm font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                1 Active
              </span>
            </h2>
            <p className="text-xs text-zinc-500 mt-2">
              Autonomous campaigns proposed by AI, approved by merchant, and executed via Razorpay.
            </p>
          </div>
        </div>

        {/* Featured Campaign Card */}
        <div className="animate-fade-in-up stagger-1 relative bg-[#121215] border border-amber-500/25 rounded-2xl p-6 space-y-6 shadow-2xl overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-[-80px] right-[-80px] w-[300px] h-[300px] rounded-full bg-amber-500/8 blur-3xl pointer-events-none" />
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800/60 pb-5 relative">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 uppercase tracking-widest">
                  Featured Campaign
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                    campaignStatus === "Active"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-zinc-800 text-zinc-400 border-zinc-700"
                  }`}
                >
                  ● {campaignStatus}
                </span>
              </div>
              <h3 className="text-xl font-black text-zinc-100">Running Shoes Cross-Sell Bundle</h3>
              <p className="text-xs text-zinc-500 mt-1">Audience: Returning & Footwear Buyers • 10% Discount Cap</p>
            </div>

            <div className="flex items-center gap-2">
              {campaignStatus === "Active" ? (
                <button
                  onClick={() => setCampaignStatus("Paused")}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/30 hover:border-amber-500/50 text-xs font-bold flex items-center gap-1.5 transition-all duration-200"
                >
                  <Pause className="w-3.5 h-3.5 fill-amber-400" />
                  Pause Campaign
                </button>
              ) : (
                <button
                  onClick={() => setCampaignStatus("Active")}
                  className="btn-shimmer px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black text-xs font-black flex items-center gap-1.5 transition-all duration-200 shadow-lg shadow-amber-500/25"
                >
                  <Play className="w-3.5 h-3.5 fill-black" />
                  Resume Campaign
                </button>
              )}
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-xs relative">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className={`animate-fade-in-up stagger-${Math.min(i + 1, 4)} bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80 hover:border-zinc-700 transition-colors duration-200`}
              >
                <p className="text-zinc-500 text-[10px] leading-snug">{m.label}</p>
                <p className={`text-lg font-black mt-1 ${m.color}`}>{m.value}</p>
              </div>
            ))}
          </div>

          {/* AI Campaign Optimizer */}
          <div className="relative bg-gradient-to-r from-emerald-950/40 via-zinc-900/80 to-zinc-900/80 p-5 rounded-xl border border-emerald-500/25 space-y-3">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent rounded-t-xl" />
            <div className="flex justify-between items-center text-xs">
              <span className="font-black text-emerald-400 flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Sparkles className="w-3 h-3" />
                </div>
                AI Campaign Optimizer Verdict
              </span>
              <span className="text-[10px] font-black px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/25 uppercase tracking-wide">
                Above Expectations
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
              {[
                { label: "Conversion Rate", value: "7.2%", sub: "↑ from 4.8%", color: "text-emerald-400" },
                { label: "AOV Uplift", value: "₹3,284", sub: "+₹399 per order", color: "text-zinc-100" },
                { label: "Net Revenue Lift", value: "+₹42,300", sub: "vs. control group", color: "text-amber-400" },
              ].map((s) => (
                <div key={s.label} className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800/60">
                  <p className="text-zinc-500 text-[10px]">{s.label}</p>
                  <p className={`font-black text-base mt-0.5 ${s.color}`}>{s.value}</p>
                  <p className="text-zinc-600 text-[10px] mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed pt-1">
              <strong className="text-zinc-200">AI Recommendation:</strong> Continue campaign at current parameters. Current redemption pace (87/100) will cap safely within budget limit.
            </p>
          </div>

          {/* Revenue Chart */}
          <div className="space-y-3 pt-1 relative">
            <h4 className="text-xs font-bold text-zinc-400 flex items-center gap-2">
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
              Campaign Revenue Growth Over Time
            </h4>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignPerformanceData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1c1c20" vertical={false} />
                  <XAxis dataKey="day" stroke="#3f3f46" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#3f3f46" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      borderColor: "#27272a",
                      borderRadius: "10px",
                      fontSize: "12px",
                      padding: "8px 12px",
                    }}
                    formatter={(v: any) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]}
                    labelStyle={{ color: "#71717a", marginBottom: "4px" }}
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                  />
                  <Bar dataKey="revenue" fill="url(#barGradient)" radius={[6, 6, 0, 0]}>
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#d97706" stopOpacity={0.7} />
                      </linearGradient>
                    </defs>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
