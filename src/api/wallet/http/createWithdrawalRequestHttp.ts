import { AxiosInstance, AxiosResponse } from "axios"

import { WithdrawalRequest } from "api/domain/wallet"

export const createWithdrawalRequestHttp =
  (client: AxiosInstance): WithdrawalRequest.Request =>
  async ({ amount, blockchain, addressTo, token }) => {
    const { data }: AxiosResponse<string> = await client.post("/transaction/withdrawal", {
      amount,
      blockchain,
      addressTo,
      token,
    })

    return data
  }
