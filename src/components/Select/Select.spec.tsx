import { Select, SelectProps } from "./Select"
import { fireEvent, render } from "tests/app-tests-utils"

import { ISelectItemProps } from "native-base"

const selectOptions: ISelectItemProps[] = [
  { label: "Uno", value: "1" },
  { label: "Dos", value: "2" },
  { label: "Tres", value: "3" },
  { label: "Cuatro", value: "4" },
]

const props = {
  label: "Number",
  options: selectOptions,
  placeholder: "Choose an option",
  onChange: jest.fn(),
} as SelectProps

describe("Select", () => {
  it("renders properly", async () => {
    const { getByPlaceholderText } = await render(<Select {...props} />)

    expect(getByPlaceholderText("Choose an option")).toBeTruthy()
  })

  it("calls onChange on option selection", async () => {
    const { getByText, getByPlaceholderText } = await render(<Select {...props} />)

    fireEvent.press(getByPlaceholderText("Choose an option"))
    fireEvent.press(getByText("Tres"))

    expect(props.onChange).toHaveBeenCalledWith("3")
  })

  it("displays error message", async () => {
    const { getByText } = await render(<Select {...props} message="I'm an error" />)

    expect(getByText("I'm an error")).toBeTruthy()
  })

  it("can recieve a default value", async () => {
    const { getByText } = await render(<Select {...props} defaultValue="3" />)

    expect(getByText("Tres")).toBeTruthy()
  })
})
