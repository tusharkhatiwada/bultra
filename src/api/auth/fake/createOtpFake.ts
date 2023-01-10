import { Otp } from "api/domain/auth"
import { createOtpFixture } from "../../../fixtures/auth/createOtpFixture"

export const createOtpFake = (): Otp.Request => () => {
  return Promise.resolve(createOtpFixture())
}
