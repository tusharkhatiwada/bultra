import ModalScreen from "./ModalScreen"
import { render } from "tests/app-tests-utils"

describe("ModalScreen", () => {
  it("renders", async () => {
    const { getByText } = await render(<ModalScreen />)

    expect(getByText("Modal")).toBeTruthy()
  })
})
