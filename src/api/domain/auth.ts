import { PlanTypes, SubscriptionTypes } from "models/Plans"

import { NetworkTypes } from "models/Networks"

export namespace Login {
  export type Params = {
    email: string
    password: string
  }
  export type Response = string
  export type Request = (params: Login.Params) => Promise<Login.Response>
}

export namespace CreateAccount {
  export type Params = {
    email: string
    password: string
    referralId?: string
  }
  export type Response = string
  export type Request = (params: CreateAccount.Params) => Promise<CreateAccount.Response>
}

export namespace PlanSubscription {
  export type Params = {
    type: PlanTypes
    subscription: SubscriptionTypes
    network: NetworkTypes
  }
  export type Response = void
  export type Request = (params: PlanSubscription.Params) => Promise<PlanSubscription.Response>
}

export interface AuthApi {
  login: Login.Request
  createAccount: CreateAccount.Request
  planSubscription: PlanSubscription.Request
}
