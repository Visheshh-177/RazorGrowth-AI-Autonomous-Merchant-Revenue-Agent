"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { ShoppingBag, Bot, Sparkles, Send, CheckCircle2, ExternalLink, ArrowRight, Star } from "lucide-react";

interface ProductRecommendation {
  id: string;
  name: string;
  price: number;
  rating: number;
  reason: string;
  category: string;
}

export default function AIBuyerPage() {
  const [query, setQuery] = useState("I need running shoes under ₹3,000 for daily running.");
  const [isSearching, setIsSearching] = useState(false);
  const [recommendations, setRecommendations] = useState<ProductRecommendation[] | null>([
    {
      id: "prod_running_pro",
      name: "Running Pro Shoes",
      price: 2999,
      rating: 4.7,
      reason: "Best for daily running & marathon training with high responsive cushioning.",
      category: "Running",
    },
    {
      id: "prod_training_pro",
      name: "Training Shoes",
      price: 2499,
      rating: 4.5,
      reason: "Good for mixed gym training & sprint sessions.",
      category: "Gym",
    },
    {
      id: "prod_urban_street",
      name: "Urban Street Sneakers",
      price: 1999,
      rating: 4.6,
      reason: "Better suited for casual daily walking & lifestyle wear.",
      category: "Lifestyle",
    },
  ]);

  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [isBuying, setIsBuying] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch("/api/catalog");
      const data = await res.json();
      // Filter catalog machine response
      const matched = data.products
        .filter((p: any) => p.price <= 3000)
        .map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          rating: p.attributes?.rating || 4.5,
          reason: p.description,
          category: p.category,
        }));
      setRecommendations(matched);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSearching(false);
    }
  };

  const handleBuyProduct = async (product: ProductRecommendation) => {
    setIsBuying(true);
    try {
      const res = await fetch("/api/actions/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          actionType: "CREATE_ORDER",
          parameters: {
            title: `AI Buyer Order: ${product.name}`,
            productName: product.name,
            price: product.price,
            discount_percent: 0,
            max_redemptions: 1,
            max_budget: 5000,
          },
        }),
      });

      const data = await res.json();
      setCreatedOrder({ product, link: data.paymentLink });
    } catch (e) {
      console.error(e);
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="-m-8 min-h-screen bg-[#09090B] flex flex-col">
      <Header />

      <div className="p-8 max-w-5xl mx-auto w-full space-y-8">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-zinc-100 flex items-center gap-3">
              AI Buyer Agent
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Agentic Commerce
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Demonstrating consumer AI buyers transacting directly with machine-readable UrbanKicks catalog.
            </p>
          </div>
        </div>

        {/* Consumer AI Search Prompt */}
        <div className="bg-[#121215] border border-zinc-800 p-6 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-100">Autonomous Consumer Shopping Assistant</h3>
              <p className="text-xs text-zinc-400">
                AI Buyer queries <code className="text-amber-400">/api/catalog</code> and negotiates transaction creation.
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex gap-3"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. I need running shoes under ₹3,000 for daily running."
              className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-blue-500/50 rounded-xl px-4 py-3 text-xs text-zinc-100 outline-none"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>Query Catalog</span>
            </button>
          </form>
        </div>

        {/* Catalog Query Flow Diagram */}
        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-xs font-mono flex items-center justify-between text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-blue-400 font-bold">AI Buyer</span>
            <span>→</span>
            <span className="text-amber-400 font-bold">GET /api/catalog</span>
            <span>→</span>
            <span className="text-emerald-400 font-bold">Match Attributes</span>
            <span>→</span>
            <span className="text-zinc-200 font-bold">Razorpay Checkout</span>
          </div>
          <span className="text-[10px] text-zinc-500">Machine-to-Machine Flow</span>
        </div>

        {/* Matched Product Recommendations */}
        {recommendations && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-zinc-100">Matched Product Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {recommendations.map((prod, idx) => (
                <div
                  key={prod.id}
                  className="bg-[#121215] border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between space-y-4 hover:border-blue-500/40 transition-all shadow-lg"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        OPTION #{idx + 1}
                      </span>
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {prod.rating}
                      </span>
                    </div>
                    <h4 className="font-bold text-zinc-100 text-base">{prod.name}</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">{prod.reason}</p>
                    <p className="text-xl font-extrabold text-amber-400 pt-1">
                      ₹{prod.price.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <button
                    onClick={() => handleBuyProduct(prod)}
                    disabled={isBuying}
                    className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 disabled:opacity-50"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Buy {prod.name}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Order Result Card */}
        {createdOrder && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <div>
                <h4 className="text-base font-bold text-emerald-400">Order & Payment Link Created!</h4>
                <p className="text-xs text-zinc-300">
                  AI Buyer generated transaction for {createdOrder.product.name} (₹{createdOrder.product.price})
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-zinc-950 p-3.5 rounded-xl border border-zinc-800 text-xs font-mono">
              <span className="text-amber-400">{createdOrder.link?.short_url}</span>
              <a
                href={createdOrder.link?.short_url}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-1.5 rounded-lg bg-emerald-500 text-black font-bold flex items-center gap-1"
              >
                <span>Launch Checkout</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
