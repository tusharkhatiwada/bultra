import {  PasswordRecovery } from "api/domain/auth"

export const createPasswordRecoveryFake = (): PasswordRecovery.Request => () => {
  const createPasswordRecoveryFixture = (): PasswordRecovery.Response => {
    return { message: "FAKE" }
  }
  return Promise.resolve(createPasswordRecoveryFixture())
}
