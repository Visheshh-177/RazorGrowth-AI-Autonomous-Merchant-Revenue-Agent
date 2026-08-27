import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    const formatted = products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      currency: "INR",
      category: p.category,
      stock: p.stock,
      salesCount: p.salesCount,
      conversionRate: `${p.conversionRate}%`,
      description: p.description,
      attributes: p.attributesJson ? JSON.parse(p.attributesJson) : {},
    }));

    return NextResponse.json({
      store: "UrbanKicks Official",
      count: formatted.length,
      products: formatted,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch catalog" }, { status: 500 });
  }
}
