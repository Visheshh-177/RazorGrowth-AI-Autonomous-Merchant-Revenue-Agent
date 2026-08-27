"use client";

import { Play, RefreshCw, AlertTriangle } from "lucide-react";

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
    <header className="h-16 border-b border-[#27272A] bg-[#09090B]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 mb-8">
      {/* Title & Subtitle */}
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-semibold text-zinc-100">UrbanKicks Dashboard</h2>
        <span className="text-zinc-700">•</span>
        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-green"></span>
          <span>AI Agent Active</span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onRunAnalysis}
          disabled={isAnalyzing}
          className="px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-black font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm disabled:opacity-50"
        >
          {isAnalyzing ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-black" />
          )}
          <span>{isAnalyzing ? "Analyzing..." : "Run Growth Scan"}</span>
        </button>

        {onSimulateFailure && (
          <button
            onClick={onSimulateFailure}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 text-xs transition-colors flex items-center gap-1.5"
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
