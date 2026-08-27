import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateActionPolicy } from "@/lib/services/policyEngine";
import { razorpayService } from "@/lib/services/razorpayService";
import { recordAuditEvent } from "@/lib/services/auditService";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      opportunityId,
      actionType = "CREATE_PAYMENT_FLOW",
      parameters = {},
      idempotencyKey = `act_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      simulateFailure = false,
    } = body;

    // 1. Check Idempotency Protection
    const existingAction = await prisma.agentAction.findUnique({
      where: { idempotencyKey },
    });

    if (existingAction) {
      if (existingAction.status === "EXECUTED" && existingAction.razorpayRef) {
        return NextResponse.json({
          success: true,
          isDuplicate: true,
          message: "Action previously executed safely (Idempotency protected).",
          razorpayRef: existingAction.razorpayRef,
        });
      }
    }

    // 2. Validate Policy Engine Rules
    const policyResult = validateActionPolicy(actionType, {
      ...parameters,
      merchantApproved: true,
    });

    if (!policyResult.allowed) {
      await recordAuditEvent({
        actor: "Policy Engine",
        action: "POLICY_VIOLATION_BLOCKED",
        reason: policyResult.reason || "Action violates merchant risk limits.",
        inputJson: parameters,
        outputJson: policyResult.violations,
        status: "BLOCKED",
        riskLevel: "HIGH",
        approvalStatus: "MANUALLY_APPROVED",
      });

      return NextResponse.json(
        {
          success: false,
          error: "Action blocked by Merchant Safety Policy.",
          details: policyResult.violations,
          policyLimit: {
            maxDiscountPercent: 15,
            maxCampaignBudget: 5000,
            maxRedemptions: 100,
          },
        },
        { status: 422 }
      );
    }

    // Record Action in DB as PENDING
    const agentAction = await prisma.agentAction.create({
      data: {
        opportunityId: opportunityId || null,
        merchantId: "merchant_urbankicks_01",
        actionType,
        parametersJson: JSON.stringify(parameters),
        riskLevel: "LOW",
        status: "APPROVED",
        idempotencyKey,
      },
    });

    // Log Merchant Approval in Audit Trail
    await recordAuditEvent({
      actor: "Merchant",
      action: "APPROVE_ACTION",
      reason: `Merchant manually approved action: ${parameters.title || actionType}`,
      inputJson: parameters,
      status: "SUCCESS",
      riskLevel: "LOW",
      approvalStatus: "MANUALLY_APPROVED",
    });

    // 3. Handle Failure Simulation Mode
    if (simulateFailure) {
      await prisma.agentAction.update({
        where: { id: agentAction.id },
        data: {
          status: "FAILED",
          errorMessage: "Simulated Razorpay API Connection Timeout (504)",
        },
      });

      await recordAuditEvent({
        actor: "Razorpay System",
        action: "API_FAILURE_SIMULATED",
        reason: "Simulated API gateway error for testing recovery flow",
        status: "FAILED",
        riskLevel: "HIGH",
        approvalStatus: "MANUALLY_APPROVED",
      });

      return NextResponse.json(
        {
          success: false,
          simulated: true,
          error: "Razorpay API unavailable (Simulated Failure).",
          message: "No money was charged. Merchant action state preserved safely. You can retry.",
          retryable: true,
          idempotencyKey,
        },
        { status: 502 }
      );
    }

    // 4. Execute via Razorpay Service
    const paymentLink = await razorpayService.createPaymentLink({
      amount: parameters.price || 3299,
      description: parameters.productName || "Running Pro Shoes + Sports Socks Bundle",
      customer: {
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        contact: "+919876543210",
      },
      idempotencyKey,
    });

    // Update Action status
    await prisma.agentAction.update({
      where: { id: agentAction.id },
      data: {
        status: "EXECUTED",
        razorpayRef: paymentLink.id,
      },
    });

    // Update Opportunity status if attached
    if (opportunityId) {
      await prisma.opportunity.update({
        where: { id: opportunityId },
        data: { status: "EXECUTED" },
      });
    }

    return NextResponse.json({
      success: true,
      actionId: agentAction.id,
      idempotencyKey,
      paymentLink,
    });
  } catch (err: any) {
    console.error("Error in action approval route:", err);
    return NextResponse.json({ error: err.message || "Failed to execute action" }, { status: 500 });
  }
}
