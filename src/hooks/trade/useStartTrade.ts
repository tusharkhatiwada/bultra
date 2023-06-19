import { useQuery } from "@tanstack/react-query"
import { StartTrade } from "api/domain/trade"

import { AxiosError } from "axios"
import { useApi } from "context/ApiContext"
import { StorageKey, createSecureStorage } from "services/SecureStorage"

export const useStartTrade = (params: StartTrade.Params) => {
  const storage = createSecureStorage()
  const { trade } = useApi()

  // console.log("===Params===", params, !!params.startTrading && !!params.email_address)

  const request = useQuery<StartTrade.Response, AxiosError>(
    ["startTrade", params.email_address, params.startTrading],
    () => trade.startTrade(params),
    {
      enabled: !!params.startTrading && !!params.email_address,
      refetchInterval: (data) => {
        if (data !== undefined && !data?.message?.includes("ready")) {
          storage.set(StorageKey.INITIATE_TRADING, "true")
          console.log("===Refetching====", data)
          return 30000
        }
        return false
      },
    },
  )

  return {
    ...request,
    payment: request.data,
  }
}
