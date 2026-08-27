"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { ApprovalGateModal, ApprovalActionPayload } from "@/components/approval/ApprovalGateModal";
import {
  TrendingUp,
  ShoppingBag,
  CreditCard,
  Percent,
  Sparkles,
  Zap,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const chartData = [
  { day: "Aug 01", organic: 12400, aiLift: 0 },
  { day: "Aug 05", organic: 14200, aiLift: 1800 },
  { day: "Aug 10", organic: 13800, aiLift: 3400 },
  { day: "Aug 15", organic: 15600, aiLift: 5200 },
  { day: "Aug 20", organic: 16100, aiLift: 7800 },
  { day: "Aug 25", organic: 17400, aiLift: 9600 },
];

export default function DashboardPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeApprovalAction, setActiveApprovalAction] = useState<ApprovalActionPayload | null>(null);

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      await fetch("/api/agent/analyze", { method: "POST" });
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleOpenCrossSellApproval = () => {
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
    });
  };

  return (
    <div className="-m-8 min-h-screen bg-[#09090B]">
      <Header
        onRunAnalysis={handleRunAnalysis}
        onSimulateFailure={() =>
          setActiveApprovalAction({
            opportunityId: "opp_cross_sell_01",
            actionType: "CREATE_PAYMENT_FLOW",
            title: "Simulated Razorpay Failure Test",
            productName: "Running Pro Shoes + Sports Socks Bundle",
            price: 3299,
            expectedRevenue: "₹18,000 - ₹42,000",
            discountPercent: 10,
            maxRedemptions: 100,
            why: "Testing failure simulation mode to demonstrate zero-charge error recovery and idempotency protection.",
            risk: "LOW",
          })
        }
        isAnalyzing={isAnalyzing}
      />

      <div className="p-8 max-w-6xl mx-auto space-y-8">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[#121215] border border-[#27272A] p-5 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Total Revenue</span>
              <span className="text-emerald-400 font-medium flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +12.4%
              </span>
            </div>
            <p className="text-2xl font-bold text-zinc-100 tracking-tight">₹4,82,400</p>
          </div>

          <div className="bg-[#121215] border border-[#27272A] p-5 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Orders</span>
              <span className="text-emerald-400 font-medium flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +8.2%
              </span>
            </div>
            <p className="text-2xl font-bold text-zinc-100 tracking-tight">1,284</p>
          </div>

          <div className="bg-[#121215] border border-[#27272A] p-5 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Average Order Value</span>
              <span className="text-emerald-400 font-medium flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +6.1%
              </span>
            </div>
            <p className="text-2xl font-bold text-zinc-100 tracking-tight">₹1,742</p>
          </div>

          <div className="bg-[#121215] border border-[#27272A] p-5 rounded-xl space-y-2">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Conversion Rate</span>
              <span className="text-emerald-400 font-medium flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +0.7%
              </span>
            </div>
            <p className="text-2xl font-bold text-zinc-100 tracking-tight">4.8%</p>
          </div>
        </div>

        {/* AI Revenue Banner */}
        <div className="bg-[#121215] border border-[#27272A] p-6 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-blue-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              AI Agent Revenue Impact
            </p>
            <h3 className="text-3xl font-bold text-zinc-100">₹1,42,300</h3>
            <p className="text-xs text-zinc-400">Incremental revenue captured across autonomous cross-sells and campaigns.</p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="border-l border-zinc-800 pl-4 space-y-0.5">
              <p className="text-zinc-500">Cross-sell</p>
              <p className="font-semibold text-zinc-100">₹62,000</p>
            </div>
            <div className="border-l border-zinc-800 pl-4 space-y-0.5">
              <p className="text-zinc-500">Upsell</p>
              <p className="font-semibold text-zinc-100">₹41,000</p>
            </div>
            <div className="border-l border-zinc-800 pl-4 space-y-0.5">
              <p className="text-zinc-500">Campaigns</p>
              <p className="font-semibold text-zinc-100">₹39,300</p>
            </div>
          </div>
        </div>

        {/* Top Growth Opportunities */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-zinc-100">Growth Opportunities</h3>
            <a href="/opportunities" className="text-xs text-blue-400 hover:underline">View All →</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Opp 1 */}
            <div className="bg-[#121215] border border-[#27272A] hover:border-zinc-700 p-5 rounded-xl space-y-3 flex flex-col justify-between transition-colors">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-amber-400 font-medium">Cross-sell</span>
                  <span className="text-emerald-400 font-medium">91% confidence</span>
                </div>
                <h4 className="text-sm font-semibold text-zinc-100">Running Shoes + Sports Socks</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  72 footwear buyers purchased without socks. Unlocks ₹18K–₹42K potential lift.
                </p>
              </div>
              <button
                onClick={handleOpenCrossSellApproval}
                className="w-full py-2 rounded-lg bg-zinc-100 hover:bg-white text-black font-semibold text-xs transition-colors flex items-center justify-center gap-1"
              >
                <span>Prepare Action</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Opp 2 */}
            <div className="bg-[#121215] border border-[#27272A] hover:border-zinc-700 p-5 rounded-xl space-y-3 flex flex-col justify-between transition-colors">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-orange-400 font-medium">Checkout Recovery</span>
                  <span className="text-emerald-400 font-medium">86% confidence</span>
                </div>
                <h4 className="text-sm font-semibold text-zinc-100">High-Value Cart Shipping Friction</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Orders &gt;₹2,500 exhibit 31% cart abandonment. Recovers estimated ₹27,000.
                </p>
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
                className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs border border-zinc-800 transition-colors flex items-center justify-center gap-1"
              >
                <span>View Recommendation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Opp 3 */}
            <div className="bg-[#121215] border border-[#27272A] hover:border-zinc-700 p-5 rounded-xl space-y-3 flex flex-col justify-between transition-colors">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-blue-400 font-medium">High Margin</span>
                  <span className="text-emerald-400 font-medium">82% confidence</span>
                </div>
                <h4 className="text-sm font-semibold text-zinc-100">Shoe Cleaning Kit Popover</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  62% margin accessory with 5% attachment. Unlocks ₹11K–₹19K revenue.
                </p>
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
                    why: "High 62% margin allows popover discount at footwear purchase step.",
                    risk: "LOW",
                  })
                }
                className="w-full py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs border border-zinc-800 transition-colors flex items-center justify-center gap-1"
              >
                <span>View Recommendation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Revenue Trend Area Chart */}
        <div className="bg-[#121215] border border-[#27272A] p-6 rounded-xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold text-zinc-100">Revenue Growth Trend</h3>
            <div className="flex items-center gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-zinc-600"></span> Organic Baseline
              </span>
              <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                <span className="w-2.5 h-2.5 rounded bg-blue-500"></span> AI Revenue Lift
              </span>
            </div>
          </div>

          <div className="h-56 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3f3f46" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3f3f46" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="day" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "6px" }}
                  formatter={(value: any) => [`₹${value.toLocaleString("en-IN")}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="organic" stroke="#71717a" fillOpacity={1} fill="url(#colorOrganic)" />
                <Area type="monotone" dataKey="aiLift" stroke="#3b82f6" fillOpacity={1} fill="url(#colorAi)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Audit Log Banner */}
        <div className="bg-[#121215] border border-[#27272A] p-4 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-zinc-300">
              Latest Event: <strong>12:41:08</strong> — Cross-sell opportunity detected for Running Pro Shoes + Sports Socks
            </span>
          </div>
          <a href="/audit" className="text-blue-400 font-medium hover:underline">
            View Audit Log →
          </a>
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
