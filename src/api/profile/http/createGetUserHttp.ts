import { AxiosInstance, AxiosResponse } from "axios"

import { GetUserProfile } from "../../domain/profile"

export const createGetUserHttp =
  (client: AxiosInstance): GetUserProfile.Request =>
  async () => {
    const { data }: AxiosResponse<GetUserProfile.Response> = await client.get("/user")

    return data
  }
