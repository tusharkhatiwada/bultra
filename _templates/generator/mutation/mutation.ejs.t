---
to: src/hooks/<%= module %>/use<%= h.changeCase.pascal(name) %>.ts
---
<% Adapter = h.changeCase.pascal(name) %>
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query"
import { <%= Adapter %> } from "api/domain/<%= module %>"
import { AxiosError } from "axios"
import { useApi } from "context/ApiContext"

type Options = UseMutationOptions<<%= Adapter %>.Response, AxiosError, <%= Adapter %>.Params>
type Result = UseMutationResult<<%= Adapter %>.Response, AxiosError, <%= Adapter %>.Params>

export const use<%= Adapter %> = (options?: Options) => {
  const { <%= module %> } = useApi()

  const mutationFn: <%= Adapter %>.Request = (params) => console.log("TODO: replace this")

  const mutation: Result = useMutation(mutationFn, options)


  return { ...mutation, <%= h.changeCase.camel(name) %>: mutation.mutate }
}
