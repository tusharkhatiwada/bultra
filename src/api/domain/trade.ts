export namespace StartTrade {
  export type Params = {
    email_address: string
    startTrading: boolean
  }
  export type Response = {
    message?: string
  }
  export type Request = (params: StartTrade.Params) => Promise<StartTrade.Response>
}

export interface TradeApi {
  startTrade: StartTrade.Request
}
