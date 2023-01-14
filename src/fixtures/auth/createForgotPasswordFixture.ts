import { ForgotPassword } from "api/domain/auth"

export const createForgotPasswordFixture = (): ForgotPassword.Response => {
  return { message: "FAKE", codeEndTime: "" }
}
