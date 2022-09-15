import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { GetNetworkList } from "api/domain/wallet"
import { useApi } from "context/ApiContext"

export const useGetNetworkList = (
  options?: UseQueryOptions<GetNetworkList.Response, AxiosError>,
) => {
  const { wallet } = useApi()

  const request = useQuery<GetNetworkList.Response, AxiosError>(
    ["network-list"],
    () => wallet.getNetworkList(),
    options,
  )

  return {
    ...request,
    networkList: request.data,
  }
}
