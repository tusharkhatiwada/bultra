export namespace Login {
  export type Params = {
    email: string
    password: string
  }
  export type Response = string
  export type Request = (params: Login.Params) => Promise<Login.Response>
}

export interface AuthApi {
  login: Login.Request
}
