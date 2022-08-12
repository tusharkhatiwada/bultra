import { RootView } from "./RootView"
import { lightColors } from "styles/colors"
import { render } from "tests/app-tests-utils"

describe("RootView", () => {
  it("renders white background on light mode", async () => {
    const { getByTestId } = await render(<RootView testID="rootview" />)

    expect(getByTestId("rootview")).toHaveStyle({ backgroundColor: lightColors.white })
  })

  it("renders black background on light mode", async () => {
    const { getByTestId } = await render(<RootView testID="rootview" />, { darkMode: true })

    expect(getByTestId("rootview")).toHaveStyle({ backgroundColor: lightColors.black })
  })
})
