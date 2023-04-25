import { InvestData } from "../../models/Invest"

export namespace InvestRequest {
  export type Params = {
    deposit: number
  }
  export type Response = string
  export type Request = (params: InvestRequest.Params) => Promise<InvestRequest.Response>
}

export namespace GetDataInvest {
  export type Response = InvestData
  export type Request = () => Promise<GetDataInvest.Response>
}

export namespace RefundRequest {
  export type Params = {
    deposit: number
  }
  export type Response = string
  export type Request = (params: RefundRequest.Params) => Promise<RefundRequest.Response>
}

export interface InvestApi {
  investRequest: InvestRequest.Request
  refundRequest: RefundRequest.Request
  getDataInvest: GetDataInvest.Request
}
