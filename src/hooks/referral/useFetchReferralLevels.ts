import { UseQueryOptions, useQuery } from "@tanstack/react-query"

import { AxiosError } from "axios"
import { FetchReferralLevels } from "api/domain/referral"
import { useApi } from "context/ApiContext"

export const useFetchReferralLevels = (
  options?: UseQueryOptions<FetchReferralLevels.Response, AxiosError>,
) => {
  const { referral } = useApi()
  const request = useQuery<FetchReferralLevels.Response, AxiosError>(
    ["referralLevels"],
    () => referral.fetchReferralLevels(),
    options,
  )
  return {
    ...request,
    referralLevels: request.data,
  }
}
