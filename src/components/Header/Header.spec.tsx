import { Header, HeaderProps } from "./Header"
import { fireEvent, render, waitFor } from "tests/app-tests-utils"

const props = {
  navigation: {
    goBack: jest.fn(),
  },
  title: "Header Component",
} as unknown as HeaderProps

describe("Header", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<Header {...props} />)

    expect(getByText(props.title)).toBeTruthy()
  })

  it("can go back to previous screen", async () => {
    const { getByRole } = await render(<Header {...props} />)

    const button = getByRole("button")

    fireEvent.press(button)

    await waitFor(() => {
      expect(props.navigation.goBack).toHaveBeenCalledTimes(1)
    })
  })
})
