import { Support, SupportProps } from "./Support"
import { api, fireEvent, render, waitFor } from "tests/app-tests-utils"

const props = {} as SupportProps

describe("Support", () => {
  it("can send a support request", async () => {
    jest.spyOn(api.profile, "supportRequest")

    const { getByLabelText, getByText } = await render(<Support {...props} />)

    fireEvent.changeText(getByLabelText("profile.support.form.phoneNumber.label"), "666554433")
    fireEvent.changeText(getByLabelText("profile.support.form.message.label"), "message")
    fireEvent.press(getByText("profile.support.form.submit"))

    await waitFor(() => {
      expect(api.profile.supportRequest).toHaveBeenCalledWith({
        phoneNumber: "666554433",
        message: "message",
      })
    })
  })
})
