import { AxiosInstance, AxiosResponse } from "axios"

import { GetNetworkList } from "api/domain/wallet"

export const createGetNetworkListHttp =
  (client: AxiosInstance): GetNetworkList.Request =>
  async () => {
    const { data }: AxiosResponse<GetNetworkList.Response> = await client.get(
      "/v1/wallet/network-list",
    )

    return data
  }
