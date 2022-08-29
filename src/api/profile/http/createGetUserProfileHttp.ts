import { AxiosInstance, AxiosResponse } from "axios"

import { GetUserProfile } from "api/domain/profile"
import { UserInformation } from "models/Profile"

export const createGetUserProfileHttp =
  (client: AxiosInstance): GetUserProfile.Request =>
  async () => {
    const { data }: AxiosResponse<UserInformation> = await client.get("/v1/profile/me")

    return data
  }
