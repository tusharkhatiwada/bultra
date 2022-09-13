export enum PlanTypes {
  BASIC = "BASIC",
  PREMIUM = "PREMIUM",
  VIP = "VIP",
}

export const BasicPlan = {
  type: PlanTypes.BASIC,
  fee: 1,
  price: 25,
  subscription: 400,
}

export const PremiumPlan = {
  type: PlanTypes.PREMIUM,
  fee: 1.5,
  price: 50,
  subscription: 400,
}

export const VipPlan = {
  type: PlanTypes.VIP,
  fee: 2,
  price: 100,
  subscription: 400,
}

// TODO: This should be a fixture
export const Plans = {
  [PlanTypes.BASIC]: BasicPlan,
  [PlanTypes.PREMIUM]: PremiumPlan,
  [PlanTypes.VIP]: VipPlan,
}
