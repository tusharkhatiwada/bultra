import { render } from "tests/app-tests-utils"
import { OtpInput } from "./OtpInput"

describe("OtpInput", () => {
  it("displays error message on status error", async () => {
    const handleSetOtpItemMock = jest.fn()
    const handleSetPastedOtpMock = jest.fn()
    const { getByText } = await render(
      <OtpInput
        handleSetOtpItem={handleSetOtpItemMock}
        handleSetPastedOtp={handleSetPastedOtpMock}
        isError={true}
      />,
    )

    expect(getByText("login.form.otp.error")).toBeTruthy()
  })
})
