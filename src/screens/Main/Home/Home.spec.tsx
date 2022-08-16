import { Home, HomeProps } from "./Home"

import { render } from "tests/app-tests-utils"

const props = {} as HomeProps

describe("Home", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<Home {...props} />)

    expect(getByText("Home")).toBeTruthy()
  })
})
