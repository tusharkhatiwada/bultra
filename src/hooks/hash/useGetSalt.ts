import { useQuery } from "@tanstack/react-query"

import { GetSalt } from "api/domain/hash"
import { AxiosError } from "axios"
import { useApi } from "context/ApiContext"

export const useGetSalt = (params: GetSalt.Params) => {
  const { hash } = useApi()

  const request = useQuery<GetSalt.Response, AxiosError>(
    ["getSalt", params.email_address, params.fetching],
    () => hash.getSalt(params),
    {
      enabled: !!params.fetching,
    },
  )

  return {
    ...request,
    salt: request.data,
  }
}
