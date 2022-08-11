import { fireEvent, render } from "tests/app-tests-utils"

import React from "react"
import { TextInput } from "./TextInput"

describe("TextInput", () => {
  it("renders properly", async () => {
    const { getByText } = await render(
      <TextInput label="Email" value="" name="email" onChangeText={() => undefined} />,
    )

    expect(getByText("Email")).toBeTruthy()
  })

  it("calls onChangeText on keyboard type", async () => {
    const onChangeMock = jest.fn()
    const { getByText } = await render(
      <TextInput label="Email" value="" name="email" onChangeText={onChangeMock} />,
    )

    fireEvent.changeText(getByText("Email"), "a")

    expect(onChangeMock).toHaveBeenCalledWith("a")
  })

  it("calls onBlur on keyboard type", async () => {
    const onChangeMock = jest.fn()
    const { getByText } = await render(
      <TextInput
        label="Email"
        value=""
        name="email"
        onChangeText={() => undefined}
        onBlur={onChangeMock}
      />,
    )

    fireEvent(getByText("Email"), "onBlur")

    expect(onChangeMock).toHaveBeenCalled()
  })

  it("displays error message on status error", async () => {
    const { getByText } = await render(
      <TextInput
        label="Email"
        value=""
        status="error"
        name="email"
        message="Im an error"
        onChangeText={() => undefined}
      />,
    )

    expect(getByText("Im an error")).toBeTruthy()
  })

  it("displays the placeholder passed by prop", async () => {
    const { getByPlaceholderText } = await render(
      <TextInput
        label="Email"
        value=""
        name="email"
        placeholder="placeholder"
        onChangeText={() => undefined}
      />,
    )

    expect(getByPlaceholderText("placeholder")).toBeTruthy()
  })
})
