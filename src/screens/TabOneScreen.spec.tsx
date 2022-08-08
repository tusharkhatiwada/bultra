import { render } from "tests/app-tests-utils"
import TabOneScreen from "./TabOneScreen"

describe("TabOneScreen", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<TabOneScreen />)

    expect(getByText("Tab One")).toBeTruthy()
  })
})
