import { ConfirmOtp } from "api/domain/auth"

export const createOtpFixture = (): ConfirmOtp.Response => {
  return { accessToken: "test_jwt" }
}
