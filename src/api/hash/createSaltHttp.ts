import { GenerateSalt } from "api/domain/hash"
import { AxiosInstance, AxiosResponse } from "axios"

export const generateSaltHttp =
  (client: AxiosInstance): GenerateSalt.Request =>
  async ({ email_address }) => {
    const { data }: AxiosResponse<GenerateSalt.Response> = await client.post("/salt", {
      email_address,
    })

    return data
  }
