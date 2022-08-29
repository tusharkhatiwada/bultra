import { GetUserProfile } from "api/domain/profile"
import { createUserInformationFixture } from "fixtures/profile/createUserInformationFixture"

export const createGetUserProfileFake = (): GetUserProfile.Request => () => {
  return Promise.resolve(createUserInformationFixture())
}
