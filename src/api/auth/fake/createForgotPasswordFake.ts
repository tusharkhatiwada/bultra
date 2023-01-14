import { ForgotPassword } from "api/domain/auth"
import { createForgotPasswordFixture } from "../../../fixtures/auth/createForgotPasswordFixture"

export const createForgotPasswordFake = (): ForgotPassword.Request => () => {
  return Promise.resolve(createForgotPasswordFixture())
}
