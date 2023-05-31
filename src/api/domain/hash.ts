export namespace GenerateSalt {
  export type Params = {
    email_address: string
  }
  export type Response = {
    salt: string
    user_id: string
    message?: string
  }
  export type Request = (params: GenerateSalt.Params) => Promise<GenerateSalt.Response>
}
export namespace GetSalt {
  export type Params = {
    email_address: string
    fetching: boolean
  }
  export type Response = {
    salt: string
    user_id: string
    message?: string
  }
  export type Request = (params: GetSalt.Params) => Promise<GetSalt.Response>
}

export interface HashApi {
  generateSalt: GenerateSalt.Request
  getSalt: GetSalt.Request
}
