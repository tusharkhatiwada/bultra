import { GetPriceUpdatePlan } from "../../domain/auth"

export const createPriseUpdatePlanFake = (): GetPriceUpdatePlan.Request => () => {
  const createGetPlansFakeFixture = (): GetPriceUpdatePlan.Response => {
    return []
  }
  return Promise.resolve(createGetPlansFakeFixture())
}
