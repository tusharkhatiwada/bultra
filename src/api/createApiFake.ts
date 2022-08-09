import { createLoginFake } from "./auth/fake/createLoginFake"
import { Api } from "./domain/api"

export function createApiFake(): Api {
  return {
    auth: {
      login: createLoginFake(),
    },
  }
}
