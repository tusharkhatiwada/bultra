import { useQuery } from "@tanstack/react-query"
import { StartTrade } from "api/domain/trade"

import { AxiosError } from "axios"
import { useApi } from "context/ApiContext"

export const useStartTrade = (params: StartTrade.Params) => {
  const { trade } = useApi()

  const request = useQuery<StartTrade.Response, AxiosError>(
    ["startTrade", params.email_address, params.startTrading],
    () => trade.startTrade(params),
    {
      enabled: !!params.startTrading,
    },
  )

  return {
    ...request,
    salt: request.data,
  }
}
