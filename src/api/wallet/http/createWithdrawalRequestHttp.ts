import { AxiosInstance, AxiosResponse } from "axios"

import { WithdrawalRequest } from "api/domain/wallet"

export const createWithdrawalRequestHttp =
  (client: AxiosInstance): WithdrawalRequest.Request =>
  async ({ amount, network, walletAddress }) => {
    const { data }: AxiosResponse<string> = await client.post("/v1/wallet/withdraw", {
      amount,
      network,
      walletAddress,
    })

    return data
  }
