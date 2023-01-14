import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { PasswordRecovery } from "api/domain/auth"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<PasswordRecovery.Response, AxiosError, PasswordRecovery.Params>
type Result = UseMutationResult<PasswordRecovery.Response, AxiosError, PasswordRecovery.Params>

export const usePasswordRecovery = (options?: Options) => {
  const { auth } = useApi()

  const mutationFn: PasswordRecovery.Request = (params) => auth.passwordRecovery(params)

  const mutation: Result = useMutation(mutationFn, options)

  return { ...mutation, passwordRecovery: mutation.mutate }
}
