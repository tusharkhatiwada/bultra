import { useQuery } from "@tanstack/react-query"
import { ActivateStatus } from "api/domain/trade"

import { AxiosError } from "axios"
import { useApi } from "context/ApiContext"

export const useGetActivateStatus = (params: ActivateStatus.Params) => {
  const { trade } = useApi()

  const request = useQuery<ActivateStatus.Response, AxiosError>(
    ["activateStatus", params.userId],
    () => trade.getActivateStatus(params),
    {
      enabled: !!params.userId,
    },
  )

  return {
    ...request,
  }
}
