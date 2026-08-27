import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: product.id,
      name: product.name,
      price: product.price,
      currency: "INR",
      category: product.category,
      stock: product.stock,
      description: product.description,
      attributes: product.attributesJson ? JSON.parse(product.attributesJson) : {},
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch product" }, { status: 500 });
  }
}
