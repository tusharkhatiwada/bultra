import {  ResendOtp } from "api/domain/auth"

export const createResendOtpFixture = (): ResendOtp.Response => {
  return {message: 'FAKE', codeEndTime: ''}
}
