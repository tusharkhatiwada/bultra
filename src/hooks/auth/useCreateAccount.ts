import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { CreateAccount } from "api/domain/auth"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<CreateAccount.Response, AxiosError, CreateAccount.Params>
type Result = UseMutationResult<CreateAccount.Response, AxiosError, CreateAccount.Params>

export const useCreateAccount = (options?: Options) => {
  const { auth } = useApi()

  const mutationFn: CreateAccount.Request = (params) => auth.createAccount(params)

  const mutation: Result = useMutation(mutationFn, options)

  return { ...mutation, createAccount: mutation.mutate }
}
