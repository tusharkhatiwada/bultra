import { Login } from "api/domain/auth"
import { createLoginFixture } from "fixtures/auth/createLoginFixture"

export const createLoginFake = (): Login.Request => () => {
  return Promise.resolve(createLoginFixture())
}
