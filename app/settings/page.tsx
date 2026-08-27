"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { ShieldCheck, Lock, Sliders, Key, Save, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  const [maxDiscount, setMaxDiscount] = useState(15);
  const [maxBudget, setMaxBudget] = useState(5000);
  const [maxRedemptions, setMaxRedemptions] = useState(100);
  const [requireApproval, setRequireApproval] = useState(true);
  const [allowLiveMode, setAllowLiveMode] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="-m-8 min-h-screen bg-[#09090B] flex flex-col">
      <Header />

      <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
              Merchant Risk & Policy Controls
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Safety Engine Active
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Configure strict safety boundaries enforced on AI agent tool execution and Razorpay payments.
            </p>
          </div>

          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-black font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-amber-500/20"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>

        {savedNotice && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-xs text-emerald-400 font-semibold">
            ✓ Policy settings updated & enforced in Policy Engine!
          </div>
        )}

        {/* Risk Controls Box */}
        <div className="bg-[#121215] border border-amber-500/30 rounded-2xl p-6 space-y-6 shadow-xl">
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">Merchant Safety Limits</h3>
              <p className="text-xs text-zinc-400">
                The AI Agent cannot override these limits under any circumstances.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Maximum Discount Slider */}
            <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-200">Maximum Discount Allowed</span>
                <span className="font-mono font-bold text-amber-400">{maxDiscount}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={maxDiscount}
                onChange={(e) => setMaxDiscount(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <p className="text-[11px] text-zinc-400">
                Any AI campaign attempting a discount over {maxDiscount}% will be automatically blocked by the policy engine.
              </p>
            </div>

            {/* Campaign Budget Cap */}
            <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-200">Maximum Campaign Budget</span>
                <span className="font-mono font-bold text-amber-400">₹{maxBudget.toLocaleString("en-IN")}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="20000"
                step="1000"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Max Redemptions */}
            <div className="bg-zinc-900/80 p-4 rounded-xl border border-zinc-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-zinc-200">Maximum Campaign Redemptions</span>
                <span className="font-mono font-bold text-amber-400">{maxRedemptions} orders</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={maxRedemptions}
                onChange={(e) => setMaxRedemptions(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Toggle Switches */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex items-center justify-between">
                <div>
                  <p className="font-bold text-zinc-100">Require Approval for Money Actions</p>
                  <p className="text-[11px] text-zinc-400 mt-0.5">Always gate payment links behind merchant click</p>
                </div>
                <input
                  type="checkbox"
                  checked={requireApproval}
                  onChange={(e) => setRequireApproval(e.target.checked)}
                  className="w-5 h-5 accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex items-center justify-between opacity-75">
                <div>
                  <p className="font-bold text-zinc-100 flex items-center gap-1.5">
                    Live Mode Payments
                    <Lock className="w-3.5 h-3.5 text-red-400" />
                  </p>
                  <p className="text-[11px] text-red-400 mt-0.5">Disabled by default for safety</p>
                </div>
                <input
                  type="checkbox"
                  checked={allowLiveMode}
                  disabled
                  className="w-5 h-5 accent-amber-500 cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Razorpay Credentials Card */}
        <div className="bg-[#121215] border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
            <Key className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-bold text-zinc-100">Razorpay API Credentials (Test Mode)</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="text-zinc-400 font-medium">RAZORPAY_KEY_ID</label>
              <input
                type="text"
                placeholder="rzp_test_..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 font-mono outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-zinc-400 font-medium">RAZORPAY_KEY_SECRET</label>
              <input
                type="password"
                placeholder="••••••••••••••••"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-100 font-mono outline-none"
              />
            </div>
          </div>
          <p className="text-[11px] text-zinc-500">
            If left unconfigured, RazorGrowth automatically runs in <strong>Razorpay Mock Mode</strong> using realistic payment simulation fallback.
          </p>
        </div>
      </div>
    </div>
  );
}
