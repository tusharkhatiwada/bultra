import { fireEvent, render, waitFor } from "tests/app-tests-utils"

import NotFoundScreen from "./NotFoundScreen"
import { RootStackScreenProps } from "models/Navigation"
import { Routes } from "models/Routes"

const props = {
  navigation: {
    replace: jest.fn(),
  },
} as unknown as RootStackScreenProps<"NotFound">

describe("NotFoundScreen", () => {
  it("can go back", async () => {
    const { getByText } = await render(<NotFoundScreen {...props} />)

    const button = getByText("Go to home screen!")

    fireEvent.press(button)

    await waitFor(() => {
      expect(props.navigation.replace).toHaveBeenCalledWith(Routes.main.navigator)
    })
  })
})
