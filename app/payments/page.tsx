"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { CreditCard, ExternalLink, CheckCircle2, Play, RefreshCw, Clock } from "lucide-react";

interface PaymentItem {
  id: string;
  linkId: string;
  campaign: string;
  amount: number;
  status: "created" | "issued" | "attempted" | "paid" | "failed";
  mode: "MOCK" | "REAL_TEST";
  created: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<PaymentItem[]>([
    {
      id: "pay_101",
      linkId: "plink_mock_8F91X",
      campaign: "Running Shoes + Sports Socks Bundle",
      amount: 3299,
      status: "issued",
      mode: "MOCK",
      created: "Just now",
    },
    {
      id: "pay_102",
      linkId: "plink_mock_72AB",
      campaign: "Running Shoes Cross-Sell",
      amount: 3299,
      status: "paid",
      mode: "MOCK",
      created: "10 mins ago",
    },
    {
      id: "pay_103",
      linkId: "plink_mock_99CD",
      campaign: "High-Margin Care Kit Add-On",
      amount: 199,
      status: "paid",
      mode: "MOCK",
      created: "1 hour ago",
    },
  ]);

  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulatePayment = async (linkId: string) => {
    setIsSimulating(true);
    try {
      const res = await fetch("/api/demo/simulate-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentLinkId: linkId, amount: 3299 }),
      });

      const data = await res.json();
      if (data.success) {
        setPayments((prev) =>
          prev.map((p) => (p.linkId === linkId ? { ...p, status: "paid" } : p))
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="-m-8 min-h-screen bg-[#09090B] flex flex-col">
      <Header />

      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
              Razorpay Payments & Links
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Test Mode Live
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Real-time payment link state machine and webhook tracker.
            </p>
          </div>
        </div>

        {/* State Progression Indicator */}
        <div className="bg-[#121215] border border-zinc-800 p-6 rounded-2xl space-y-3 shadow-lg">
          <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            Payment State Lifecycle Machine
          </h4>
          <div className="flex items-center justify-between max-w-3xl mx-auto text-xs py-2">
            <div className="text-center">
              <span className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 flex items-center justify-center font-bold mx-auto mb-1">
                1
              </span>
              <span className="text-zinc-400 font-medium">Created</span>
            </div>
            <div className="h-0.5 w-16 bg-zinc-800"></div>
            <div className="text-center">
              <span className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold mx-auto mb-1">
                2
              </span>
              <span className="text-amber-400 font-semibold">Issued</span>
            </div>
            <div className="h-0.5 w-16 bg-zinc-800"></div>
            <div className="text-center">
              <span className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold mx-auto mb-1">
                3
              </span>
              <span className="text-blue-400 font-medium">Attempted</span>
            </div>
            <div className="h-0.5 w-16 bg-zinc-800"></div>
            <div className="text-center">
              <span className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold mx-auto mb-1">
                4
              </span>
              <span className="text-emerald-400 font-bold">Paid</span>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-[#121215] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/90 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Payment Link ID</th>
                  <th className="p-4">Campaign</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Environment</th>
                  <th className="p-4">Created</th>
                  <th className="p-4">Demo Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 text-zinc-200">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="p-4 font-mono font-semibold text-amber-400 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-amber-400" />
                      <span>{p.linkId}</span>
                    </td>
                    <td className="p-4 font-medium text-zinc-100">{p.campaign}</td>
                    <td className="p-4 font-mono font-bold text-zinc-100">₹{p.amount.toLocaleString("en-IN")}</td>
                    <td className="p-4">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase border ${
                          p.status === "paid"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : p.status === "issued"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            : "bg-zinc-800 text-zinc-400 border-zinc-700"
                        }`}
                      >
                        ● {p.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                        {p.mode}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-400">{p.created}</td>
                    <td className="p-4">
                      {p.status !== "paid" ? (
                        <button
                          onClick={() => handleSimulatePayment(p.linkId)}
                          disabled={isSimulating}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
                        >
                          <Play className="w-3 h-3 fill-black" />
                          Simulate Payment
                        </button>
                      ) : (
                        <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
