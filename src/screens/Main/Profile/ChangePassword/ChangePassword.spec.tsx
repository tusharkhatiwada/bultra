import { ChangePassword, ChangePasswordProps } from "./ChangePassword"
import { api, fireEvent, render, waitFor } from "tests/app-tests-utils"

const props = {} as ChangePasswordProps

describe("ChangePassword", () => {
  it("can submit a new password", async () => {
    jest.spyOn(api.profile, "changePassword")

    const { getByText } = await render(<ChangePassword {...props} />)

    const oldPasswordInput = getByText("profile.changePassword.form.oldPassword.label")
    const newPasswordInput = getByText("profile.changePassword.form.newPassword.label")
    const repeatPasswordInput = getByText("profile.changePassword.form.repeatPassword.label")

    const button = getByText("profile.changePassword.form.submit")

    fireEvent.changeText(oldPasswordInput, "123")
    fireEvent.changeText(newPasswordInput, "1234")
    fireEvent.changeText(repeatPasswordInput, "1234")

    fireEvent.press(button)

    await waitFor(() => {
      expect(api.profile.changePassword).toHaveBeenCalledWith({
        oldPassword: "123",
        password: "1234",
      })
    })
  })
})
