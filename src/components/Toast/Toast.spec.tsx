import { fireEvent, render } from "tests/app-tests-utils"

import React from "react"
import { Toast } from "./Toast"

describe("Toast", () => {
  it("renders properly", async () => {
    const { getByText } = await render(
      <Toast
        id="1"
        title={"title"}
        description={"description"}
        status={"success"}
        onClose={() => undefined}
      />,
    )

    expect(getByText("title")).toBeTruthy()
  })

  it("calls onClose on close icon press", async () => {
    const onCloseMock = jest.fn()
    const { getByRole } = await render(
      <Toast
        id="1"
        title={"title"}
        description={"description"}
        status={"success"}
        onClose={onCloseMock}
      />,
    )

    fireEvent.press(getByRole("button"))

    expect(onCloseMock).toHaveBeenCalledWith("1")
  })
})
