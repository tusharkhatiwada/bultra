import { SupportRequest } from "api/domain/profile"

export const createSupportRequestFake = (): SupportRequest.Request => () => {
  return Promise.resolve("OK")
}
