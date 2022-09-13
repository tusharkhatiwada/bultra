import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { ResetPassword } from "api/domain/auth"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<ResetPassword.Response, AxiosError, ResetPassword.Params>
type Result = UseMutationResult<ResetPassword.Response, AxiosError, ResetPassword.Params>

export const useResetPassword = (options?: Options) => {
  const { auth } = useApi()

  const mutationFn: ResetPassword.Request = (params) => auth.resetPassword(params)

  const mutation: Result = useMutation(mutationFn, options)

  return {
    ...mutation,
    resetPassword: mutation.mutate,
  }
}
