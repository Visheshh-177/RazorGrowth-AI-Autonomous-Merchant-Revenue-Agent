"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  Zap,
  TrendingUp,
  Package,
  Users,
  CreditCard,
  ShoppingBag,
  ShieldCheck,
  Settings,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { clsx } from "clsx";

const navGroups = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "AI Growth Agent", href: "/agent", icon: Bot },
      { name: "Opportunities", href: "/opportunities", icon: Zap, count: 3 },
      { name: "Campaigns", href: "/campaigns", icon: TrendingUp },
    ],
  },
  {
    label: "Merchant Data",
    items: [
      { name: "Products", href: "/products", icon: Package },
      { name: "Customers", href: "/customers", icon: Users },
      { name: "Payments", href: "/payments", icon: CreditCard },
      { name: "AI Buyer", href: "/ai-buyer", icon: ShoppingBag },
    ],
  },
  {
    label: "Governance",
    items: [
      { name: "Audit Trail", href: "/audit", icon: ShieldCheck },
      { name: "Settings", href: "/settings", icon: Settings },
      { name: "Why RazorGrowth?", href: "/why-razorgrowth", icon: HelpCircle },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-[#0a0a0d] border-r border-[#1e1e22] flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#1e1e22] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-500/50 transition-shadow duration-300">
            <Sparkles className="w-4 h-4 text-white" />
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-300" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-zinc-100 tracking-tight flex items-center gap-1.5">
              RazorGrowth{" "}
              <span className="text-[10px] bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-bold font-mono">
                AI
              </span>
            </h1>
            <p className="text-[11px] text-zinc-500">UrbanKicks Store</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2.5 py-4 space-y-5 overflow-y-auto">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-0.5">
            <p className="px-3 mb-2 text-[10px] font-semibold text-zinc-600 uppercase tracking-widest">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "relative flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 group",
                      isActive
                        ? "bg-gradient-to-r from-blue-600/15 to-indigo-600/10 text-zinc-100 nav-active-bar"
                        : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900/50"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={clsx(
                          "w-4 h-4 transition-colors duration-200",
                          isActive
                            ? "text-blue-400"
                            : "text-zinc-600 group-hover:text-zinc-400"
                        )}
                      />
                      <span>{item.name}</span>
                    </div>
                    {item.count && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#1e1e22] text-[11px] text-zinc-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span>Razorpay Test Mode</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-700">v1.0</span>
        </div>
      </div>
    </aside>
  );
}
