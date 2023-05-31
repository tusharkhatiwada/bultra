import { GetSalt } from "api/domain/hash"
import { AxiosInstance, AxiosResponse } from "axios"

export const getSaltHttp =
  (client: AxiosInstance): GetSalt.Request =>
  async ({ email_address }) => {
    const { data }: AxiosResponse<GetSalt.Response> = await client.get(
      `/salt?email_address=${email_address}`,
    )
    return data
  }
