"use client";

import { Header } from "@/components/header/Header";
import { HelpCircle, CheckCircle2, ShieldCheck, Zap, Bot, ShoppingBag, ArrowRight } from "lucide-react";

const matrix = [
  {
    requirement: "Track 1: Grow Merchant Revenue",
    implementation: "Autonomous AI Growth Agent continuously analyzing sales, product co-purchases, and cart abandonments.",
    feature: "AI Growth Agent & Opportunity Engine",
  },
  {
    requirement: "Agentic Commerce (AI to Machine Transactions)",
    implementation: "Machine-readable product catalog API (/api/catalog) enabling consumer AI Buyers to search, select, and initiate Razorpay checkout.",
    feature: "AI Buyer Assistant",
  },
  {
    requirement: "Every Money Action Explainable",
    implementation: "Clear empirical evidence metrics (e.g. 72 footwear buyers, 15.2% socks attachment rate vs 28.0% benchmark) and step-by-step reasoning.",
    feature: "Evidence & Reasoning Pipeline",
  },
  {
    requirement: "Bounded Financial Execution",
    implementation: "Hard policy engine enforcing MAX_DISCOUNT_PERCENT (15%), MAX_BUDGET (₹5,000), and MAX_REDEMPTIONS (100).",
    feature: "Policy Engine",
  },
  {
    requirement: "Gated by Merchant Approval",
    implementation: "Money-affecting actions require explicit click on interactive Approval Gate Modal showing full breakdown and risk level.",
    feature: "Merchant Approval Gate",
  },
  {
    requirement: "100% Auditable",
    implementation: "Immutable Audit Trail recording every analysis step, policy check, merchant approval, and Razorpay API event.",
    feature: "Audit Trail System",
  },
  {
    requirement: "Graceful Failure Handling & Idempotency",
    implementation: "Simulated failure test mode with zero-charge recovery and idempotency key protection (act_*) preventing duplicate links.",
    feature: "Failure Simulation & Recovery",
  },
  {
    requirement: "Razorpay Test Mode Integration",
    implementation: "Official Razorpay REST APIs for Payment Links & Orders with instant zero-config Mock Mode fallback.",
    feature: "Razorpay Integration Service",
  },
];

export default function WhyRazorGrowthPage() {
  return (
    <div className="-m-8 min-h-screen bg-[#09090B] flex flex-col">
      <Header />

      <div className="p-8 max-w-6xl mx-auto w-full space-y-8">
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <HelpCircle className="w-4 h-4" />
            Hackathon Track 1 Alignment
          </div>
          <h2 className="text-3xl font-extrabold text-zinc-100 tracking-tight">
            Why RazorGrowth AI?
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Built specifically for the <strong>Razorpay AI Builder Internship 2026 — Track 1: AI Growth & Agentic Commerce</strong>.
          </p>
        </div>

        {/* Core Value Statement Box */}
        <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border border-amber-500/30 p-6 rounded-2xl space-y-2 text-center shadow-xl">
          <h3 className="text-lg font-bold text-amber-400">The RazorGrowth Core Principle</h3>
          <p className="text-zinc-200 text-sm italic max-w-2xl mx-auto">
            "Don't just tell merchants what to do. Actually execute approved growth actions via Razorpay and show the measurable revenue result."
          </p>
        </div>

        {/* Matrix Table */}
        <div className="bg-[#121215] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/90 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4 w-1/3">Track Requirement</th>
                  <th className="p-4 w-1/2">RazorGrowth Implementation</th>
                  <th className="p-4">Feature Component</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 text-zinc-200">
                {matrix.map((item, i) => (
                  <tr key={i} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="p-4 font-bold text-amber-400 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{item.requirement}</span>
                    </td>
                    <td className="p-4 text-zinc-300 leading-relaxed">{item.implementation}</td>
                    <td className="p-4 font-semibold text-zinc-400">
                      <span className="bg-zinc-900 px-2.5 py-1 rounded border border-zinc-800 text-zinc-200">
                        {item.feature}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
