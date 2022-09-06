import { WithdrawalRequest } from "api/domain/wallet"

export const createWithdrawalRequestFake = (): WithdrawalRequest.Request => () => {
  return Promise.resolve("OK")
}
