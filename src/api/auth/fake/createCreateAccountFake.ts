import { CreateAccount } from "api/domain/auth"
import { createCreateAccountFixture } from "fixtures/auth/createCreateAccountFixture"

export const createCreateAccountFake = (): CreateAccount.Request => () => {
  return Promise.resolve(createCreateAccountFixture())
}
