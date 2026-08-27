"use client";

import { useState } from "react";
import { Header } from "@/components/header/Header";
import { Package, Code, Sparkles, ExternalLink, Eye } from "lucide-react";

const products = [
  {
    id: "prod_running_pro",
    name: "Running Pro Shoes",
    price: 2999,
    category: "Running",
    sales: 342,
    conversion: "4.8%",
    margin: "48%",
    crossSell: "High (15.2%)",
    aiOpportunity: "Cross-sell bundle candidate",
    badgeColor: "amber",
  },
  {
    id: "prod_urban_street",
    name: "Urban Street Sneakers",
    price: 1999,
    category: "Lifestyle",
    sales: 412,
    conversion: "5.2%",
    margin: "45%",
    crossSell: "Medium",
    aiOpportunity: "Upsell candidate",
    badgeColor: "orange",
  },
  {
    id: "prod_training_pro",
    name: "Training Shoes",
    price: 2499,
    category: "Gym",
    sales: 218,
    conversion: "4.1%",
    margin: "48%",
    crossSell: "Low",
    aiOpportunity: "Bundle with bottle",
    badgeColor: "zinc",
  },
  {
    id: "prod_sports_socks",
    name: "Sports Socks",
    price: 399,
    category: "Accessories",
    sales: 184,
    conversion: "2.1%",
    margin: "70%",
    crossSell: "High (Attachment Gap)",
    aiOpportunity: "Cross-sell add-on target",
    badgeColor: "emerald",
  },
  {
    id: "prod_cleaning_kit",
    name: "Shoe Cleaning Kit",
    price: 299,
    category: "Care",
    sales: 94,
    conversion: "1.8%",
    margin: "62%",
    crossSell: "Low (5% Attachment)",
    aiOpportunity: "High-margin popover target",
    badgeColor: "blue",
  },
  {
    id: "prod_water_bottle",
    name: "Sports Water Bottle",
    price: 599,
    category: "Accessories",
    sales: 134,
    conversion: "3.4%",
    margin: "60%",
    crossSell: "Medium",
    aiOpportunity: "Gym bundle target",
    badgeColor: "zinc",
  },
];

export default function ProductsPage() {
  const [showApiModal, setShowApiModal] = useState(false);
  const [jsonContent, setJsonContent] = useState<any>(null);

  const handleInspectApi = async () => {
    setShowApiModal(true);
    try {
      const res = await fetch("/api/catalog");
      const data = await res.json();
      setJsonContent(data);
    } catch (e) {
      console.error(e);
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
              Product Catalog
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                6 Seeded Items
              </span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              UrbanKicks catalog data consumed by both AI Growth Agent and AI Buyer APIs.
            </p>
          </div>

          <button
            onClick={handleInspectApi}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Code className="w-4 h-4" />
            <span>Inspect Machine API (/api/catalog)</span>
          </button>
        </div>

        {/* Product Table */}
        <div className="bg-[#121215] border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-900/90 border-b border-zinc-800 text-zinc-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Sales</th>
                  <th className="p-4">Conversion</th>
                  <th className="p-4">Margin</th>
                  <th className="p-4">Cross-Sell</th>
                  <th className="p-4">AI Opportunity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 text-zinc-200">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-zinc-900/50 transition-colors">
                    <td className="p-4 font-semibold text-zinc-100 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center text-amber-400">
                        <Package className="w-3.5 h-3.5" />
                      </div>
                      <span>{p.name}</span>
                    </td>
                    <td className="p-4 font-mono font-bold text-amber-400">₹{p.price.toLocaleString("en-IN")}</td>
                    <td className="p-4 text-zinc-400">{p.category}</td>
                    <td className="p-4 font-semibold">{p.sales} orders</td>
                    <td className="p-4 font-semibold text-emerald-400">{p.conversion}</td>
                    <td className="p-4 font-bold text-zinc-300">{p.margin}</td>
                    <td className="p-4 text-zinc-400">{p.crossSell}</td>
                    <td className="p-4">
                      <span className="text-[11px] font-semibold px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {p.aiOpportunity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* API Inspector Modal */}
      {showApiModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#121215] border border-amber-500/30 rounded-2xl w-full max-w-2xl shadow-2xl p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
              <h3 className="text-base font-bold text-zinc-100 flex items-center gap-2">
                <Code className="w-4 h-4 text-amber-400" />
                Agent-Readable Catalog API Response (`GET /api/catalog`)
              </h3>
              <button
                onClick={() => setShowApiModal(false)}
                className="text-xs text-zinc-400 hover:text-zinc-200"
              >
                Close
              </button>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-amber-300 max-h-96 overflow-y-auto">
              <pre>{JSON.stringify(jsonContent, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
