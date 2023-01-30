import { Home, HomeProps } from "./Home"
import { fireEvent, render, waitFor } from "tests/app-tests-utils"

import { Routes } from "models/Routes"

const props = {
  navigation: {
    navigate: jest.fn(),
  },
} as unknown as HomeProps

describe("Home", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<Home {...props} />)

    expect(getByText("home.greetings")).toBeTruthy()
  })

  it("shows the plans button if not logged in", async () => {
    const { getByText } = await render(<Home {...props} />)

    const plansButton = getByText("plans.title")

    fireEvent.press(plansButton)

    await waitFor(() => {
      expect(props.navigation.navigate).toHaveBeenCalledWith(Routes.auth.navigator, {
        screen: Routes.auth.plans,
      })
    })
  })
})

it("shows the create account button if not logged in", async () => {
  const { getByText } = await render(<Home {...props} />, { isLoggedIn: false })

  const createAccountButton = getByText("createAccount.title")

  fireEvent.press(createAccountButton)

  await waitFor(() => {
    expect(props.navigation.navigate).toHaveBeenCalledWith(Routes.auth.navigator, {
      screen: Routes.auth.create_account,
    })
  })
})
