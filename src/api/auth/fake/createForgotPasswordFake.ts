import { ForgotPassword } from "api/domain/auth"

export const createForgotPasswordFake = (): ForgotPassword.Request => () => {
  return Promise.resolve()
}
