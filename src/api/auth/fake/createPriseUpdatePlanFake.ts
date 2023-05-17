import { GetPriceUpdatePlan } from "../../domain/auth"

export const createPriseUpdatePlanFake = (): GetPriceUpdatePlan.Request => () => {
  const createGetPlansFakeFixture = (): GetPriceUpdatePlan.Response => {
    return {
      amount: 0,
      current: 0,
      new: 0,
    }
  }
  return Promise.resolve(createGetPlansFakeFixture())
}
