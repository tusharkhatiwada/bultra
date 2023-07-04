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
export namespace ActivateStatus {
  export type Params = {
    userId: string
  }
  export type Response = {
    message?: string
  }
  export type Request = (params: ActivateStatus.Params) => Promise<ActivateStatus.Response>
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
    message_activate?: string
  }
  export type Request = (params: ActivateBot.Params) => Promise<ActivateBot.Response>
}
export namespace StopBot {
  export type Params = {
    key: string
    secret: string
    user_id: string
  }
  export type Response = {
    message?: string
  }
  export type Request = (params: StopBot.Params) => Promise<StopBot.Response>
}

export interface TradeApi {
  startTrade: StartTrade.Request
  activateBot: ActivateBot.Request
  stopBot: StopBot.Request
  getActivateStatus: ActivateStatus.Request
}
