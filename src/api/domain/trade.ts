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
export namespace ActivateBot {
  export type Params = {
    key: string
    secret: string
    risk_level: string
    user_id: string
    email_address: string
  }
  export type Response = {
    message?: string
  }
  export type Request = (params: ActivateBot.Params) => Promise<ActivateBot.Response>
}

export interface TradeApi {
  startTrade: StartTrade.Request
  activateBot: ActivateBot.Request
}
