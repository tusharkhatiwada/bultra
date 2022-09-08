import { KYC } from "api/domain/auth"

export const createKYCFake = (): KYC.Request => () => {
  return Promise.resolve()
}
