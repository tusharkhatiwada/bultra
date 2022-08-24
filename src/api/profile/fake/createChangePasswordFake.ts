import { ChangePassword } from "api/domain/profile"

export const createChangePasswordFake = (): ChangePassword.Request => () => {
  return Promise.resolve("OK")
}
