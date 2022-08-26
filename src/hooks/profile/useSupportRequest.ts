import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { SupportRequest } from "api/domain/profile"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<SupportRequest.Response, AxiosError, SupportRequest.Params>
type Result = UseMutationResult<SupportRequest.Response, AxiosError, SupportRequest.Params>

export const useSupportRequest = (options?: Options) => {
  const { profile } = useApi()

  const mutationFn: SupportRequest.Request = (params) => profile.supportRequest(params)

  const mutation: Result = useMutation(mutationFn, options)

  return {
    ...mutation,
    supportRequest: mutation.mutate,
  }
}
