import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding UrbanKicks Merchant Database...");

  // Clean existing data
  await prisma.auditEvent.deleteMany({});
  await prisma.agentAction.deleteMany({});
  await prisma.opportunity.deleteMany({});
  await prisma.campaign.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.customer.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.merchant.deleteMany({});

  // 1. Create Merchant
  const merchant = await prisma.merchant.create({
    data: {
      id: "merchant_urbankicks_01",
      name: "UrbanKicks Admin",
      email: "merchant@urbankicks.in",
      storeName: "UrbanKicks",
      currency: "INR",
    },
  });

  // 2. Create Products
  const runningShoes = await prisma.product.create({
    data: {
      id: "prod_running_pro",
      merchantId: merchant.id,
      name: "Running Pro Shoes",
      price: 2999,
      costPrice: 1559,
      marginPercent: 48.0,
      category: "Running",
      stock: 48,
      salesCount: 342,
      conversionRate: 4.8,
      description: "High-performance mesh upper daily running shoe with ergonomic responsive cushioning.",
      attributesJson: JSON.stringify({
        use_case: ["daily running", "marathon training", "road running"],
        gender: "unisex",
        weight: "260g",
        rating: 4.7,
      }),
    },
  });

  const sneakers = await prisma.product.create({
    data: {
      id: "prod_urban_street",
      merchantId: merchant.id,
      name: "Urban Street Sneakers",
      price: 1999,
      costPrice: 1099,
      marginPercent: 45.0,
      category: "Lifestyle",
      stock: 64,
      salesCount: 412,
      conversionRate: 5.2,
      description: "Retro street style sneakers designed for all-day comfort and casual wear.",
      attributesJson: JSON.stringify({
        use_case: ["casual wear", "streetwear", "daily walk"],
        gender: "unisex",
        rating: 4.6,
      }),
    },
  });

  const trainingShoes = await prisma.product.create({
    data: {
      id: "prod_training_pro",
      merchantId: merchant.id,
      name: "Training Shoes",
      price: 2499,
      costPrice: 1299,
      marginPercent: 48.0,
      category: "Gym",
      stock: 35,
      salesCount: 218,
      conversionRate: 4.1,
      description: "Versatile cross-training footwear with reinforced heel support for gym sessions.",
      attributesJson: JSON.stringify({
        use_case: ["cross-fit", "gym training", "weightlifting"],
        gender: "unisex",
        rating: 4.5,
      }),
    },
  });

  const sportsSocks = await prisma.product.create({
    data: {
      id: "prod_sports_socks",
      merchantId: merchant.id,
      name: "Sports Socks",
      price: 399,
      costPrice: 119,
      marginPercent: 70.0,
      category: "Accessories",
      stock: 150,
      salesCount: 184,
      conversionRate: 2.1,
      description: "Anti-blister moisture-wicking athletic socks (Pack of 3).",
      attributesJson: JSON.stringify({
        use_case: ["running socks", "gym accessories"],
        pack_size: 3,
        rating: 4.8,
      }),
    },
  });

  const cleaningKit = await prisma.product.create({
    data: {
      id: "prod_cleaning_kit",
      merchantId: merchant.id,
      name: "Shoe Cleaning Kit",
      price: 299,
      costPrice: 113,
      marginPercent: 62.0,
      category: "Care",
      stock: 85,
      salesCount: 94,
      conversionRate: 1.8,
      description: "Premium eco-friendly shoe cleaner solution + stiff bristle detail brush.",
      attributesJson: JSON.stringify({
        use_case: ["sneaker care", "maintenance"],
        rating: 4.9,
      }),
    },
  });

  const waterBottle = await prisma.product.create({
    data: {
      id: "prod_water_bottle",
      merchantId: merchant.id,
      name: "Sports Water Bottle",
      price: 599,
      costPrice: 239,
      marginPercent: 60.0,
      category: "Accessories",
      stock: 110,
      salesCount: 134,
      conversionRate: 3.4,
      description: "BPA-free 750ml insulated stainless steel hydration bottle.",
      attributesJson: JSON.stringify({
        use_case: ["hydration", "gym", "outdoor"],
        capacity: "750ml",
        rating: 4.4,
      }),
    },
  });

  // 3. Create Sample Customers
  const customer1 = await prisma.customer.create({
    data: {
      id: "cust_001",
      merchantId: merchant.id,
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      phone: "+91 98765 43210",
      segment: "Cross-sell Eligible",
      totalSpent: 5998.0,
      ordersCount: 2,
      lastPurchaseDate: new Date(Date.now() - 3 * 86400000),
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      id: "cust_002",
      merchantId: merchant.id,
      name: "Priya Patel",
      email: "priya.p@example.com",
      phone: "+91 98123 45678",
      segment: "Returning",
      totalSpent: 8497.0,
      ordersCount: 3,
      lastPurchaseDate: new Date(Date.now() - 1 * 86400000),
    },
  });

  const customer3 = await prisma.customer.create({
    data: {
      id: "cust_003",
      merchantId: merchant.id,
      name: "Aman Verma",
      email: "aman.v@example.com",
      phone: "+91 97654 32109",
      segment: "High Value",
      totalSpent: 14295.0,
      ordersCount: 5,
      lastPurchaseDate: new Date(Date.now() - 5 * 86400000),
    },
  });

  // 4. Create Historical Orders
  await prisma.order.create({
    data: {
      id: "order_hist_101",
      merchantId: merchant.id,
      customerId: customer1.id,
      productId: runningShoes.id,
      amount: 2999,
      status: "paid",
      razorpayOrderId: "order_mock_101",
      createdAt: new Date(Date.now() - 7 * 86400000),
    },
  });

  await prisma.order.create({
    data: {
      id: "order_hist_102",
      merchantId: merchant.id,
      customerId: customer2.id,
      productId: runningShoes.id,
      amount: 2999,
      status: "paid",
      razorpayOrderId: "order_mock_102",
      createdAt: new Date(Date.now() - 4 * 86400000),
    },
  });

  // 5. Create AI Growth Opportunities
  await prisma.opportunity.create({
    data: {
      id: "opp_cross_sell_01",
      merchantId: merchant.id,
      title: "Cross-sell opportunity: Running Shoes → Sports Socks",
      category: "Cross-Sell",
      description: "72 customers purchased Running Pro Shoes in the last 30 days, but only 11 added Sports Socks to their cart.",
      potentialRevenueMin: 18000,
      potentialRevenueMax: 42000,
      confidence: 91.0,
      evidenceJson: JSON.stringify({
        shoesPurchasedCount: 72,
        socksPurchasedCount: 11,
        attachmentRate: "15.2%",
        categoryBenchmark: "28.0%",
        gap: "12.8%",
        recommendedBundle: "Running Pro Shoes + Sports Socks",
        bundlePrice: 3299,
        standalonePriceSum: 3398,
        discountPercent: 10,
      }),
      aiReasoning: "Historical purchasing pattern shows high friction when customers add accessories separately at checkout. Bundling at 10% discount increases bundle conversion probability by 2.4x while increasing AOV by ₹399.",
      status: "ACTIVE",
      actionPrepared: true,
    },
  });

  await prisma.opportunity.create({
    data: {
      id: "opp_checkout_drop_02",
      merchantId: merchant.id,
      title: "Checkout conversion drop on high-value carts (>₹2,500)",
      category: "Checkout Recovery",
      description: "Customers with cart values exceeding ₹2,500 exhibit a 31% lower checkout completion rate due to shipping cost friction.",
      potentialRevenueMin: 27000,
      potentialRevenueMax: 35000,
      confidence: 86.0,
      evidenceJson: JSON.stringify({
        threshold: 2500,
        abandonmentIncrease: "31%",
        cartCountAffected: 48,
        recommendedAction: "Auto-apply express free shipping tier on orders >= ₹2,500",
      }),
      aiReasoning: "Shoppers dropping off at payment step indicate shipping fee surprise on orders over ₹2,500. A bounded free-shipping incentive recovers an estimated 22 cart abandonments.",
      status: "ACTIVE",
      actionPrepared: false,
    },
  });

  await prisma.opportunity.create({
    data: {
      id: "opp_high_margin_03",
      merchantId: merchant.id,
      title: "High-margin product underperforming: Shoe Cleaning Kit",
      category: "High-Margin Boost",
      description: "Shoe Cleaning Kit carries a 62% profit margin but has only a 5% attachment rate at checkout.",
      potentialRevenueMin: 11000,
      potentialRevenueMax: 19000,
      confidence: 82.0,
      evidenceJson: JSON.stringify({
        margin: "62%",
        attachmentRate: "5%",
        potentialRevenue: "₹11,000 - ₹19,000",
        recommendedAction: "Checkout popover add-on offer for ₹199 with footwear orders",
      }),
      aiReasoning: "Low visibility during footwear selection causes customers to miss care accessories. High margin permits aggressive initial add-on pricing.",
      status: "ACTIVE",
      actionPrepared: false,
    },
  });

  // 6. Create Campaigns
  await prisma.campaign.create({
    data: {
      id: "camp_running_cross_sell",
      merchantId: merchant.id,
      name: "Running Shoes + Socks Bundle Campaign",
      status: "Active",
      targetAudience: "Returning & Footwear Buyers",
      discountPercent: 10.0,
      maxBudget: 5000.0,
      maxRedemptions: 100,
      currentRedemptions: 87,
      reach: 1200,
      conversions: 87,
      revenueGenerated: 286000.0,
      aov: 3284.0,
      roi: 4.8,
    },
  });

  // 7. Seed Initial Audit Events
  await prisma.auditEvent.create({
    data: {
      merchantId: merchant.id,
      actor: "AI Agent",
      action: "ANALYZE_SALES_DATA",
      reason: "Routine daily revenue growth optimization scan",
      status: "SUCCESS",
      riskLevel: "LOW",
      approvalStatus: "AUTOMATIC",
      outputJson: JSON.stringify({ opportunitiesFound: 3, topImpactMin: 18000, topImpactMax: 42000 }),
    },
  });

  await prisma.auditEvent.create({
    data: {
      merchantId: merchant.id,
      actor: "AI Agent",
      action: "DETECT_CROSS_SELL_OPPORTUNITY",
      reason: "Identified low socks attachment rate on Running Pro Shoes",
      status: "SUCCESS",
      riskLevel: "LOW",
      approvalStatus: "AUTOMATIC",
      outputJson: JSON.stringify({ opportunityId: "opp_cross_sell_01", confidence: 0.91 }),
    },
  });

  console.log("✅ UrbanKicks Merchant Database Seeded Successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
