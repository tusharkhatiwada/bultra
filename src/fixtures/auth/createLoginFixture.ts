import { Login } from "api/domain/auth"

export const createLoginFixture = (): Login.Response => {
  return { accessToken: { accessToken: "test" } }
}
