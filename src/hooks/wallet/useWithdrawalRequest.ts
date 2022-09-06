import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { WithdrawalRequest } from "api/domain/wallet"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<WithdrawalRequest.Response, AxiosError, WithdrawalRequest.Params>
type Result = UseMutationResult<WithdrawalRequest.Response, AxiosError, WithdrawalRequest.Params>

export const useWithdrawalRequest = (options?: Options) => {
  const { wallet } = useApi()

  const mutationFn: WithdrawalRequest.Request = (params) => wallet.withdrawalRequest(params)

  const mutation: Result = useMutation(mutationFn, options)

  return {
    ...mutation,
    withdrawalRequest: mutation.mutate,
  }
}
