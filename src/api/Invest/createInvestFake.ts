import { InvestRequest } from "../domain/invest"

export const createInvestFake = (): InvestRequest.Request => () => {
  const createGetPlansFakeFixture = (): InvestRequest.Response => {
    return ""
  }
  return Promise.resolve(createGetPlansFakeFixture())
}
