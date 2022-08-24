import { BottomSheet, BottomSheetProps } from "./BottomSheet"
import { fireEvent, render } from "tests/app-tests-utils"

const props = {
  isOpen: true,
  options: [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ],
  onChange: jest.fn(),
  closeBottomSheet: jest.fn(),
  cta: "Button text",
} as BottomSheetProps

describe("BottomSheet", () => {
  it("renders title", async () => {
    const { getByText } = await render(<BottomSheet {...props} title="Title" />)

    const title = getByText("Title")

    expect(title).toBeTruthy()
  })

  it("can select an option", async () => {
    const { getByText } = await render(<BottomSheet {...props} />)

    const option2 = getByText("Option 2")

    fireEvent.press(option2)

    expect(props.onChange).toHaveBeenCalledWith("2")
  })

  it("closes on button press", async () => {
    const { getByRole } = await render(<BottomSheet {...props} />)

    const closeButton = getByRole("button")

    fireEvent.press(closeButton)

    expect(props.closeBottomSheet).toHaveBeenCalledTimes(1)
  })
})
