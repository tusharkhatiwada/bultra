---
to: src/hooks/<%= module %>/use<%= h.changeCase.pascal(name) %>.ts
---
<%
  Query = h.changeCase.pascal(name)
%>
import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from "axios"
import { <%= Query %> } from "api/domain/<%= module %>"
import { useApi } from 'context/ApiContext'

type Options = UseQueryOptions<<%= Query%>.Response, AxiosError, <%= Query%>.Params>
type Result = UseQueryResult<<%= Query%>.Response, AxiosError>


export const use<%= Query %> = (options?: Options) => {
  const { <%= module %> } = useApi()

  const queryKey = "<%= Query %>"
  const queryFetcher: <%= Query %> = (params) => {console.log("TODO: Implement this")}
  
  const { data, ...rest } = useQuery<Result>(queryKey, queryFetcher(), options)
  
  return { <%= h.changeCase.camel(name) %>: data, ...rest }
}
