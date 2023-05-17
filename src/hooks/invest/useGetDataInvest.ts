import { useQuery } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { useApi } from "context/ApiContext"
import { GetDataInvest } from "../../api/domain/invest"

export const useGetDataInvest = () => {
  const { invest } = useApi()

  const request = useQuery<GetDataInvest.Response, AxiosError>(
    ["getInvestData"],
    () => invest.getDataInvest(),
    {
      refetchInterval: 15000,
    },
  )

  return {
    ...request,
    investData: request.data,
  }
}
