import { ConfirmForgotPasswordOtp } from "api/domain/auth"

export const createForgotPasswordOtpFake = (): ConfirmForgotPasswordOtp.Request => () => {
  const createForgotPasswordOtpFixture = (): ConfirmForgotPasswordOtp.Response => {
    return { hash: "$2a$06$Lx50/EBr.nBbv3vH4AWX4eluThPmkUEP8GXk137GLrweev11ge8gy" }
  }
  return Promise.resolve(createForgotPasswordOtpFixture())
}
