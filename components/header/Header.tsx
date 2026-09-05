"use client";

import { Play, RefreshCw, AlertTriangle, Sparkles } from "lucide-react";

interface HeaderProps {
  onRunAnalysis?: () => void;
  onSimulateFailure?: () => void;
  onResetDemo?: () => void;
  isAnalyzing?: boolean;
}

export function Header({
  onRunAnalysis,
  onSimulateFailure,
  onResetDemo,
  isAnalyzing = false,
}: HeaderProps) {
  return (
    <header className="h-16 border-b border-[#1e1e22] bg-[#09090b]/90 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-20 mb-8">
      {/* Subtle bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />

      {/* Title & Subtitle */}
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-sm font-bold text-zinc-100 tracking-tight">
            UrbanKicks Dashboard
          </h2>
          <p className="text-[10px] text-zinc-500 leading-none mt-0.5">
            Autonomous Revenue Intelligence
          </p>
        </div>
        <span className="text-zinc-800">|</span>
        {/* AI Active Indicator */}
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium bg-emerald-500/8 border border-emerald-500/20 rounded-full px-2.5 py-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span>AI Agent Active</span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onRunAnalysis}
          disabled={isAnalyzing}
          className="btn-shimmer relative px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAnalyzing ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Sparkles className="w-3.5 h-3.5" />
          )}
          <span>{isAnalyzing ? "Analyzing..." : "Run Growth Scan"}</span>
        </button>

        {onSimulateFailure && (
          <button
            onClick={onSimulateFailure}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-red-300 border border-zinc-800 hover:border-red-900/50 text-xs transition-all duration-200 flex items-center gap-1.5"
            title="Test failure simulation & idempotency"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>Simulate Failure</span>
          </button>
        )}
      </div>
    </header>
  );
}
