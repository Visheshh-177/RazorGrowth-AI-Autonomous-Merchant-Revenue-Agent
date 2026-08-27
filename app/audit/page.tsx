"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { ShieldCheck, Filter, ChevronDown, CheckCircle2, ShieldAlert, XCircle, Clock } from "lucide-react";

interface AuditLogItem {
  id: string;
  time: string;
  actor: "AI Agent" | "Merchant" | "Razorpay System" | "Policy Engine";
  action: string;
  reason: string;
  status: "SUCCESS" | "BLOCKED" | "FAILED";
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
  approvalStatus: "AUTOMATIC" | "MANUALLY_APPROVED" | "MANUALLY_REJECTED";
  apiRef?: string;
  inputJson?: any;
  outputJson?: any;
}

const auditLogs: AuditLogItem[] = [
  {
    id: "log_101",
    time: "12:45:34",
    actor: "Razorpay System",
    action: "CAMPAIGN_ANALYTICS_UPDATED",
    reason: "Updated campaign revenue generated after receiving payment",
    status: "SUCCESS",
    riskLevel: "LOW",
    approvalStatus: "AUTOMATIC",
    apiRef: "camp_running_cross_sell",
  },
  {
    id: "log_102",
    time: "12:45:32",
    actor: "Razorpay System",
    action: "PAYMENT_RECEIVED",
    reason: "Payment pay_mock_72AB completed successfully for ₹3,299",
    status: "SUCCESS",
    riskLevel: "LOW",
    approvalStatus: "AUTOMATIC",
    apiRef: "pay_mock_72AB",
  },
  {
    id: "log_103",
    time: "12:42:09",
    actor: "Razorpay System",
    action: "CREATE_PAYMENT_LINK_MOCK",
    reason: "Created Razorpay Payment Link plink_mock_8F91X",
    status: "SUCCESS",
    riskLevel: "LOW",
    approvalStatus: "MANUALLY_APPROVED",
    apiRef: "plink_mock_8F91X",
  },
  {
    id: "log_104",
    time: "12:42:07",
    actor: "Policy Engine",
    action: "VALIDATE_ACTION_POLICY",
    reason: "Policy validation passed (Discount 10% <= 15%, Budget ₹5,000 <= ₹5,000)",
    status: "SUCCESS",
    riskLevel: "LOW",
    approvalStatus: "AUTOMATIC",
  },
  {
    id: "log_105",
    time: "12:42:03",
    actor: "Merchant",
    action: "APPROVE_ACTION",
    reason: "Merchant manually approved action: Create Cross-Sell Payment Flow",
    status: "SUCCESS",
    riskLevel: "LOW",
    approvalStatus: "MANUALLY_APPROVED",
  },
  {
    id: "log_106",
    time: "12:41:40",
    actor: "Policy Engine",
    action: "BLOCK_ACTION_POLICY",
    reason: "Blocked action: Requested discount 50% exceeds merchant limit of 15%",
    status: "BLOCKED",
    riskLevel: "HIGH",
    approvalStatus: "AUTOMATIC",
  },
  {
    id: "log_107",
    time: "12:41:15",
    actor: "AI Agent",
    action: "ESTIMATE_REVENUE_IMPACT",
    reason: "Estimated revenue lift range: ₹18,000 - ₹42,000",
    status: "SUCCESS",
    riskLevel: "LOW",
    approvalStatus: "AUTOMATIC",
  },
  {
    id: "log_108",
    time: "12:41:08",
    actor: "AI Agent",
    action: "DETECT_CROSS_SELL_OPPORTUNITY",
    reason: "Identified low socks attachment rate (15.2%) on Running Pro Shoes",
    status: "SUCCESS",
    riskLevel: "LOW",
    approvalStatus: "AUTOMATIC",
  },
  {
    id: "log_109",
    time: "12:41:02",
    actor: "AI Agent",
    action: "ANALYZE_SALES_DATA",
    reason: "Routine daily revenue growth scan across UrbanKicks orders",
    status: "SUCCESS",
    riskLevel: "LOW",
    approvalStatus: "AUTOMATIC",
  },
];

export default function AuditPage() {
  const [filterActor, setFilterActor] = useState<string>("All");
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const filtered =
    filterActor === "All"
      ? auditLogs
      : auditLogs.filter((l) => l.actor === filterActor || l.status === filterActor);

  return (
    <div className="-m-8 min-h-screen bg-[#09090B] flex flex-col">
      <Header />

      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
              Immutable Audit Trail
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                100% Gated & Audited
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Complete chronological audit trail recording every AI analysis, policy check, merchant approval, and Razorpay API event.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {["All", "AI Agent", "Merchant", "Policy Engine", "Razorpay System", "BLOCKED"].map((actor) => (
              <button
                key={actor}
                onClick={() => setFilterActor(actor)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border ${
                  filterActor === actor
                    ? "bg-amber-500 text-black font-bold border-amber-500"
                    : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                }`}
              >
                {actor}
              </button>
            ))}
          </div>
        </div>

        {/* Audit Log Timeline */}
        <div className="bg-[#121215] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="divide-y divide-zinc-800/80">
            {filtered.map((log) => (
              <div key={log.id} className="p-5 hover:bg-zinc-900/40 transition-colors space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {log.time}
                    </span>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        log.actor === "AI Agent"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : log.actor === "Merchant"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : log.actor === "Policy Engine"
                          ? "bg-orange-500/10 text-orange-400 border-orange-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }`}
                    >
                      {log.actor}
                    </span>

                    <h4 className="font-bold text-zinc-100 text-xs tracking-wide">{log.action}</h4>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                        log.status === "SUCCESS"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      }`}
                    >
                      ● {log.status}
                    </span>
                    <button
                      onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                      className="text-xs text-zinc-400 hover:text-zinc-200"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-zinc-300 pl-16 leading-relaxed">{log.reason}</p>

                {log.apiRef && (
                  <div className="pl-16 pt-1 text-[11px] font-mono text-amber-400">
                    API Ref: {log.apiRef}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
