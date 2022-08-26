import { AxiosInstance, AxiosResponse } from "axios"

import { SupportRequest } from "api/domain/profile"

export const createChangePasswordHttp =
  (client: AxiosInstance): SupportRequest.Request =>
  async ({ phoneNumber }) => {
    const { data }: AxiosResponse<string> = await client.post("/v1/profile/support-request", {
      phoneNumber,
    })

    return data
  }
