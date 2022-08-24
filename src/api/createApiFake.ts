import { Api } from "./domain/api"
import { createChangePasswordFake } from "./profile/fake/createChangePasswordFake"
import { createCreateAccountFake } from "./auth/fake/createCreateAccountFake"
import { createLoginFake } from "./auth/fake/createLoginFake"

export function createApiFake(): Api {
  return {
    auth: {
      login: createLoginFake(),
      createAccount: createCreateAccountFake(),
    },
    profile: {
      changePassword: createChangePasswordFake(),
    },
  }
}
