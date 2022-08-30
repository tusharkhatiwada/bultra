import { Toast, ToastType } from "./Toast"
import { fireEvent, render } from "tests/app-tests-utils"

import React from "react"

describe("Toast", () => {
  it("renders properly", async () => {
    const { getByText } = await render(
      <Toast
        title={"title"}
        description={"description"}
        type={ToastType.success}
        onClose={() => undefined}
      />,
    )

    expect(getByText("title")).toBeTruthy()
  })

  it("calls onClose on close icon press", async () => {
    const onCloseMock = jest.fn()
    const { getByRole } = await render(
      <Toast
        title={"title"}
        description={"description"}
        type={ToastType.success}
        onClose={onCloseMock}
      />,
    )

    fireEvent.press(getByRole("button"))

    expect(onCloseMock).toHaveBeenCalled()
  })
})
