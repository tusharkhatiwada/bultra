import { ConfirmOtp } from "api/domain/auth"
import { createOtpFixture } from "../../../fixtures/auth/createOtpFixture"

export const createOtpFake = (): ConfirmOtp.Request => () => {
  return Promise.resolve(createOtpFixture())
}
