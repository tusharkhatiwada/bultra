import { UseMutationOptions, UseMutationResult, useMutation } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { PlanSubscription } from "api/domain/auth"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<PlanSubscription.Response, AxiosError, PlanSubscription.Params>
type Result = UseMutationResult<PlanSubscription.Response, AxiosError, PlanSubscription.Params>

export const usePlanSubscription = (options?: Options) => {
  const { auth } = useApi()

  const mutationFn: PlanSubscription.Request = (params) => auth.planSubscription(params)

  const mutation: Result = useMutation(mutationFn, options)

  return { ...mutation, planSubscription: mutation.mutate }
}
