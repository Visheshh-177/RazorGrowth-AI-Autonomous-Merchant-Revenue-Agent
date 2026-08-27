export interface PolicyConfig {
  maxDiscountPercent: number;
  maxCampaignBudget: number;
  maxRedemptions: number;
  requireApprovalForMoneyActions: boolean;
  allowLiveMode: boolean;
}

export const DEFAULT_POLICY_CONFIG: PolicyConfig = {
  maxDiscountPercent: 15,
  maxCampaignBudget: 5000,
  maxRedemptions: 100,
  requireApprovalForMoneyActions: true,
  allowLiveMode: false,
};

export interface PolicyValidationResult {
  allowed: boolean;
  reason?: string;
  violations?: string[];
  parametersValidated: any;
}

export function validateActionPolicy(
  actionType: string,
  parameters: Record<string, any>,
  config: PolicyConfig = DEFAULT_POLICY_CONFIG
): PolicyValidationResult {
  const violations: string[] = [];

  // Check 1: Live Mode restriction
  if (parameters.mode === "LIVE" && !config.allowLiveMode) {
    violations.push("LIVE payments are disabled by merchant safety policy. Only Razorpay Test / Mock Mode allowed.");
  }

  // Check 2: Discount Limits
  if (parameters.discount_percent !== undefined) {
    const discount = Number(parameters.discount_percent);
    if (discount > config.maxDiscountPercent) {
      violations.push(`Requested discount ${discount}% exceeds merchant limit of ${config.maxDiscountPercent}%.`);
    }
  }

  // Check 3: Budget Limits
  if (parameters.max_budget !== undefined || parameters.budget !== undefined) {
    const budget = Number(parameters.max_budget || parameters.budget);
    if (budget > config.maxCampaignBudget) {
      violations.push(`Requested campaign budget ₹${budget.toLocaleString("en-IN")} exceeds maximum budget limit of ₹${config.maxCampaignBudget.toLocaleString("en-IN")}.`);
    }
  }

  // Check 4: Redemption limits
  if (parameters.max_redemptions !== undefined) {
    const redemptions = Number(parameters.max_redemptions);
    if (redemptions > config.maxRedemptions) {
      violations.push(`Requested maximum redemptions ${redemptions} exceeds safety limit of ${config.maxRedemptions}.`);
    }
  }

  // Check 5: Financial Execution gating
  const MONEY_ACTIONS = ["create_payment_link", "create_order", "CREATE_PAYMENT_FLOW", "CREATE_ORDER"];
  if (MONEY_ACTIONS.includes(actionType) && config.requireApprovalForMoneyActions && !parameters.merchantApproved) {
    violations.push("Money-affecting actions require explicit merchant approval before API execution.");
  }

  if (violations.length > 0) {
    return {
      allowed: false,
      reason: violations[0],
      violations,
      parametersValidated: parameters,
    };
  }

  return {
    allowed: true,
    parametersValidated: parameters,
  };
}
