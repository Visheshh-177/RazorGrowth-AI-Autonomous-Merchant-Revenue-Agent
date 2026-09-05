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
  BarChart3,
  Users,
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

const kpis = [
  {
    label: "Total Revenue",
    value: "₹4,82,400",
    change: "+12.4%",
    icon: TrendingUp,
    color: "blue",
    gradient: "from-blue-500/10 to-transparent",
    border: "border-blue-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-400",
  },
  {
    label: "Orders",
    value: "1,284",
    change: "+8.2%",
    icon: ShoppingBag,
    color: "indigo",
    gradient: "from-indigo-500/10 to-transparent",
    border: "border-indigo-500/20",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
  },
  {
    label: "Average Order Value",
    value: "₹1,742",
    change: "+6.1%",
    icon: CreditCard,
    color: "violet",
    gradient: "from-violet-500/10 to-transparent",
    border: "border-violet-500/20",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
  },
  {
    label: "Conversion Rate",
    value: "4.8%",
    change: "+0.7%",
    icon: Percent,
    color: "emerald",
    gradient: "from-emerald-500/10 to-transparent",
    border: "border-emerald-500/20",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
  },
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
      {/* Background orb decoration */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] rounded-full bg-gradient-radial from-blue-600/20 via-indigo-600/5 to-transparent blur-3xl animate-float" />
      </div>

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
            maxBudget: 5000,
            why: "Testing failure simulation mode to demonstrate zero-charge error recovery and idempotency protection.",
            risk: "LOW",
          })
        }
        isAnalyzing={isAnalyzing}
      />

      <div className="p-8 max-w-6xl mx-auto space-y-6 relative">

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className={`animate-fade-in-up stagger-${i + 1} group bg-[#121215] border border-[#27272A] hover:border-zinc-700 p-5 rounded-2xl space-y-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 overflow-hidden relative`}
              >
                {/* Top accent gradient */}
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${kpi.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="flex justify-between items-start">
                  <div className={`w-8 h-8 rounded-lg ${kpi.iconBg} border ${kpi.border} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${kpi.iconColor}`} />
                  </div>
                  <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-2 py-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    {kpi.change}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 mb-1">{kpi.label}</p>
                  <p className="text-2xl font-black text-zinc-100 tracking-tight">{kpi.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Revenue Banner */}
        <div className="animate-fade-in-up stagger-2 relative bg-gradient-to-r from-blue-950/40 via-[#121215] to-[#121215] border border-blue-900/40 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden">
          {/* Decorative orb */}
          <div className="absolute left-[-60px] top-[-40px] w-[200px] h-[200px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

          <div className="space-y-1.5 relative">
            <p className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Sparkles className="w-3 h-3" />
              </span>
              AI Agent Revenue Impact
            </p>
            <h3 className="text-4xl font-black text-zinc-100 tracking-tight">₹1,42,300</h3>
            <p className="text-xs text-zinc-500 max-w-sm">
              Incremental revenue captured across autonomous cross-sells and campaigns.
            </p>
          </div>

          <div className="flex items-center gap-0 text-xs relative">
            {[
              { label: "Cross-sell", value: "₹62,000", color: "text-amber-400" },
              { label: "Upsell", value: "₹41,000", color: "text-blue-400" },
              { label: "Campaigns", value: "₹39,300", color: "text-emerald-400" },
            ].map((item, i) => (
              <div key={item.label} className="border-l border-zinc-800 pl-5 pr-5 space-y-1">
                <p className="text-zinc-500">{item.label}</p>
                <p className={`font-black text-base ${item.color}`}>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Growth Opportunities */}
        <div className="animate-fade-in-up stagger-3 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-zinc-100">Growth Opportunities</h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">Detected by AI from purchase patterns</p>
            </div>
            <a
              href="/opportunities"
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 transition-colors"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Opp 1 */}
            <div className="group bg-[#121215] border border-[#27272A] hover:border-amber-500/40 p-5 rounded-2xl space-y-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/5 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-full" />
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">Cross-sell</span>
                  <span className="text-emerald-400 font-semibold">91% confidence</span>
                </div>
                <h4 className="text-sm font-bold text-zinc-100">Running Shoes + Sports Socks</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  72 footwear buyers purchased without socks. Unlocks ₹18K–₹42K potential lift.
                </p>
              </div>
              <button
                onClick={handleOpenCrossSellApproval}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xs transition-all duration-200 flex items-center justify-center gap-1 shadow-md shadow-amber-500/20"
              >
                <span>Prepare Action</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Opp 2 */}
            <div className="group bg-[#121215] border border-[#27272A] hover:border-orange-500/40 p-5 rounded-2xl space-y-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/5 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-full" />
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-orange-400 font-bold bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-md">Checkout Recovery</span>
                  <span className="text-emerald-400 font-semibold">86% confidence</span>
                </div>
                <h4 className="text-sm font-bold text-zinc-100">High-Value Cart Shipping Friction</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
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
                    maxBudget: 5000,
                    why: "Recovers 22 cart abandonments triggered by shipping fee friction.",
                    risk: "LOW",
                  })
                }
                className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs border border-zinc-700 hover:border-zinc-600 transition-all duration-200 flex items-center justify-center gap-1"
              >
                <span>View Recommendation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Opp 3 */}
            <div className="group bg-[#121215] border border-[#27272A] hover:border-blue-500/40 p-5 rounded-2xl space-y-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/5 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-full" />
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-blue-400 font-bold bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md">High Margin</span>
                  <span className="text-emerald-400 font-semibold">82% confidence</span>
                </div>
                <h4 className="text-sm font-bold text-zinc-100">Shoe Cleaning Kit Popover</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">
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
                    maxBudget: 5000,
                    why: "High 62% margin allows popover discount at footwear purchase step.",
                    risk: "LOW",
                  })
                }
                className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs border border-zinc-700 hover:border-zinc-600 transition-all duration-200 flex items-center justify-center gap-1"
              >
                <span>View Recommendation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Revenue Trend Area Chart */}
        <div className="animate-fade-in-up stagger-4 bg-[#121215] border border-[#27272A] p-6 rounded-2xl space-y-5">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-400" />
                Revenue Growth Trend
              </h3>
              <p className="text-[11px] text-zinc-500 mt-0.5">August 2024 — AI Lift vs Organic Baseline</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-zinc-700"></span> Organic
              </span>
              <span className="flex items-center gap-1.5 text-blue-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500"></span> AI Lift
              </span>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3f3f46" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3f3f46" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorAi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
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
                  formatter={(value: any) => [`₹${value.toLocaleString("en-IN")}`, "Revenue"]}
                  labelStyle={{ color: "#71717a", marginBottom: "4px" }}
                />
                <Area type="monotone" dataKey="organic" stroke="#52525b" strokeWidth={2} fillOpacity={1} fill="url(#colorOrganic)" />
                <Area type="monotone" dataKey="aiLift" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorAi)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Audit Log Banner */}
        <div className="animate-fade-in-up stagger-4 bg-[#121215] border border-[#27272A] hover:border-zinc-700 p-4 rounded-2xl flex items-center justify-between text-xs transition-all duration-200 group">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wide font-semibold">Latest Audit Event</p>
              <p className="text-zinc-300 mt-0.5">
                <strong className="text-zinc-100 font-mono">12:41:08</strong> — Cross-sell opportunity detected for Running Pro Shoes + Sports Socks
              </p>
            </div>
          </div>
          <a href="/audit" className="text-blue-400 font-semibold hover:text-blue-300 flex items-center gap-1 transition-colors shrink-0">
            View Audit Log <ChevronRight className="w-3.5 h-3.5" />
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
