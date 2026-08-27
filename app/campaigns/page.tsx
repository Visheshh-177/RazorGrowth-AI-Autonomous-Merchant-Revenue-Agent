"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { TrendingUp, Sparkles, CheckCircle2, Play, Pause, AlertCircle, ArrowUpRight } from "lucide-react";
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

export default function CampaignsPage() {
  const [campaignStatus, setCampaignStatus] = useState<"Active" | "Paused">("Active");

  return (
    <div className="-m-8 min-h-screen bg-[#09090B] flex flex-col">
      <Header />

      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
              AI Growth Campaigns
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                1 Active Campaign
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Autonomous campaigns proposed by AI, approved by merchant, and executed via Razorpay.
            </p>
          </div>
        </div>

        {/* Campaign Metrics & Overview */}
        <div className="bg-[#121215] border border-amber-500/30 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  FEATURED CAMPAIGN
                </span>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    campaignStatus === "Active"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      : "bg-zinc-800 text-zinc-400 border-zinc-700"
                  }`}
                >
                  ● {campaignStatus}
                </span>
              </div>
              <h3 className="text-xl font-bold text-zinc-100 mt-1.5">Running Shoes Cross-Sell Bundle</h3>
              <p className="text-xs text-zinc-400 mt-0.5">Audience: Returning & Footwear Buyers • 10% Discount Cap</p>
            </div>

            <div className="flex items-center gap-2">
              {campaignStatus === "Active" ? (
                <button
                  onClick={() => setCampaignStatus("Paused")}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Pause className="w-4 h-4 fill-amber-400" />
                  Pause Campaign
                </button>
              ) : (
                <button
                  onClick={() => setCampaignStatus("Active")}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-black text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Play className="w-4 h-4 fill-black" />
                  Resume Campaign
                </button>
              )}
            </div>
          </div>

          {/* Metric Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-xs">
            <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
              <p className="text-zinc-400">Audience Reach</p>
              <p className="text-lg font-bold text-zinc-100 mt-0.5">1,200</p>
            </div>
            <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
              <p className="text-zinc-400">Conversions</p>
              <p className="text-lg font-bold text-emerald-400 mt-0.5">87</p>
            </div>
            <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
              <p className="text-zinc-400">Revenue Generated</p>
              <p className="text-lg font-bold text-amber-400 mt-0.5">₹2,86,000</p>
            </div>
            <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
              <p className="text-zinc-400">Average Order Value</p>
              <p className="text-lg font-bold text-zinc-100 mt-0.5">₹3,284</p>
            </div>
            <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
              <p className="text-zinc-400">ROI</p>
              <p className="text-lg font-bold text-emerald-400 mt-0.5">4.8x</p>
            </div>
            <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800">
              <p className="text-zinc-400">Budget Spent</p>
              <p className="text-lg font-bold text-zinc-300 mt-0.5">₹2,450 / ₹5k</p>
            </div>
          </div>

          {/* AI Campaign Optimizer Card (Requirement #19) */}
          <div className="bg-gradient-to-r from-emerald-950/30 via-zinc-900 to-zinc-900 p-5 rounded-xl border border-emerald-500/30 space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                AI Campaign Optimizer Verdict
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                PERFORMING ABOVE EXPECTATIONS
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-zinc-400">Conversion Rate:</span>
                <span className="font-bold text-emerald-400 ml-1.5">7.2% (Previous 4.8%)</span>
              </div>
              <div>
                <span className="text-zinc-400">AOV Uplift:</span>
                <span className="font-bold text-zinc-100 ml-1.5">₹3,284 (+₹399)</span>
              </div>
              <div>
                <span className="text-zinc-400">Net Revenue Lift:</span>
                <span className="font-bold text-amber-400 ml-1.5">+₹42,300</span>
              </div>
            </div>
            <p className="text-xs text-zinc-300">
              <strong>AI Recommendation:</strong> Continue campaign at current parameters. Current redemption pace (87/100) will cap safely within budget limit.
            </p>
          </div>

          {/* Revenue Chart */}
          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-semibold text-zinc-400">Campaign Revenue Growth Over Time</h4>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="day" stroke="#71717a" fontSize={12} />
                  <YAxis stroke="#71717a" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "8px" }}
                    formatter={(v: any) => [`₹${v.toLocaleString("en-IN")}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="#f59e0b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
