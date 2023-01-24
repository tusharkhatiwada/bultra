import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { ConfirmForgotPasswordOtp } from "api/domain/auth"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<
  ConfirmForgotPasswordOtp.Response,
  AxiosError,
  ConfirmForgotPasswordOtp.Params
>
type Result = UseMutationResult<
  ConfirmForgotPasswordOtp.Response,
  AxiosError,
  ConfirmForgotPasswordOtp.Params
>

export const useForgotPasswordOtp = (options?: Options) => {
  const { auth } = useApi()

  const mutationFn: ConfirmForgotPasswordOtp.Request = (params) =>
    auth.confirmForgotPasswordOtp(params)

  const mutation: Result = useMutation(mutationFn, options)

  return {
    ...mutation,
    sendOtp: mutation.mutate,
  }
}
