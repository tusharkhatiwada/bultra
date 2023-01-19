import { UseQueryOptions, useQuery, useMutation, UseMutationResult, UseMutationOptions } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { FetchWalletHistory } from "api/domain/wallet"
import { useApi } from "context/ApiContext"

type Result = UseMutationResult<FetchWalletHistory.Response, AxiosError, FetchWalletHistory.Params>
type RequestOptions = UseMutationOptions<FetchWalletHistory.Response, AxiosError, FetchWalletHistory.Params>

export const useFetchWalletHistory = (
  params: FetchWalletHistory.Params,
  options?: UseQueryOptions<FetchWalletHistory.Response, AxiosError>,
  requestOptions? : RequestOptions
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

  const mutationFn: FetchWalletHistory.Request = (params) => wallet.fetchWalletHistory(params)

  const mutation: Result = useMutation(mutationFn, requestOptions)

  return {
    ...request,
    walletHistory: result,
    getWalletHistory: mutation.mutate,
  }
}
