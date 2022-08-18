import { Api } from "./domain/api"
import { createCreateAccountFake } from "./auth/fake/createCreateAccountFake"
import { createLoginFake } from "./auth/fake/createLoginFake"

export function createApiFake(): Api {
  return {
    auth: {
      login: createLoginFake(),
      createAccount: createCreateAccountFake(),
    },
  }
}
