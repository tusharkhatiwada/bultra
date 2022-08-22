export enum PlanTypes {
  BASIC = "BASIC",
  PREMIUM = "PREMIUM",
  VIP = "VIP",
}

export const BasicPlan = {
  type: PlanTypes.BASIC,
  yield: {
    from: 5,
    to: 7,
  },
  subscription: {
    monthly: 400,
    biennial: 2000,
  },
}

export const PremiumPlan = {
  type: PlanTypes.PREMIUM,
  yield: {
    from: 7,
    to: 10,
  },
  subscription: {
    monthly: 400,
    biennial: 2000,
  },
}

export const VipPlan = {
  type: PlanTypes.VIP,
  yield: {
    from: 10,
    to: 15,
  },
  subscription: {
    monthly: 400,
    biennial: 2000,
  },
}

// TODO: This should be a fixture
export const Plans = {
  [PlanTypes.BASIC]: BasicPlan,
  [PlanTypes.PREMIUM]: PremiumPlan,
  [PlanTypes.VIP]: VipPlan,
}

export enum SubscriptionTypes {
  MONTHLY = "monthly",
  BIENNIAL = "biennial",
}
