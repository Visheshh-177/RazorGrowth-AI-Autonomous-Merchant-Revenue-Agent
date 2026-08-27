"use client";

import { useState, useRef, useEffect } from "react";
import { Header } from "@/components/header/Header";
import { ApprovalGateModal, ApprovalActionPayload } from "@/components/approval/ApprovalGateModal";
import { Bot, Send, User, Sparkles, ShieldCheck, Zap, RefreshCw } from "lucide-react";

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
      <Header />

      <div className="flex-1 max-w-4xl w-full mx-auto p-6 flex flex-col justify-between space-y-4">
        {/* Agent Info Subheader */}
        <div className="bg-[#121215] border border-[#27272A] p-3.5 rounded-xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <Bot className="w-4 h-4 text-blue-400" />
            <span className="font-semibold text-zinc-100">RazorGrowth Revenue Agent</span>
            <span className="text-zinc-600">•</span>
            <span className="text-zinc-400">12 Bounded Tools Active</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Policy Engine Enforced</span>
          </div>
        </div>

        {/* Chat Messages Window */}
        <div className="flex-1 bg-[#121215] border border-[#27272A] rounded-xl p-5 space-y-5 overflow-y-auto max-h-[62vh]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.sender === "agent" && (
                <div className="w-7 h-7 rounded-lg bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
              )}

              <div className={`space-y-2 max-w-xl ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-zinc-800 text-zinc-100 font-medium rounded-tr-none"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>

                {/* Metrics Pill Grid */}
                {msg.metrics && (
                  <div className="grid grid-cols-4 gap-2 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-[11px]">
                    <div>
                      <p className="text-zinc-500">Est. Impact</p>
                      <p className="font-semibold text-emerald-400">{msg.metrics.impact}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500">Confidence</p>
                      <p className="font-semibold text-amber-400">{msg.metrics.confidence}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500">Risk</p>
                      <p className="font-semibold text-zinc-300">{msg.metrics.risk}</p>
                    </div>
                    <div>
                      <p className="text-zinc-500">Max Budget</p>
                      <p className="font-semibold text-zinc-300">{msg.metrics.maxBudget}</p>
                    </div>
                  </div>
                )}

                {/* Action Card trigger */}
                {msg.action && (
                  <div className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-lg space-y-2.5 text-xs">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="font-semibold text-amber-400 uppercase tracking-wider">
                        Proposed Action
                      </span>
                      <span className="text-emerald-400 font-medium">{msg.action.expectedRevenue}</span>
                    </div>
                    <p className="font-semibold text-zinc-100">{msg.action.productName}</p>
                    <p className="text-zinc-400 leading-normal text-[11px]">{msg.action.why}</p>
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
                        className="px-3.5 py-1.5 rounded-lg bg-zinc-100 hover:bg-white text-black font-semibold text-xs transition-colors shadow-sm"
                      >
                        Prepare Action
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-xs transition-colors">
                        Ignore
                      </button>
                    </div>
                  </div>
                )}

                <span className="text-[10px] text-zinc-600 block px-1">{msg.timestamp}</span>
              </div>

              {msg.sender === "user" && (
                <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-blue-400">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing sales metrics...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Preset Prompt Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => handleSendMessage("Why did my revenue drop this week?")}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs transition-colors whitespace-nowrap"
          >
            Why did my revenue drop this week?
          </button>
          <button
            onClick={() => handleSendMessage("Find cross-sell opportunities for shoes")}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs transition-colors whitespace-nowrap"
          >
            Find cross-sell opportunities for shoes
          </button>
          <button
            onClick={() => handleSendMessage("Analyze high-margin product performance")}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs transition-colors whitespace-nowrap"
          >
            Analyze high-margin product performance
          </button>
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
            className="w-full bg-[#121215] border border-[#27272A] focus:border-zinc-500 rounded-xl px-4 py-3 text-xs text-zinc-100 placeholder-zinc-500 outline-none pr-12 transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 rounded-lg bg-zinc-100 hover:bg-white text-black font-bold disabled:opacity-30 transition-colors"
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
