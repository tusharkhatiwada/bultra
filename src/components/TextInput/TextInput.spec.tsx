import { fireEvent, render } from "tests/app-tests-utils"

import { TextInput } from "./TextInput"

describe("TextInput", () => {
  it("renders properly", async () => {
    const { getByText } = await render(<TextInput label="Email" name="email" />)

    expect(getByText("Email")).toBeTruthy()
  })

  it("calls onChangeText on keyboard type", async () => {
    const onChangeMock = jest.fn()
    const { getByText } = await render(
      <TextInput label="Email" name="email" onChangeText={onChangeMock} />,
    )

    fireEvent.changeText(getByText("Email"), "a")

    expect(onChangeMock).toHaveBeenCalledWith("a")
  })

  it("calls onBlur on keyboard type", async () => {
    const onChangeMock = jest.fn()
    const { getByText } = await render(
      <TextInput label="Email" name="email" onBlur={onChangeMock} />,
    )

    fireEvent(getByText("Email"), "onBlur")

    expect(onChangeMock).toHaveBeenCalled()
  })

  it("displays error message on status error", async () => {
    const { getByText } = await render(
      <TextInput label="Email" status="error" name="email" message="Im an error" />,
    )

    expect(getByText("Im an error")).toBeTruthy()
  })

  it("displays the placeholder passed by prop", async () => {
    const { getByPlaceholderText } = await render(
      <TextInput label="Email" name="email" placeholder="placeholder" />,
    )

    expect(getByPlaceholderText("placeholder")).toBeTruthy()
  })

  it("has toggle visibility button if the input is password type", async () => {
    const { getByRole } = await render(
      <TextInput
        type="password"
        label="Password"
        name="password"
        placeholder="placeholder"
        value="asd"
      />,
    )

    expect(getByRole("button")).toBeTruthy()
  })
})
