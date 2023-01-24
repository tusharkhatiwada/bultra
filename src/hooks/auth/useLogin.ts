import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { Login } from "api/domain/auth"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<Login.Response, AxiosError, Login.Params>
type Result = UseMutationResult<Login.Response, AxiosError, Login.Params>

export const useLogin = (options?: Options) => {
  const { auth } = useApi()

  const mutationFn: Login.Request = (params) => auth.login(params)

  const mutation: Result = useMutation(mutationFn, options)

  return {
    ...mutation,
    login: mutation.mutate,
  }
}
