import { NextResponse } from "next/server";
import { razorpayService } from "@/lib/services/razorpayService";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { paymentLinkId = "plink_mock_demo", amount = 3299 } = body;

    const result = await razorpayService.simulatePaymentCompletion(paymentLinkId, amount);
    return NextResponse.json({
      success: true,
      message: "Payment completion simulated successfully!",
      result,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to simulate payment" }, { status: 500 });
  }
}
