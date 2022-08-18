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

export interface AuthApi {
  login: Login.Request
  createAccount: CreateAccount.Request
}
