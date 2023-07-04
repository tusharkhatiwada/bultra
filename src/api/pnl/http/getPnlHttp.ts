import { Pnl } from "api/domain/pnl"
import { AxiosInstance, AxiosResponse } from "axios"

export const getPnlHttp =
  (client: AxiosInstance): any =>
  async () => {
    const { data }: AxiosResponse<Pnl.Response> = await client.get(`/pnl`)
    return data
  }
