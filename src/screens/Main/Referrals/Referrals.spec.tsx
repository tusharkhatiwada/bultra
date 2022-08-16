import { Referrals, ReferralsProps } from "./Referrals"

import { render } from "tests/app-tests-utils"

const props = {} as ReferralsProps

describe("Referrals", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(<Referrals {...props} />)

    expect(getByText("Referrals")).toBeTruthy()
  })
})
