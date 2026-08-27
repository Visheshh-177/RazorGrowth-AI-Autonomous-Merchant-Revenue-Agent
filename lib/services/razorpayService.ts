import { prisma } from "@/lib/prisma";
import { recordAuditEvent } from "./auditService";

export interface CreatePaymentLinkParams {
  amount: number; // in INR
  currency?: string;
  description: string;
  customer?: {
    name: string;
    email: string;
    contact?: string;
  };
  offerId?: string;
  notes?: Record<string, string>;
  idempotencyKey?: string;
}

export interface RazorpayPaymentLinkResponse {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  status: "created" | "issued" | "paid" | "partially_paid" | "cancelled" | "expired";
  short_url: string;
  description: string;
  mode: "REAL_TEST" | "MOCK";
  created_at: number;
}

export interface CreateOrderParams {
  amount: number;
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
  offerId?: string;
}

export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  receipt: string;
  status: "created" | "attempted" | "paid";
  mode: "REAL_TEST" | "MOCK";
  created_at: number;
}

export class RazorpayService {
  private keyId: string;
  private keySecret: string;
  private isMockMode: boolean;

  constructor() {
    this.keyId = process.env.RAZORPAY_KEY_ID || "";
    this.keySecret = process.env.RAZORPAY_KEY_SECRET || "";
    // If keys are missing or MOCK_MODE is true, fallback to mock simulation
    this.isMockMode =
      process.env.RAZORPAY_MOCK_MODE === "true" || !this.keyId || !this.keySecret;
  }

  public getIsMockMode(): boolean {
    return this.isMockMode;
  }

  /**
   * Create Razorpay Payment Link (Official API: POST /v1/payment_links)
   */
  async createPaymentLink(params: CreatePaymentLinkParams): Promise<RazorpayPaymentLinkResponse> {
    const amountInPaise = Math.round(params.amount * 100);

    if (this.isMockMode) {
      const mockId = `plink_mock_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const mockUrl = `https://rzp.io/i/mock_${mockId.slice(-6)}`;

      // Save order & payment to DB
      const order = await prisma.order.create({
        data: {
          merchantId: "merchant_urbankicks_01",
          amount: params.amount,
          status: "created",
          paymentLinkId: mockId,
          razorpayOrderId: `order_mock_${mockId.slice(-6)}`,
        },
      });

      await prisma.payment.create({
        data: {
          orderId: order.id,
          paymentLinkId: mockId,
          amount: params.amount,
          status: "issued",
          mode: "MOCK",
        },
      });

      await recordAuditEvent({
        actor: "Razorpay System",
        action: "CREATE_PAYMENT_LINK_MOCK",
        reason: "Created mock Razorpay Payment Link",
        inputJson: params,
        outputJson: { id: mockId, url: mockUrl },
        status: "SUCCESS",
        riskLevel: "LOW",
        approvalStatus: "AUTOMATIC",
        apiReference: mockId,
      });

      return {
        id: mockId,
        entity: "payment_link",
        amount: params.amount,
        currency: params.currency || "INR",
        status: "issued",
        short_url: mockUrl,
        description: params.description,
        mode: "MOCK",
        created_at: Math.floor(Date.now() / 1000),
      };
    }

    // Real Razorpay Test Mode API call
    try {
      const auth = Buffer.from(`${this.keyId}:${this.keySecret}`).toString("base64");
      const payload: any = {
        amount: amountInPaise,
        currency: params.currency || "INR",
        accept_partial: false,
        description: params.description,
        customer: params.customer || {
          name: "UrbanKicks Customer",
          email: "customer@urbankicks.in",
        },
        notify: { sms: false, email: true },
        reminder_enable: true,
        notes: params.notes || { source: "RazorGrowth_AI" },
      };

      const offerId = params.offerId || process.env.RAZORPAY_OFFER_ID;
      if (offerId) {
        payload.offer_id = offerId;
      }

      const res = await fetch("https://api.razorpay.com/v1/payment_links", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Razorpay API Error (${res.status}): ${errorText}`);
      }

      const data = await res.json();

      await recordAuditEvent({
        actor: "Razorpay System",
        action: "CREATE_PAYMENT_LINK_REAL",
        reason: "Created real Razorpay Test Mode Payment Link",
        inputJson: params,
        outputJson: data,
        status: "SUCCESS",
        riskLevel: "LOW",
        approvalStatus: "MANUALLY_APPROVED",
        apiReference: data.id,
      });

      return {
        id: data.id,
        entity: "payment_link",
        amount: data.amount / 100,
        currency: data.currency,
        status: data.status,
        short_url: data.short_url,
        description: data.description,
        mode: "REAL_TEST",
        created_at: data.created_at,
      };
    } catch (err: any) {
      await recordAuditEvent({
        actor: "Razorpay System",
        action: "CREATE_PAYMENT_LINK_FAILED",
        reason: `Razorpay API failure: ${err.message}`,
        inputJson: params,
        status: "FAILED",
        riskLevel: "HIGH",
      });
      throw err;
    }
  }

  /**
   * Create Razorpay Order (Official API: POST /v1/orders)
   */
  async createOrder(params: CreateOrderParams): Promise<RazorpayOrderResponse> {
    const amountInPaise = Math.round(params.amount * 100);

    if (this.isMockMode) {
      const mockId = `order_mock_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

      await prisma.order.create({
        data: {
          merchantId: "merchant_urbankicks_01",
          amount: params.amount,
          status: "created",
          razorpayOrderId: mockId,
        },
      });

      return {
        id: mockId,
        entity: "order",
        amount: params.amount,
        currency: params.currency || "INR",
        receipt: params.receipt || `rcpt_${Date.now()}`,
        status: "created",
        mode: "MOCK",
        created_at: Math.floor(Date.now() / 1000),
      };
    }

    try {
      const auth = Buffer.from(`${this.keyId}:${this.keySecret}`).toString("base64");
      const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: params.currency || "INR",
          receipt: params.receipt || `rcpt_${Date.now()}`,
          notes: params.notes || { source: "RazorGrowth_AI" },
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Razorpay Order API Error: ${errText}`);
      }

      const data = await res.json();
      return {
        id: data.id,
        entity: "order",
        amount: data.amount / 100,
        currency: data.currency,
        receipt: data.receipt,
        status: data.status,
        mode: "REAL_TEST",
        created_at: data.created_at,
      };
    } catch (err: any) {
      console.error("Order creation error:", err);
      throw err;
    }
  }

  /**
   * Simulate a Payment Completion Webhook / Event
   */
  async simulatePaymentCompletion(paymentLinkIdOrOrderId: string, amount: number) {
    const mockPaymentId = `pay_mock_${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

    // Update DB Order / Payment status
    const payment = await prisma.payment.findFirst({
      where: { paymentLinkId: paymentLinkIdOrOrderId },
    });

    if (payment) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: "paid",
          razorpayPaymentId: mockPaymentId,
          method: "upi",
        },
      });

      if (payment.orderId) {
        await prisma.order.update({
          where: { id: payment.orderId },
          data: { status: "paid" },
        });
      }
    }

    // Update active campaign conversions if any
    const campaign = await prisma.campaign.findFirst({
      where: { status: "Active" },
    });

    if (campaign) {
      await prisma.campaign.update({
        where: { id: campaign.id },
        data: {
          conversions: campaign.conversions + 1,
          currentRedemptions: campaign.currentRedemptions + 1,
          revenueGenerated: campaign.revenueGenerated + amount,
        },
      });
    }

    await recordAuditEvent({
      actor: "Razorpay System",
      action: "PAYMENT_RECEIVED",
      reason: `Payment ${mockPaymentId} completed successfully for ₹${amount}`,
      inputJson: { paymentLinkIdOrOrderId, amount },
      outputJson: { razorpayPaymentId: mockPaymentId, status: "paid" },
      status: "SUCCESS",
      riskLevel: "LOW",
      apiReference: mockPaymentId,
    });

    return {
      status: "paid",
      razorpayPaymentId: mockPaymentId,
      amount,
    };
  }
}

export const razorpayService = new RazorpayService();
