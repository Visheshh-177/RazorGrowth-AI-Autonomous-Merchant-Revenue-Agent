import { prisma } from "@/lib/prisma";

export interface CreateAuditEventParams {
  merchantId?: string;
  actor: "AI Agent" | "Merchant" | "Razorpay System" | "Policy Engine";
  action: string;
  reason: string;
  inputJson?: any;
  outputJson?: any;
  status: "SUCCESS" | "BLOCKED" | "FAILED" | "PENDING";
  riskLevel?: "LOW" | "MEDIUM" | "HIGH";
  approvalStatus?: "AUTOMATIC" | "MANUALLY_APPROVED" | "MANUALLY_REJECTED" | "REQUIRES_APPROVAL";
  apiReference?: string;
}

export async function recordAuditEvent(params: CreateAuditEventParams) {
  try {
    const merchantId = params.merchantId || "merchant_urbankicks_01";
    return await prisma.auditEvent.create({
      data: {
        merchantId,
        actor: params.actor,
        action: params.action,
        reason: params.reason,
        inputJson: params.inputJson ? JSON.stringify(params.inputJson) : null,
        outputJson: params.outputJson ? JSON.stringify(params.outputJson) : null,
        status: params.status,
        riskLevel: params.riskLevel || "LOW",
        approvalStatus: params.approvalStatus || "AUTOMATIC",
        apiReference: params.apiReference || null,
      },
    });
  } catch (err) {
    console.error("Failed to record audit event:", err);
  }
}
