import { ProfitsList } from "./ProfitsList"
import { createWalletFixture } from "fixtures/wallet/createWalletFixture"
import { render } from "tests/app-tests-utils"

describe("ProfitsList", () => {
  it("displays the default message", async () => {
    const { getByText } = await render(
      <ProfitsList profitSummary={createWalletFixture().profitSummary} />,
    )

    expect(getByText("+1.45%")).toBeTruthy()
    expect(getByText("-3.33%")).toBeTruthy()
    expect(getByText("+6.32%")).toBeTruthy()
  })
})
