import { ActivateStatus } from "api/domain/trade"
import { AxiosInstance, AxiosResponse } from "axios"

export const getActivateStatusHttp =
  (client: AxiosInstance): ActivateStatus.Request =>
  async ({ userId }) => {
    const { data }: AxiosResponse<ActivateStatus.Response> = await client.get(
      `/activate?user_id=${userId}`,
    )
    return data
  }
