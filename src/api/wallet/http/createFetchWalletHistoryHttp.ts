import { AxiosInstance, AxiosResponse } from "axios"

import { FetchWalletHistory } from "api/domain/wallet"
import { WalletHistory } from "models/Wallet"

export const createFetchWalletHistoryHttp =
  (client: AxiosInstance): FetchWalletHistory.Request =>
  async () => {
    const { data }: AxiosResponse<WalletHistory[]> = await client.get("/v1/wallet/history")

    return data
  }
