import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { useApi } from "context/ApiContext"
import { RefundRequest } from "../../api/domain/invest"

type Options = UseMutationOptions<RefundRequest.Response, AxiosError, RefundRequest.Params>
type Result = UseMutationResult<RefundRequest.Response, AxiosError, RefundRequest.Params>

export const useRefundRequest = (options?: Options) => {
  const { invest } = useApi()

  const mutationFn: RefundRequest.Request = (params) => invest.refundRequest(params)

  const mutation: Result = useMutation(mutationFn, options)

  return {
    ...mutation,
    refundRequest: mutation.mutate,
  }
}
