import { useQuery } from "@tanstack/react-query"
import { Pnl } from "api/domain/pnl"

import { AxiosError } from "axios"
import { useApi } from "context/ApiContext"

export const useGetPnl = () => {
  const { pnl } = useApi()

  const request = useQuery<Pnl.Response, AxiosError>(["pnl"], () => pnl.getPnl())

  return {
    ...request,
  }
}
