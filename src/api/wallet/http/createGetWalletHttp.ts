import { AxiosInstance, AxiosResponse } from "axios"

import { GetWallet } from "api/domain/wallet"
import { Wallet } from "models/Wallet"

export const createGetWalletHttp =
  (client: AxiosInstance): GetWallet.Request =>
  async () => {
    const { data }: AxiosResponse<Wallet> = await client.get("/v1/wallet/")

    return data
  }
