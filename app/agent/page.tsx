"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/header/Header";
import { ApprovalGateModal, ApprovalActionPayload } from "@/components/approval/ApprovalGateModal";
import { Bot, Send, User, Sparkles, ShieldCheck, RefreshCw, Zap } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "agent";
  text: string;
  metrics?: {
    impact: string;
    confidence: string;
    risk: string;
    maxBudget: string;
  };
  action?: any;
  timestamp: string;
}

const PRESET_PROMPTS = [
  "Why did my revenue drop this week?",
  "Find cross-sell opportunities for shoes",
  "Analyze high-margin product performance",
  "Which customers are at risk of churning?",
];

export default function AgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg_welcome",
      sender: "agent",
      text: "Good morning, Merchant. I am **RazorGrowth AI**, monitoring UrbanKicks sales metrics & cross-sell loops.\n\nHow can I help optimize your store revenue today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeApprovalAction, setActiveApprovalAction] = useState<ApprovalActionPayload | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/agent/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();

      const agentMsg: Message = {
        id: `agent_${Date.now()}`,
        sender: "agent",
        text: data.text || "Scan completed.",
        metrics: data.metrics,
        action: data.action,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: `agent_err_${Date.now()}`,
          sender: "agent",
          text: "Encountered an issue processing query. Please retry.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="-m-8 min-h-screen bg-[#09090B] flex flex-col">
      {/* Background orb */}
      <div className="fixed bottom-0 left-60 w-[400px] h-[400px] pointer-events-none overflow-hidden opacity-20">
        <div className="absolute bottom-[-150px] left-[-100px] w-[350px] h-[350px] rounded-full bg-gradient-radial from-indigo-600/30 to-transparent blur-3xl" />
      </div>

      <Header />

      <div className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col gap-4">
        {/* Agent Info Subheader */}
        <div className="animate-fade-in-up bg-gradient-to-r from-blue-950/30 via-[#121215] to-[#121215] border border-blue-900/30 p-3.5 rounded-xl flex items-center justify-between text-xs relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="font-bold text-zinc-100">RazorGrowth Revenue Agent</p>
              <p className="text-zinc-500 text-[10px] mt-0.5">12 Bounded Tools Active</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] bg-emerald-500/8 border border-emerald-500/20 rounded-full px-2.5 py-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Policy Engine Enforced</span>
          </div>
        </div>

        {/* Chat Messages Window */}
        <div className="flex-1 bg-[#121215] border border-[#27272A] rounded-2xl p-5 space-y-5 overflow-y-auto max-h-[60vh]">
          {messages.map((msg, idx) => (
            <div
              key={msg.id}
              className={`animate-fade-in-up flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "agent" && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/25 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div className={`space-y-2 max-w-xl ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-800/30 text-zinc-100 font-medium rounded-tr-sm"
                      : "bg-zinc-900/80 border border-zinc-800/80 text-zinc-200 rounded-tl-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Metrics Pill Grid */}
                {msg.metrics && (
                  <div className="grid grid-cols-4 gap-2 bg-zinc-900/60 p-3 rounded-xl border border-zinc-800 text-[11px]">
                    {[
                      { label: "Est. Impact", value: msg.metrics.impact, color: "text-emerald-400" },
                      { label: "Confidence", value: msg.metrics.confidence, color: "text-amber-400" },
                      { label: "Risk", value: msg.metrics.risk, color: "text-zinc-300" },
                      { label: "Max Budget", value: msg.metrics.maxBudget, color: "text-zinc-300" },
                    ].map((m) => (
                      <div key={m.label}>
                        <p className="text-zinc-600">{m.label}</p>
                        <p className={`font-bold mt-0.5 ${m.color}`}>{m.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Card trigger */}
                {msg.action && (
                  <div className="bg-zinc-900/80 border border-zinc-800 p-3.5 rounded-xl space-y-2.5 text-xs">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-black text-amber-400 uppercase tracking-wider">Proposed Action</span>
                      <span className="text-emerald-400 font-bold">{msg.action.expectedRevenue}</span>
                    </div>
                    <p className="font-bold text-zinc-100">{msg.action.productName}</p>
                    <p className="text-zinc-500 leading-relaxed text-[11px]">{msg.action.why}</p>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() =>
                          setActiveApprovalAction({
                            opportunityId: msg.action.opportunityId,
                            actionType: msg.action.type,
                            title: msg.action.title,
                            productName: msg.action.productName,
                            price: msg.action.price,
                            standalonePrice: msg.action.standalonePrice,
                            expectedRevenue: msg.action.expectedRevenue,
                            discountPercent: msg.action.discountPercent,
                            maxRedemptions: msg.action.maxRedemptions,
                            maxBudget: msg.action.maxBudget,
                            why: msg.action.why,
                            risk: msg.action.risk,
                          })
                        }
                        className="btn-shimmer px-4 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs transition-all duration-200 shadow-md shadow-blue-600/20"
                      >
                        Prepare Action
                      </button>
                      <button className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors border border-zinc-700">
                        Ignore
                      </button>
                    </div>
                  </div>
                )}

                <span className="text-[10px] text-zinc-700 block px-1">{msg.timestamp}</span>
              </div>

              {msg.sender === "user" && (
                <div className="w-8 h-8 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2.5 text-xs text-blue-400 bg-blue-500/5 border border-blue-900/30 rounded-xl px-4 py-3 w-fit">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing sales metrics...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Preset Prompt Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Zap className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
          {PRESET_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700 text-xs transition-all duration-200 whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AI agent about sales, cross-sells, or campaign preparation..."
            className="w-full bg-[#121215] border border-[#27272A] focus:border-blue-800/60 focus:ring-1 focus:ring-blue-900/30 rounded-2xl px-5 py-3.5 text-xs text-zinc-100 placeholder-zinc-600 outline-none pr-14 transition-all duration-200"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold disabled:opacity-30 transition-all duration-200 shadow-md shadow-blue-600/20"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
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
