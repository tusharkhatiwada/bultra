import { fireEvent, render } from "tests/app-tests-utils"

import { PhoneInput } from "./PhoneInput"

describe("PhoneInput", () => {
  it("can write a phone number", async () => {
    const onChangeMock = jest.fn()
    const { getByLabelText } = await render(
      <PhoneInput label="phone" name="phone" onChangeText={onChangeMock} />,
    )

    fireEvent.changeText(getByLabelText("phone"), "666554433")

    expect(onChangeMock).toHaveBeenCalledWith("666554433")
  })
})
