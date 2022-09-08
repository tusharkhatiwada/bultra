import { ButtonBar, ButtonBarProps } from "./ButtonBar"
import { fireEvent, render } from "tests/app-tests-utils"

import { dateFilterButtons } from "./constants/DateFilterButtons"

const props = {
  buttons: dateFilterButtons,
  onChange: () => undefined,
  defaultValue: dateFilterButtons[0].value,
} as ButtonBarProps

describe("ButtonBar", () => {
  it("displays the default message", async () => {
    const onChangeMock = jest.fn()
    const { getByText } = await render(<ButtonBar {...props} onChange={onChangeMock} />)

    fireEvent.press(getByText(dateFilterButtons[1].label))

    expect(onChangeMock).toHaveBeenCalledWith(dateFilterButtons[1].value)
  })
})
