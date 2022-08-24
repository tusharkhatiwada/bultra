import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { ChangePassword } from "api/domain/profile"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<ChangePassword.Response, AxiosError, ChangePassword.Params>
type Result = UseMutationResult<ChangePassword.Response, AxiosError, ChangePassword.Params>

export const useChangePassword = (options?: Options) => {
  const { profile } = useApi()

  const mutationFn: ChangePassword.Request = (params) => profile.changePassword(params)

  const mutation: Result = useMutation(mutationFn, options)

  return {
    ...mutation,
    changePassword: mutation.mutate,
  }
}
