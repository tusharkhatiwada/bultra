// import { Routes } from "models/Routes"
import { NavigationProp } from "@react-navigation/native"
import { Routes } from "models/Routes"
import { handleLinkingUrl } from "./linking"

const navigation = {
  navigate: jest.fn(),
} as unknown as NavigationProp<ReactNavigation.RootParamList>

const baseUrl = "exp://host"

describe("linking", () => {
  it("opens app without navigation", () => {
    const link = `${baseUrl}/`

    handleLinkingUrl(navigation, link)

    expect(navigation.navigate).not.toHaveBeenCalled()
  })

  it("opens app and navigates to create account with a referral id", () => {
    const navigator = Routes.auth.navigator
    const screen = Routes.auth.create_account
    const params = new URLSearchParams({ referralId: "referralId" })

    const link = `${baseUrl}/${screen}?${params.toString()}`

    handleLinkingUrl(navigation, link)

    expect(navigation.navigate).toHaveBeenCalledWith(navigator, {
      screen,
      params: { referralId: "referralId" },
    })
  })
})
