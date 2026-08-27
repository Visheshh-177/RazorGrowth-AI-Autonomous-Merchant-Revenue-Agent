"use client";

import { useState } from "react";
import { ShieldCheck, AlertCircle, CheckCircle2, ExternalLink, Copy, Check, X, ShieldAlert } from "lucide-react";

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

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#121215] border border-[#27272A] rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <div>
              <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                Action Approval Gate
              </p>
              <h3 className="text-sm font-semibold text-zinc-100">{action.title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 text-xs">
          {!result && !errorDetails && (
            <>
              {/* Product Info */}
              <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 space-y-1.5">
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Product Bundle</span>
                  <span className="text-emerald-400 font-semibold">{action.risk} RISK</span>
                </div>
                <p className="text-sm font-semibold text-zinc-100">{action.productName}</p>
                <div className="flex items-baseline gap-2 pt-0.5">
                  <span className="text-lg font-bold text-zinc-100">₹{action.price.toLocaleString("en-IN")}</span>
                  {action.standalonePrice && (
                    <span className="text-xs text-zinc-500 line-through">
                      ₹{action.standalonePrice.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>

              {/* Parameter Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                  <p className="text-zinc-500 text-[11px]">Est. Impact</p>
                  <p className="font-semibold text-emerald-400 mt-0.5">{action.expectedRevenue}</p>
                </div>
                <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                  <p className="text-zinc-500 text-[11px]">Discount Cap</p>
                  <p className="font-semibold text-zinc-200 mt-0.5">{action.discountPercent}% (Max 15%)</p>
                </div>
                <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                  <p className="text-zinc-500 text-[11px]">Max Redemptions</p>
                  <p className="font-semibold text-zinc-200 mt-0.5">{action.maxRedemptions} orders</p>
                </div>
                <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800">
                  <p className="text-zinc-500 text-[11px]">Campaign Budget</p>
                  <p className="font-semibold text-zinc-200 mt-0.5">₹{action.maxBudget || 5000}</p>
                </div>
              </div>

              {/* AI Justification */}
              <div className="bg-zinc-900 p-3.5 rounded-lg border border-zinc-800 space-y-1">
                <p className="font-medium text-zinc-300 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-blue-400" />
                  AI Recommendation Reason
                </p>
                <p className="text-zinc-400 leading-normal text-[11px]">{action.why}</p>
              </div>
            </>
          )}

          {/* Success State */}
          {result && (
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Payment Link Created Successfully</span>
              </div>

              <div className="bg-zinc-950 p-3 rounded-lg font-mono text-xs space-y-1">
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
                  className="flex-1 py-2 rounded-lg bg-zinc-100 hover:bg-white text-black font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open Checkout
                </a>
                <button
                  onClick={() => copyToClipboard(result.paymentLink?.short_url)}
                  className="px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied" : "Copy Link"}
                </button>
              </div>
            </div>
          )}

          {/* Error State */}
          {errorDetails && (
            <div className="bg-zinc-900 border border-red-900/40 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-red-400 font-semibold text-xs">
                <ShieldAlert className="w-4 h-4" />
                <span>{errorDetails.error || "Action Blocked"}</span>
              </div>
              <p className="text-xs text-zinc-400">{errorDetails.message || errorDetails.error}</p>
              {errorDetails.retryable && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleApprove(false)}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold"
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
          <div className="bg-zinc-900 p-4 border-t border-zinc-800 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium text-xs transition-colors"
            >
              Reject
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleApprove(true)}
                disabled={isExecuting}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-red-950/40 text-red-400 text-xs transition-colors"
                title="Test failure simulation mode"
              >
                Test Fail
              </button>
              <button
                onClick={() => handleApprove(false)}
                disabled={isExecuting}
                className="px-4 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-black font-semibold text-xs transition-colors shadow-sm disabled:opacity-50"
              >
                {isExecuting ? "Executing..." : "Approve & Execute"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
