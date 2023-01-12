import { ResendOtp } from "api/domain/auth"
import { createResendOtpFixture } from "../../../fixtures/auth/createResendOtpFixture"

export const createResendOtpFake = (): ResendOtp.Request => () => {
  return Promise.resolve(createResendOtpFixture())
}
