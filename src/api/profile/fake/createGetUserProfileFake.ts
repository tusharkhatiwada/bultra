import { GetUserProfile } from "api/domain/profile"
import { createUserFixture } from "fixtures/profile/createUserFixture"

export const createGetUserProfileFake = (): GetUserProfile.Request => () => {
  return Promise.resolve(createUserFixture())
}
