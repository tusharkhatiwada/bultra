import { AxiosInstance, AxiosResponse } from "axios"

import { FetchWalletHistory } from "api/domain/wallet"
import { WalletHistory } from "models/Wallet"

export const createFetchWalletHistoryHttp =
  (client: AxiosInstance): FetchWalletHistory.Request =>
  async (dateRange) => {
    const { data }: AxiosResponse<WalletHistory[]> = await client.get("/transaction", {
      params: {
        dateRange,
      }
    })

    return data
  }

