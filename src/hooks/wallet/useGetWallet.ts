import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { GetWallet } from "api/domain/wallet"
import { useApi } from "context/ApiContext"

export const useGetWallet = (options?: UseQueryOptions<GetWallet.Response, AxiosError>) => {
  const { wallet } = useApi()
  const request = useQuery<GetWallet.Response, AxiosError>(
    ["getWallet"],
    () => wallet.getWallet(),
    options,
  )
  return {
    ...request,
    wallet: request.data,
  }
}
