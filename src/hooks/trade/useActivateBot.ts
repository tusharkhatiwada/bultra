import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { ActivateBot } from "api/domain/trade"
import { AxiosError } from "axios"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<ActivateBot.Response, AxiosError, ActivateBot.Params>
type Result = UseMutationResult<ActivateBot.Response, AxiosError, ActivateBot.Params>

export const useActivateBot = (options?: Options) => {
  const { trade } = useApi()

  const mutationFn: ActivateBot.Request = (params) => trade.activateBot(params)

  const mutation: Result = useMutation(mutationFn, options)

  return {
    ...mutation,
    activateBot: mutation.mutate,
  }
}
