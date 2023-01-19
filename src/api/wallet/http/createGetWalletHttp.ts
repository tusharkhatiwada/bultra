import { AxiosInstance, AxiosResponse } from "axios"

import { GetWallet } from "api/domain/wallet"
import { Wallet } from "models/Wallet"

export const createGetWalletHttp =
  (client: AxiosInstance): GetWallet.Request =>
  async () => {
    const { data }: AxiosResponse<Wallet> = await client.get("/wallet")

    return {
      ...data,
      profitSummary: {
      last24hours: 1.45,
        last7days: -3.33,
        lastMonth: 6.32,
    },
    }

  }
