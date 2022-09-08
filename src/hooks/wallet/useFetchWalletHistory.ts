import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { FetchWalletHistory } from "api/domain/wallet"
import { useApi } from "context/ApiContext"

export const useFetchWalletHistory = (
  params: FetchWalletHistory.Params,
  options?: UseQueryOptions<FetchWalletHistory.Response, AxiosError>,
) => {
  const { wallet } = useApi()
  const request = useQuery<FetchWalletHistory.Response, AxiosError>(
    ["fetchWalletHistory"],
    () => wallet.fetchWalletHistory(params),
    options,
  )

  const result = request.data?.map((transaction) => ({
    ...transaction,
    date: new Date(transaction.date),
  }))

  return {
    ...request,
    walletHistory: result,
  }
}
