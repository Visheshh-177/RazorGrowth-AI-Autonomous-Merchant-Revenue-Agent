"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { ApprovalGateModal, ApprovalActionPayload } from "@/components/approval/ApprovalGateModal";
import { Zap, ChevronRight, CheckCircle2, AlertCircle, Sparkles, TrendingUp, ShieldCheck } from "lucide-react";

export default function OpportunitiesPage() {
  const [selectedOpp, setSelectedOpp] = useState<string>("opp_cross_sell_01");
  const [activeApprovalAction, setActiveApprovalAction] = useState<ApprovalActionPayload | null>(null);

  return (
    <div className="-m-8 min-h-screen bg-[#09090B] flex flex-col">
      <Header />

      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Title & Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
              AI Growth Opportunities
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                3 Actionable Proposals
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Autonomous AI revenue recommendations detected from UrbanKicks historical sales & co-purchase graphs.
            </p>
          </div>
        </div>

        {/* Opportunity List & Detailed Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Opportunity Cards */}
          <div className="space-y-4">
            {/* Opp 1 */}
            <div
              onClick={() => setSelectedOpp("opp_cross_sell_01")}
              className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                selectedOpp === "opp_cross_sell_01"
                  ? "bg-[#17171C] border-amber-500/50 shadow-lg shadow-amber-500/10"
                  : "bg-[#121215] border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  CROSS-SELL
                </span>
                <span className="font-bold text-emerald-400">91% Confidence</span>
              </div>
              <h4 className="font-bold text-zinc-100 text-sm">Running Shoes → Sports Socks</h4>
              <p className="text-xs text-zinc-400">
                72 customers bought Running Pro Shoes but not Sports Socks.
              </p>
              <div className="flex justify-between items-center pt-2 text-xs border-t border-zinc-800/80">
                <span className="text-zinc-500">Potential Revenue</span>
                <span className="font-bold text-amber-400">₹18K - ₹42K</span>
              </div>
            </div>

            {/* Opp 2 */}
            <div
              onClick={() => setSelectedOpp("opp_checkout_drop_02")}
              className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                selectedOpp === "opp_checkout_drop_02"
                  ? "bg-[#17171C] border-orange-500/50 shadow-lg shadow-orange-500/10"
                  : "bg-[#121215] border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                  CHECKOUT RECOVERY
                </span>
                <span className="font-bold text-emerald-400">86% Confidence</span>
              </div>
              <h4 className="font-bold text-zinc-100 text-sm">Checkout Conversion Drop (&gt;₹2,500)</h4>
              <p className="text-xs text-zinc-400">
                Customers spending over ₹2,500 have a 31% lower conversion rate.
              </p>
              <div className="flex justify-between items-center pt-2 text-xs border-t border-zinc-800/80">
                <span className="text-zinc-500">Potential Recovery</span>
                <span className="font-bold text-orange-400">₹27,000</span>
              </div>
            </div>

            {/* Opp 3 */}
            <div
              onClick={() => setSelectedOpp("opp_high_margin_03")}
              className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                selectedOpp === "opp_high_margin_03"
                  ? "bg-[#17171C] border-blue-500/50 shadow-lg shadow-blue-500/10"
                  : "bg-[#121215] border-zinc-800 hover:border-zinc-700"
              }`}
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                  HIGH MARGIN BOOST
                </span>
                <span className="font-bold text-emerald-400">82% Confidence</span>
              </div>
              <h4 className="font-bold text-zinc-100 text-sm">Underperforming Shoe Cleaning Kit</h4>
              <p className="text-xs text-zinc-400">
                62% profit margin product with only 5% attachment rate at checkout.
              </p>
              <div className="flex justify-between items-center pt-2 text-xs border-t border-zinc-800/80">
                <span className="text-zinc-500">Potential Revenue</span>
                <span className="font-bold text-blue-400">₹11K - ₹19K</span>
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Evidence & AI Reasoning Inspector */}
          <div className="lg:col-span-2 bg-[#121215] border border-zinc-800 rounded-2xl p-6 space-y-6">
            {selectedOpp === "opp_cross_sell_01" && (
              <>
                <div className="flex justify-between items-start border-b border-zinc-800 pb-5">
                  <div>
                    <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                      CROSS-SELL OPPORTUNITY DETAIL
                    </span>
                    <h3 className="text-xl font-bold text-zinc-100 mt-2">
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
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold text-xs transition-all shadow-md shadow-amber-500/20"
                  >
                    Prepare Action
                  </button>
                </div>

                {/* Evidence Metrics */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                    Empirical Evidence
                  </h4>
                  <div className="grid grid-cols-4 gap-3 text-xs">
                    <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                      <p className="text-zinc-500">Footwear Buyers</p>
                      <p className="text-lg font-bold text-zinc-100 mt-0.5">72</p>
                    </div>
                    <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                      <p className="text-zinc-500">Socks Co-Purchased</p>
                      <p className="text-lg font-bold text-zinc-100 mt-0.5">11</p>
                    </div>
                    <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                      <p className="text-zinc-500">Attachment Rate</p>
                      <p className="text-lg font-bold text-amber-400 mt-0.5">15.2%</p>
                    </div>
                    <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                      <p className="text-zinc-500">Category Benchmark</p>
                      <p className="text-lg font-bold text-emerald-400 mt-0.5">~28.0%</p>
                    </div>
                  </div>
                </div>

                {/* AI Reasoning Pipeline */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    AI Reasoning & Pipeline Steps
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800 flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center shrink-0">1</span>
                      <p className="text-zinc-300"><strong className="text-zinc-100">Identify Customer Segment:</strong> 72 customers purchased Running Pro Shoes in last 30 days.</p>
                    </div>
                    <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800 flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center shrink-0">2</span>
                      <p className="text-zinc-300"><strong className="text-zinc-100">Detect Product Relationship:</strong> Co-purchase affinity graph indicates high utility pair (Running Shoes + Socks).</p>
                    </div>
                    <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800 flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center shrink-0">3</span>
                      <p className="text-zinc-300"><strong className="text-zinc-100">Estimate Incremental AOV:</strong> +₹399 per cross-sell conversion.</p>
                    </div>
                    <div className="bg-zinc-900/60 p-3 rounded-lg border border-zinc-800 flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-400 font-bold flex items-center justify-center shrink-0">4</span>
                      <p className="text-zinc-300"><strong className="text-zinc-100">Calculate Bounded Parameters:</strong> 10% bundle discount (₹3,299 vs ₹3,398), max 100 redemptions, ₹5,000 budget cap.</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {selectedOpp === "opp_checkout_drop_02" && (
              <>
                <div className="flex justify-between items-start border-b border-zinc-800 pb-5">
                  <div>
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded border border-orange-500/20">
                      CHECKOUT RECOVERY DETAIL
                    </span>
                    <h3 className="text-xl font-bold text-zinc-100 mt-2">
                      High-Value Cart Checkout Conversion Recovery (&gt;₹2,500)
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
                        why: "Recovers 22 cart abandonments triggered by shipping fee friction.",
                        risk: "LOW",
                      })
                    }
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-black font-bold text-xs transition-all shadow-md"
                  >
                    Prepare Action
                  </button>
                </div>

                <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-2 text-xs">
                  <p className="font-semibold text-orange-400">Friction Analysis</p>
                  <p className="text-zinc-300 leading-relaxed">
                    Shoppers adding footwear over ₹2,500 experience unexpected ₹150 express shipping charges at final Razorpay checkout step, driving a 31% drop-off rate compared to standard orders.
                  </p>
                </div>
              </>
            )}

            {selectedOpp === "opp_high_margin_03" && (
              <>
                <div className="flex justify-between items-start border-b border-zinc-800 pb-5">
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
                      HIGH-MARGIN BOOST DETAIL
                    </span>
                    <h3 className="text-xl font-bold text-zinc-100 mt-2">
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
                        why: "62% product margin permits ₹199 popover add-on pricing at footwear selection.",
                        risk: "LOW",
                      })
                    }
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-bold text-xs transition-all shadow-md"
                  >
                    Prepare Action
                  </button>
                </div>

                <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 space-y-2 text-xs">
                  <p className="font-semibold text-blue-400">Margin & Attachment Rate Analysis</p>
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
