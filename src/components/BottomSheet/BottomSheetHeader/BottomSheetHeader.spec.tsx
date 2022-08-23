import { fireEvent, render } from "tests/app-tests-utils"

import { BottomSheetHeader } from "./BottomSheetHeader"

describe("BottomSheetHeader", () => {
  it("renders", async () => {
    const { getByText } = await render(<BottomSheetHeader title="Title" />)

    expect(getByText("Title")).toBeTruthy()
  })

  it("closes", async () => {
    const onClose = jest.fn()

    const { getByRole } = await render(<BottomSheetHeader title="Title" onClose={onClose} />)

    const closeButton = getByRole("button")

    fireEvent.press(closeButton)

    expect(onClose).toBeCalledTimes(1)
  })
})
