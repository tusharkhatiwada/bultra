import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { KYC } from "api/domain/auth"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<KYC.Response, AxiosError, KYC.Params>
type Result = UseMutationResult<KYC.Response, AxiosError, KYC.Params>

export const useKYC = (options?: Options) => {
  const { auth } = useApi()

  const mutationFn: KYC.Request = (params) => auth.kyc(params)

  const mutation: Result = useMutation(mutationFn, options)

  return { ...mutation, kyc: mutation.mutate }
}
