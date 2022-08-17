import { fireEvent, render } from "tests/app-tests-utils"

import { ISelectItemProps } from "native-base"
import React from "react"
import { Select } from "./Select"

const selectOptions: ISelectItemProps[] = [
  { label: "Uno", value: "1" },
  { label: "Dos", value: "2" },
  { label: "Tres", value: "3" },
  { label: "Cuatro", value: "4" },
]

describe("Select", () => {
  it("renders properly", async () => {
    const { getByPlaceholderText } = await render(
      <Select label="Number" options={selectOptions} placeholder="Choose an option" />,
    )

    expect(getByPlaceholderText("Choose an option")).toBeTruthy()
  })

  it("calls onChange on option selection", async () => {
    const onChangeMock = jest.fn()
    const { getByText, getByPlaceholderText } = await render(
      <Select
        label="Number"
        options={selectOptions}
        placeholder="Choose an option"
        onChange={onChangeMock}
      />,
    )

    fireEvent.press(getByPlaceholderText("Choose an option"))
    fireEvent.press(getByText("Tres"))

    expect(onChangeMock).toHaveBeenCalledWith("3")
  })

  it("displays error message", async () => {
    const { getByText } = await render(
      <Select
        label="Number"
        options={selectOptions}
        placeholder="Choose an option"
        message="I'm an error"
      />,
    )

    expect(getByText("I'm an error")).toBeTruthy()
  })

  it("can recieve a default value", async () => {
    const { getByText } = await render(
      <Select
        label="Number"
        options={selectOptions}
        placeholder="Choose an option"
        defaultValue="3"
      />,
    )

    expect(getByText("Tres")).toBeTruthy()
  })
})
