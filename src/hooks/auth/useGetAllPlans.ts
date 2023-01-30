import { useQuery } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { GetPlans } from "api/domain/auth"
import { useApi } from "context/ApiContext"

export const useGetAllPlans = () => {
  const { auth } = useApi()

  const request = useQuery<GetPlans.Response, AxiosError>(["getPlans"], () => auth.getPlans())

  return {
    plans: request.data,
  }
}
