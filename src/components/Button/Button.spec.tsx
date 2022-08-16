import { Button } from "./Button"
import { render } from "tests/app-tests-utils"

describe("Button", () => {
  it("renders", async () => {
    const { getByRole } = await render(<Button>Text</Button>)

    expect(getByRole("button")).toBeTruthy()
  })

  it("renders accesibility label", async () => {
    const { getByLabelText } = await render(<Button>Text</Button>)

    expect(getByLabelText("Text")).toBeTruthy()
  })
})
