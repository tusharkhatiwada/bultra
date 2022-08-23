import { Support, SupportProps } from "./Support"

import { render } from "tests/app-tests-utils"

const props = {} as SupportProps

describe("Support", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<Support {...props} />)

    expect(getByText("This is the Support component!")).toBeTruthy()
  })
})
