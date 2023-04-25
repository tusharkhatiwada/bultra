import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { useApi } from "context/ApiContext"
import { InvestRequest } from "../../api/domain/invest"

type Options = UseMutationOptions<InvestRequest.Response, AxiosError, InvestRequest.Params>
type Result = UseMutationResult<InvestRequest.Response, AxiosError, InvestRequest.Params>

export const useInvestRequest = (options?: Options) => {
  const { invest } = useApi()

  const mutationFn: InvestRequest.Request = (params) => invest.investRequest(params)

  const mutation: Result = useMutation(mutationFn, options)

  return {
    ...mutation,
    investRequest: mutation.mutate,
  }
}
