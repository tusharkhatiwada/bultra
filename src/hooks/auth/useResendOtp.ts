import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { ResendOtp } from "api/domain/auth"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<ResendOtp.Response, AxiosError, ResendOtp.Params>
type Result = UseMutationResult<ResendOtp.Response, AxiosError, ResendOtp.Params>

export const useResendOtp = (options?: Options) => {
  const { auth } = useApi()

  const mutationFn: ResendOtp.Request = (params) => auth.resendOtp(params)

  const mutation: Result = useMutation(mutationFn, options)

  return {
    ...mutation,
    resendOtp: mutation.mutate,
  }
}
