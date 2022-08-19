import { Plans, PlansProps } from "./Plans"

import { render } from "tests/app-tests-utils"

const props = {} as PlansProps

describe.skip("Plans", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<Plans {...props} />)

    expect(getByText("This is the Plans component!")).toBeTruthy()
  })
})
