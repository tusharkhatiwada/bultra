import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { ConfirmOtp } from "api/domain/auth"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<ConfirmOtp.Response, AxiosError, ConfirmOtp.Params>
type Result = UseMutationResult<ConfirmOtp.Response, AxiosError, ConfirmOtp.Params>

export const useOtp = (options?: Options) => {
  const { auth } = useApi()

  const mutationFn: ConfirmOtp.Request = (params) => auth.otp(params)

  const mutation: Result = useMutation(mutationFn, options)

  return {
    ...mutation,
    sendOtp: mutation.mutate,
  }
}
