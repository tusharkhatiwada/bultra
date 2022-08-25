import { ReferralLevel } from "./ReferralLevel"
import { createReferralLevelFixture } from "fixtures/referrals/createReferralLevelFixture"
import { formatNumberToCurrency } from "utils/currency"
import { render } from "tests/app-tests-utils"

describe("ReferralLevel", () => {
  it("displays level data", async () => {
    const [level] = createReferralLevelFixture()

    const { getByText } = await render(<ReferralLevel level={level} />)

    expect(getByText(formatNumberToCurrency(level.referrals))).toBeTruthy()
    expect(getByText(formatNumberToCurrency(level.amount))).toBeTruthy()
  })
})
