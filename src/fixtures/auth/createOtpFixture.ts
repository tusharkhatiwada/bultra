import { ConfirmOtp } from "api/domain/auth"

export const createOtpFixture = (): ConfirmOtp.Response => {
  return { accessToken: { accessToken: "test_jwt" } }
}
