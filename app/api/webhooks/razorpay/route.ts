import { NextResponse } from "next/server";
import crypto from "crypto";
import { razorpayService } from "@/lib/services/razorpayService";
import { recordAuditEvent } from "@/lib/services/auditService";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";

    // Signature verification if secret is provided
    if (secret && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(bodyText)
        .digest("hex");

      if (signature !== expectedSignature) {
        await recordAuditEvent({
          actor: "Razorpay System",
          action: "WEBHOOK_SIGNATURE_FAILED",
          reason: "Received webhook with invalid HMAC signature",
          status: "BLOCKED",
          riskLevel: "HIGH",
        });
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
      }
    }

    const payload = JSON.parse(bodyText);
    const event = payload.event;

    if (event === "payment.captured" || event === "payment_link.paid") {
      const paymentEntity = payload.payload.payment.entity;
      const paymentLinkId = paymentEntity.payment_link_id || payload.payload.payment_link?.entity?.id;
      const amount = paymentEntity.amount / 100;

      if (paymentLinkId) {
        await razorpayService.simulatePaymentCompletion(paymentLinkId, amount);
      }
    }

    await recordAuditEvent({
      actor: "Razorpay System",
      action: `WEBHOOK_RECEIVED_${event?.toUpperCase()}`,
      reason: `Processed Razorpay webhook event: ${event}`,
      inputJson: payload,
      status: "SUCCESS",
      riskLevel: "LOW",
    });

    return NextResponse.json({ status: "ok" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Webhook processing failed" }, { status: 500 });
  }
}
