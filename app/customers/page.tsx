"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { Users, Filter } from "lucide-react";

const customers = [
  {
    id: "cust_001",
    name: "Rahul Sharma",
    email: "rahul.sharma@example.com",
    segment: "Cross-sell Eligible",
    totalSpent: 5998,
    orders: 2,
    lastPurchase: "3 days ago",
    eligibleOffer: "Running Shoes + Sports Socks Bundle",
  },
  {
    id: "cust_002",
    name: "Priya Patel",
    email: "priya.p@example.com",
    segment: "Returning",
    totalSpent: 8497,
    orders: 3,
    lastPurchase: "Yesterday",
    eligibleOffer: "Cross-sell bundle",
  },
  {
    id: "cust_003",
    name: "Aman Verma",
    email: "aman.v@example.com",
    segment: "High Value",
    totalSpent: 14295,
    orders: 5,
    lastPurchase: "5 days ago",
    eligibleOffer: "Free Shipping tier",
  },
  {
    id: "cust_004",
    name: "Sneha Reddy",
    email: "sneha.r@example.com",
    segment: "Churn Risk",
    totalSpent: 3998,
    orders: 2,
    lastPurchase: "28 days ago",
    eligibleOffer: "Winback discount",
  },
  {
    id: "cust_005",
    name: "Vikram Malhotra",
    email: "vikram.m@example.com",
    segment: "New Customers",
    totalSpent: 2999,
    orders: 1,
    lastPurchase: "2 days ago",
    eligibleOffer: "Socks add-on",
  },
];

export default function CustomersPage() {
  const [filterSegment, setFilterSegment] = useState<string>("All");

  const filtered =
    filterSegment === "All"
      ? customers
      : customers.filter((c) => c.segment === filterSegment);

  return (
    <div className="-m-8 min-h-screen bg-[#09090B] flex flex-col">
      <Header />

      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
              Customer Intelligence
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                5 Segments
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Fictional customer cohorts analyzed by AI Agent for target audience selection.
            </p>
          </div>

          {/* Segment Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {["All", "Cross-sell Eligible", "Returning", "High Value", "Churn Risk", "New Customers"].map(
              (seg) => (
                <button
                  key={seg}
                  onClick={() => setFilterSegment(seg)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap border ${
                    filterSegment === seg
                      ? "bg-amber-500 text-black font-bold border-amber-500"
                      : "bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200"
                  }`}
                >
                  {seg}
                </button>
              )
            )}
          </div>
        </div>

        {/* Customer Table */}
        <div className="bg-[#121215] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/90 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Segment</th>
                  <th className="p-4">Total Spent</th>
                  <th className="p-4">Orders</th>
                  <th className="p-4">Last Purchase</th>
                  <th className="p-4">AI Target Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 text-zinc-200">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="p-4">
                      <p className="font-semibold text-zinc-100">{c.name}</p>
                      <p className="text-[11px] text-zinc-500 font-mono">{c.email}</p>
                    </td>
                    <td className="p-4">
                      <span className="text-[11px] font-semibold px-2 py-1 rounded bg-zinc-800 text-amber-400 border border-zinc-700">
                        {c.segment}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-zinc-100">₹{c.totalSpent.toLocaleString("en-IN")}</td>
                    <td className="p-4 font-semibold">{c.orders} orders</td>
                    <td className="p-4 text-zinc-400">{c.lastPurchase}</td>
                    <td className="p-4">
                      <span className="text-[11px] text-emerald-400 font-medium">
                        {c.eligibleOffer}
                      </span>
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
