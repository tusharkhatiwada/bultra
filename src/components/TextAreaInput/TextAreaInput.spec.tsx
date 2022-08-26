import { fireEvent, render } from "tests/app-tests-utils"

import { TextAreaInput } from "./TextAreaInput"

describe("TextAreaInput", () => {
  it("calls onChangeText on keyboard type", async () => {
    const onChangeMock = jest.fn()
    const { getByText } = await render(
      <TextAreaInput label="Email" name="email" onChangeText={onChangeMock} />,
    )

    fireEvent.changeText(getByText("Email"), "a")

    expect(onChangeMock).toHaveBeenCalledWith("a")
  })

  it("displays error message on status error", async () => {
    const { getByText } = await render(
      <TextAreaInput label="Email" status="error" name="email" message="Im an error" />,
    )

    expect(getByText("Im an error")).toBeTruthy()
  })

  it("displays the placeholder passed by prop", async () => {
    const { getByPlaceholderText } = await render(
      <TextAreaInput label="Email" name="email" placeholder="placeholder" />,
    )

    expect(getByPlaceholderText("placeholder")).toBeTruthy()
  })
})
