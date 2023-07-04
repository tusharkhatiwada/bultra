export namespace Pnl {
  export type Response = {
    ["24hours"]?: string
    lastWeek?: string
    lastMonth?: string
  }
  export type Request = () => Promise<Pnl.Response>
}

export interface PnlApi {
  getPnl: Pnl.Request
}
