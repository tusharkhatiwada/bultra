import { AxiosInstance, AxiosResponse } from "axios"

import { SupportRequest } from "api/domain/profile"

export const createSupportRequestHttp =
  (client: AxiosInstance): SupportRequest.Request =>
  async ({ phoneNumber, message }) => {
    const { data }: AxiosResponse<string> = await client.post("/v1/profile/support-request", {
      phoneNumber,
      message,
    })

    return data
  }
