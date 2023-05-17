import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { GetWallet } from "api/domain/wallet"
import { useApi } from "context/ApiContext"
import { isNil } from "lodash"
import { WalletsType } from "../../models/Wallet"
const allowedTokens = ["USDT"]

export const useGetWallet = (options?: UseQueryOptions<GetWallet.Response, AxiosError>) => {
  const { wallet } = useApi()
  const request = useQuery<GetWallet.Response, AxiosError>(
    ["getWallet"],
    () => wallet.getWallet(),
    { ...options, refetchInterval: 15000 },
  )

  const resultWallets: WalletsType[] = []

  if (!isNil(request.data)) {
    request.data.wallets.forEach((wallet) => {
      const walletBalance = wallet.balance.filter((balance) =>
        allowedTokens.includes(balance.token),
      )
      resultWallets.push({
        id: wallet.id,
        name: wallet.name,
        address: wallet.address,
        balance: walletBalance,
      })
    })
  }

  return {
    ...request,
    removeWallet: request.remove,
    wallet: isNil(request.data) ? undefined : { ...request.data, ...{ wallets: resultWallets } },
    walletTrc: !isNil(request.data)
      ? request.data.wallets.find((network) => network.name === "TRC20")
      : undefined,
  }
}
