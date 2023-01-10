import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from "@tanstack/react-query"

import { AxiosError } from "axios"
import { Otp } from "api/domain/auth"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<Otp.Response, AxiosError, Otp.Params>
type Result = UseMutationResult<Otp.Response, AxiosError, Otp.Params>

export const useOtp = (options?: Options) => {
  const { auth } = useApi()

  const mutationFn: Otp.Request = (params) => auth.otp(params)

  const mutation: Result = useMutation(mutationFn, options)

  return {
    ...mutation,
    sendOtp: mutation.mutate,
  }
}
