"use client";

import { useState } from "react";
import { ShieldCheck, AlertCircle, CheckCircle2, ExternalLink, Copy, Check, X, ShieldAlert, Sparkles } from "lucide-react";

export interface ApprovalActionPayload {
  opportunityId?: string;
  actionType: string;
  title: string;
  productName: string;
  price: number;
  standalonePrice?: number;
  expectedRevenue: string;
  discountPercent: number;
  maxRedemptions: number;
  maxBudget?: number;
  why: string;
  risk: "LOW" | "MEDIUM" | "HIGH";
}

interface ApprovalGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: ApprovalActionPayload | null;
  onApproveSuccess?: (result: any) => void;
}

export function ApprovalGateModal({
  isOpen,
  onClose,
  action,
  onApproveSuccess,
}: ApprovalGateModalProps) {
  const [isExecuting, setIsExecuting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [errorDetails, setErrorDetails] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !action) return null;

  // Bug fix: reset state on close
  const handleClose = () => {
    setResult(null);
    setErrorDetails(null);
    setCopied(false);
    onClose();
  };

  const handleApprove = async (simulateFailure = false) => {
    setIsExecuting(true);
    setErrorDetails(null);

    try {
      const res = await fetch("/api/actions/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          opportunityId: action.opportunityId,
          actionType: action.actionType,
          parameters: {
            title: action.title,
            productName: action.productName,
            price: action.price,
            discount_percent: action.discountPercent,
            max_redemptions: action.maxRedemptions,
            max_budget: action.maxBudget || 5000,
          },
          simulateFailure,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorDetails(data);
      } else {
        setResult(data);
        if (onApproveSuccess) onApproveSuccess(data);
      }
    } catch (err: any) {
      setErrorDetails({ error: err.message || "Failed to execute action." });
    } finally {
      setIsExecuting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const riskColors: Record<string, string> = {
    LOW: "text-emerald-400",
    MEDIUM: "text-amber-400",
    HIGH: "text-red-400",
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="animate-slide-in bg-[#121215] border border-[#27272a] rounded-2xl w-full max-w-md shadow-2xl shadow-black/60 overflow-hidden">

        {/* Header */}
        <div className="relative p-5 border-b border-zinc-800/80 flex items-center justify-between bg-gradient-to-r from-blue-950/20 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center">
              <ShieldCheck className="w-4.5 h-4.5 text-blue-400" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                Action Approval Gate
              </p>
              <h3 className="text-sm font-bold text-zinc-100 mt-0.5">{action.title}</h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-all duration-150"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs">
          {!result && !errorDetails && (
            <>
              {/* Product Info */}
              <div className="bg-zinc-900/70 p-4 rounded-xl border border-zinc-800 space-y-2">
                <div className="flex justify-between items-center text-zinc-400">
                  <span className="text-[11px]">Product Bundle</span>
                  <span className={`font-bold text-[11px] ${riskColors[action.risk] || "text-emerald-400"}`}>
                    {action.risk} RISK
                  </span>
                </div>
                <p className="text-sm font-bold text-zinc-100">{action.productName}</p>
                <div className="flex items-baseline gap-2 pt-0.5">
                  <span className="text-xl font-black text-zinc-100">
                    ₹{action.price.toLocaleString("en-IN")}
                  </span>
                  {action.standalonePrice && (
                    <span className="text-xs text-zinc-500 line-through">
                      ₹{action.standalonePrice.toLocaleString("en-IN")}
                    </span>
                  )}
                  {action.standalonePrice && (
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                      {action.discountPercent}% OFF
                    </span>
                  )}
                </div>
              </div>

              {/* Parameter Grid */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
                  <p className="text-zinc-500 text-[11px]">Est. Impact</p>
                  <p className="font-bold text-emerald-400 mt-0.5">{action.expectedRevenue}</p>
                </div>
                <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
                  <p className="text-zinc-500 text-[11px]">Discount Cap</p>
                  <p className="font-bold text-zinc-200 mt-0.5">{action.discountPercent}% (Max 15%)</p>
                </div>
                <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
                  <p className="text-zinc-500 text-[11px]">Max Redemptions</p>
                  <p className="font-bold text-zinc-200 mt-0.5">{action.maxRedemptions} orders</p>
                </div>
                <div className="bg-zinc-900/60 p-3 rounded-xl border border-zinc-800/80">
                  <p className="text-zinc-500 text-[11px]">Campaign Budget</p>
                  <p className="font-bold text-zinc-200 mt-0.5">₹{(action.maxBudget || 5000).toLocaleString("en-IN")}</p>
                </div>
              </div>

              {/* AI Justification */}
              <div className="bg-gradient-to-r from-blue-950/20 to-transparent p-3.5 rounded-xl border border-blue-900/30 space-y-1">
                <p className="font-semibold text-zinc-200 flex items-center gap-1.5 text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                  AI Recommendation Reason
                </p>
                <p className="text-zinc-400 leading-relaxed text-[11px]">{action.why}</p>
              </div>
            </>
          )}

          {/* Success State */}
          {result && (
            <div className="bg-zinc-900/80 border border-emerald-900/50 rounded-xl p-4 space-y-3 glow-emerald">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Payment Link Created Successfully</span>
              </div>

              <div className="bg-zinc-950 p-3 rounded-lg border border-zinc-800 font-mono text-xs space-y-1">
                <div className="flex justify-between text-zinc-500 text-[10px]">
                  <span>ID: {result.paymentLink?.id}</span>
                  <span className="text-emerald-400">{result.paymentLink?.mode}</span>
                </div>
                <p className="text-blue-400 font-bold break-all text-xs">{result.paymentLink?.short_url}</p>
              </div>

              <div className="flex gap-2 pt-1">
                <a
                  href={result.paymentLink?.short_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open Checkout
                </a>
                <button
                  onClick={() => copyToClipboard(result.paymentLink?.short_url)}
                  className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs flex items-center gap-1.5 transition-all duration-150 border border-zinc-700"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}

          {/* Error State */}
          {errorDetails && (
            <div className="bg-zinc-900/80 border border-red-900/50 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-bold text-xs">
                <ShieldAlert className="w-4 h-4" />
                <span>{errorDetails.error || "Action Blocked"}</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{errorDetails.message || errorDetails.error}</p>
              {errorDetails.retryable && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleApprove(false)}
                    className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors"
                  >
                    Retry Safely
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!result && (
          <div className="bg-zinc-900/50 p-4 border-t border-zinc-800/80 flex items-center justify-between gap-2">
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs transition-all duration-150 border border-zinc-700"
            >
              Reject
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleApprove(true)}
                disabled={isExecuting}
                className="px-3 py-2 rounded-xl bg-zinc-800 hover:bg-red-950/50 text-red-400 hover:text-red-300 border border-zinc-700 hover:border-red-900/50 text-xs transition-all duration-150 disabled:opacity-50"
                title="Test failure simulation mode"
              >
                Test Fail
              </button>
              <button
                onClick={() => handleApprove(false)}
                disabled={isExecuting}
                className="btn-shimmer px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition-all duration-200 shadow-md shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isExecuting ? "Executing..." : "Approve & Execute"}
              </button>
            </div>
          </div>
        )}
        {result && (
          <div className="p-4 border-t border-zinc-800/80">
            <button
              onClick={handleClose}
              className="w-full py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold text-xs transition-all duration-150"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
