import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { StopBot } from "api/domain/trade"
import { AxiosError } from "axios"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<StopBot.Response, AxiosError, StopBot.Params>
type Result = UseMutationResult<StopBot.Response, AxiosError, StopBot.Params>

export const useStopBot = (options?: Options) => {
  const { trade } = useApi()

  const mutationFn: StopBot.Request = (params) => trade.stopBot(params)

  const mutation: Result = useMutation(mutationFn, options)

  return {
    ...mutation,
    stopBot: mutation.mutate,
  }
}
