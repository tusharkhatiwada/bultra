import { useQuery } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { GetPriceUpdatePlan } from "api/domain/auth"
import { useApi } from "context/ApiContext"

export const useGetPriceUpdatePlan = (params: GetPriceUpdatePlan.Params) => {
  const { auth } = useApi()

  const request = useQuery<GetPriceUpdatePlan.Response, AxiosError>(["getPriceUpdatePlan"], () =>
    auth.getPriceUpdatePlan(params),
  )

  return {
    ...request,
    priceUpdatePlan: request.data,
  }
}
