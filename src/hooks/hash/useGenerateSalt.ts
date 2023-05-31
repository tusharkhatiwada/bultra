import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { GenerateSalt } from "api/domain/hash"
import { AxiosError } from "axios"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<GenerateSalt.Response, AxiosError, GenerateSalt.Params>
type Result = UseMutationResult<GenerateSalt.Response, AxiosError, GenerateSalt.Params>

export const useGenerateSalt = (options?: Options) => {
  const { hash } = useApi()

  const mutationFn: GenerateSalt.Request = (params) => hash.generateSalt(params)

  const mutation: Result = useMutation(mutationFn, options)

  return { ...mutation, generateSalt: mutation.mutate }
}
