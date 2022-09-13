import { ResetPassword } from "api/domain/auth"

export const createResetPasswordFake = (): ResetPassword.Request => () => {
  return Promise.resolve()
}
