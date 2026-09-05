"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { ApprovalGateModal, ApprovalActionPayload } from "@/components/approval/ApprovalGateModal";
import { Zap, ChevronRight, Sparkles, TrendingUp, ShieldCheck, ArrowUpRight } from "lucide-react";

const opportunities = [
  {
    id: "opp_cross_sell_01",
    type: "CROSS-SELL",
    typeColor: "text-amber-400",
    typeBg: "bg-amber-500/10",
    typeBorder: "border-amber-500/20",
    selectedBorder: "border-amber-500/50",
    selectedShadow: "shadow-amber-500/10",
    confidence: "91%",
    title: "Running Shoes → Sports Socks",
    description: "72 customers bought Running Pro Shoes but not Sports Socks.",
    revenueLabel: "Potential Revenue",
    revenue: "₹18K - ₹42K",
    revenueColor: "text-amber-400",
  },
  {
    id: "opp_checkout_drop_02",
    type: "CHECKOUT RECOVERY",
    typeColor: "text-orange-400",
    typeBg: "bg-orange-500/10",
    typeBorder: "border-orange-500/20",
    selectedBorder: "border-orange-500/50",
    selectedShadow: "shadow-orange-500/10",
    confidence: "86%",
    title: "Checkout Conversion Drop (>₹2,500)",
    description: "Customers spending over ₹2,500 have a 31% lower conversion rate.",
    revenueLabel: "Potential Recovery",
    revenue: "₹27,000",
    revenueColor: "text-orange-400",
  },
  {
    id: "opp_high_margin_03",
    type: "HIGH MARGIN BOOST",
    typeColor: "text-blue-400",
    typeBg: "bg-blue-500/10",
    typeBorder: "border-blue-500/20",
    selectedBorder: "border-blue-500/50",
    selectedShadow: "shadow-blue-500/10",
    confidence: "82%",
    title: "Underperforming Shoe Cleaning Kit",
    description: "62% profit margin product with only 5% attachment rate at checkout.",
    revenueLabel: "Potential Revenue",
    revenue: "₹11K - ₹19K",
    revenueColor: "text-blue-400",
  },
];

export default function OpportunitiesPage() {
  const [selectedOpp, setSelectedOpp] = useState<string>("opp_cross_sell_01");
  const [activeApprovalAction, setActiveApprovalAction] = useState<ApprovalActionPayload | null>(null);

  return (
    <div className="-m-8 min-h-screen bg-[#09090B] flex flex-col">
      <Header />

      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Title & Header */}
        <div className="animate-fade-in-up flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest mb-2">AI Revenue Intelligence</p>
            <h2 className="text-3xl font-black text-zinc-100 flex items-center gap-3">
              Growth Opportunities
              <span className="text-sm font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                3 Proposals
              </span>
            </h2>
            <p className="text-xs text-zinc-500 mt-2">
              Autonomous AI revenue recommendations detected from UrbanKicks historical sales & co-purchase graphs.
            </p>
          </div>

          {/* Hero Stats */}
          <div className="flex items-center gap-4 text-xs">
            <div className="bg-[#121215] border border-[#27272A] rounded-xl px-4 py-3 text-center">
              <p className="text-zinc-500">Combined Potential</p>
              <p className="font-black text-lg text-amber-400 mt-0.5">₹80K+</p>
            </div>
            <div className="bg-[#121215] border border-[#27272A] rounded-xl px-4 py-3 text-center">
              <p className="text-zinc-500">Avg. Confidence</p>
              <p className="font-black text-lg text-emerald-400 mt-0.5">86.3%</p>
            </div>
            <div className="bg-[#121215] border border-[#27272A] rounded-xl px-4 py-3 text-center">
              <p className="text-zinc-500">All Risk Level</p>
              <p className="font-black text-lg text-zinc-100 mt-0.5">LOW</p>
            </div>
          </div>
        </div>

        {/* Opportunity List & Detailed Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Opportunity Cards */}
          <div className="space-y-3">
            {opportunities.map((opp, i) => (
              <div
                key={opp.id}
                onClick={() => setSelectedOpp(opp.id)}
                className={`animate-fade-in-up stagger-${i + 1} p-5 rounded-2xl border cursor-pointer transition-all duration-200 space-y-3 group ${
                  selectedOpp === opp.id
                    ? `bg-[#17171C] ${opp.selectedBorder} shadow-lg ${opp.selectedShadow}`
                    : "bg-[#121215] border-zinc-800 hover:border-zinc-700 hover:-translate-y-0.5"
                }`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className={`font-bold ${opp.typeColor} ${opp.typeBg} px-2.5 py-1 rounded-lg border ${opp.typeBorder} text-[10px] uppercase tracking-wider`}>
                    {opp.type}
                  </span>
                  <span className="font-bold text-emerald-400 text-[11px]">{opp.confidence} Confidence</span>
                </div>
                <h4 className="font-bold text-zinc-100 text-sm leading-snug">{opp.title}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{opp.description}</p>
                <div className="flex justify-between items-center pt-2 text-xs border-t border-zinc-800/80">
                  <span className="text-zinc-500">{opp.revenueLabel}</span>
                  <span className={`font-black text-sm ${opp.revenueColor}`}>{opp.revenue}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Detailed Evidence & AI Reasoning Inspector */}
          <div className="lg:col-span-2 bg-[#121215] border border-zinc-800 rounded-2xl p-6 space-y-6 animate-fade-in-up stagger-2">
            {selectedOpp === "opp_cross_sell_01" && (
              <>
                <div className="flex justify-between items-start border-b border-zinc-800/80 pb-5">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 uppercase tracking-wider">
                      Cross-Sell Detail
                    </span>
                    <h3 className="text-xl font-black text-zinc-100 mt-3">
                      Running Shoes → Sports Socks Bundle
                    </h3>
                  </div>
                  <button
                    onClick={() =>
                      setActiveApprovalAction({
                        opportunityId: "opp_cross_sell_01",
                        actionType: "CREATE_PAYMENT_FLOW",
                        title: "Create Cross-Sell Payment Flow",
                        productName: "Running Pro Shoes + Sports Socks Bundle",
                        price: 3299,
                        standalonePrice: 3398,
                        expectedRevenue: "₹18,000 - ₹42,000",
                        discountPercent: 10,
                        maxRedemptions: 100,
                        maxBudget: 5000,
                        why: "72 customers bought Running Pro Shoes without Sports Socks (15.2% attachment rate vs 28.0% benchmark).",
                        risk: "LOW",
                      })
                    }
                    className="btn-shimmer px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs transition-all duration-200 shadow-lg shadow-amber-500/25 shrink-0"
                  >
                    Prepare Action
                  </button>
                </div>

                {/* Evidence Metrics */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <TrendingUp className="w-3.5 h-3.5" /> Empirical Evidence
                  </h4>
                  <div className="grid grid-cols-4 gap-3 text-xs">
                    {[
                      { label: "Footwear Buyers", value: "72", color: "text-zinc-100" },
                      { label: "Socks Co-Purchased", value: "11", color: "text-zinc-100" },
                      { label: "Attachment Rate", value: "15.2%", color: "text-amber-400" },
                      { label: "Category Benchmark", value: "~28.0%", color: "text-emerald-400" },
                    ].map((m) => (
                      <div key={m.label} className="bg-zinc-900 p-3.5 rounded-xl border border-zinc-800">
                        <p className="text-zinc-500 text-[10px]">{m.label}</p>
                        <p className={`text-lg font-black mt-1 ${m.color}`}>{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Reasoning Pipeline */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Reasoning Pipeline
                  </h4>
                  <div className="space-y-2 text-xs">
                    {[
                      { step: 1, title: "Identify Customer Segment:", desc: "72 customers purchased Running Pro Shoes in last 30 days." },
                      { step: 2, title: "Detect Product Relationship:", desc: "Co-purchase affinity graph indicates high utility pair (Running Shoes + Socks)." },
                      { step: 3, title: "Estimate Incremental AOV:", desc: "+₹399 per cross-sell conversion." },
                      { step: 4, title: "Calculate Bounded Parameters:", desc: "10% bundle discount (₹3,299 vs ₹3,398), max 100 redemptions, ₹5,000 budget cap." },
                    ].map((s) => (
                      <div key={s.step} className="bg-zinc-900/60 p-3.5 rounded-xl border border-zinc-800/80 flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-black text-[11px] flex items-center justify-center shrink-0">
                          {s.step}
                        </span>
                        <p className="text-zinc-400 leading-relaxed">
                          <strong className="text-zinc-200">{s.title}</strong> {s.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {selectedOpp === "opp_checkout_drop_02" && (
              <>
                <div className="flex justify-between items-start border-b border-zinc-800/80 pb-5">
                  <div>
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-lg border border-orange-500/20 uppercase tracking-wider">
                      Checkout Recovery Detail
                    </span>
                    <h3 className="text-xl font-black text-zinc-100 mt-3">
                      High-Value Cart Checkout Recovery (&gt;₹2,500)
                    </h3>
                  </div>
                  <button
                    onClick={() =>
                      setActiveApprovalAction({
                        opportunityId: "opp_checkout_drop_02",
                        actionType: "CREATE_CAMPAIGN",
                        title: "Enable Free Shipping on Carts >= ₹2,500",
                        productName: "High Value Express Free Shipping Tier",
                        price: 0,
                        expectedRevenue: "₹27,000",
                        discountPercent: 5,
                        maxRedemptions: 50,
                        maxBudget: 5000,
                        why: "Recovers 22 cart abandonments triggered by shipping fee friction.",
                        risk: "LOW",
                      })
                    }
                    className="btn-shimmer px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-bold text-xs transition-all duration-200 shadow-lg shadow-orange-500/20 shrink-0"
                  >
                    Prepare Action
                  </button>
                </div>

                <div className="bg-zinc-900/60 p-5 rounded-xl border border-orange-900/30 space-y-2 text-xs">
                  <p className="font-bold text-orange-400 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Friction Analysis
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    Shoppers adding footwear over ₹2,500 experience unexpected ₹150 express shipping charges at final Razorpay checkout step, driving a 31% drop-off rate compared to standard orders.
                  </p>
                </div>
              </>
            )}

            {selectedOpp === "opp_high_margin_03" && (
              <>
                <div className="flex justify-between items-start border-b border-zinc-800/80 pb-5">
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-lg border border-blue-500/20 uppercase tracking-wider">
                      High-Margin Boost Detail
                    </span>
                    <h3 className="text-xl font-black text-zinc-100 mt-3">
                      Shoe Cleaning Kit Margin Boost (62% Margin)
                    </h3>
                  </div>
                  <button
                    onClick={() =>
                      setActiveApprovalAction({
                        opportunityId: "opp_high_margin_03",
                        actionType: "CREATE_PAYMENT_FLOW",
                        title: "Create Checkout Popover Add-On",
                        productName: "Footwear + Shoe Cleaning Kit Add-On",
                        price: 199,
                        standalonePrice: 299,
                        expectedRevenue: "₹11,000 - ₹19,000",
                        discountPercent: 15,
                        maxRedemptions: 100,
                        maxBudget: 5000,
                        why: "62% product margin permits ₹199 popover add-on pricing at footwear selection.",
                        risk: "LOW",
                      })
                    }
                    className="btn-shimmer px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-bold text-xs transition-all duration-200 shadow-lg shadow-blue-500/20 shrink-0"
                  >
                    Prepare Action
                  </button>
                </div>

                <div className="bg-zinc-900/60 p-5 rounded-xl border border-blue-900/30 space-y-2 text-xs">
                  <p className="font-bold text-blue-400 flex items-center gap-1.5">
                    <ArrowUpRight className="w-3.5 h-3.5" /> Margin & Attachment Rate Analysis
                  </p>
                  <p className="text-zinc-300 leading-relaxed">
                    The Shoe Cleaning Kit yields ₹186 profit per ₹299 sale (62% margin). Adding a post-cart add-on prompt at ₹199 captures impulse purchases while retaining a 43% net margin.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Approval Modal */}
      <ApprovalGateModal
        isOpen={!!activeApprovalAction}
        onClose={() => setActiveApprovalAction(null)}
        action={activeApprovalAction}
      />
    </div>
  );
}
