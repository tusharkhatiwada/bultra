import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { GetUserProfile } from "api/domain/profile"
import { useApi } from "context/ApiContext"

export const useGetUserProfile = (
  options?: UseQueryOptions<GetUserProfile.Response, AxiosError>,
) => {
  const { profile } = useApi()

  const request = useQuery<GetUserProfile.Response, AxiosError>(
    ["user-profile"],
    () => profile.getUserProfile(),
    options,
  )

  return {
    ...request,
    userProfile: request.data,
  }
}
