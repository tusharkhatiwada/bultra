import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { ForgotPassword } from "api/domain/auth"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<ForgotPassword.Response, AxiosError, ForgotPassword.Params>
type Result = UseMutationResult<ForgotPassword.Response, AxiosError, ForgotPassword.Params>

export const useForgotPassword = (options?: Options) => {
  const { auth } = useApi()

  const mutationFn: ForgotPassword.Request = (params) => auth.forgotPassword(params)

  const mutation: Result = useMutation(mutationFn, options)

  return {
    ...mutation,
    forgotPassword: mutation.mutate,
  }
}
