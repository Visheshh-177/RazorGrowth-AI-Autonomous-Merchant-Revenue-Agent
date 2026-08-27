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
    <aside className="w-60 bg-[#09090B] border-r border-[#27272A] flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-[#27272A] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-md shadow-blue-600/20">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-sm text-zinc-100 tracking-tight flex items-center gap-1.5">
              RazorGrowth <span className="text-[10px] text-blue-400 font-mono">AI</span>
            </h1>
            <p className="text-[11px] text-zinc-500">UrbanKicks Store</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {navGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            <p className="px-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
              {group.label}
            </p>
            <div className="space-y-0.5 pt-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group",
                      isActive
                        ? "bg-zinc-800 text-zinc-100 shadow-sm"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        className={clsx(
                          "w-4 h-4 transition-colors",
                          isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300"
                        )}
                      />
                      <span>{item.name}</span>
                    </div>
                    {item.count && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
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
      <div className="p-3 border-t border-[#27272A] text-[11px] text-zinc-500 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 pulse-green"></span>
          <span>Razorpay Test Mode</span>
        </div>
        <span className="font-mono text-[10px] text-zinc-600">v1.0</span>
      </div>
    </aside>
  );
}
