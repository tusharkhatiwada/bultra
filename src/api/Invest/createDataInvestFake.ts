import { GetDataInvest } from "../domain/invest"
import { createDataInvestFixture } from "../../fixtures/Invest/createDataInvestFixture"

export const createDataInvestFake = (): GetDataInvest.Request => () => {
  return Promise.resolve(createDataInvestFixture())
}
