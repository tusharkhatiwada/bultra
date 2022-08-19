import { Plans, PlansProps } from "./Plans"
import { fireEvent, render, waitFor } from "tests/app-tests-utils"

import { CommonActions } from "@react-navigation/native"
import { Routes } from "models/Routes"

const props = {
  navigation: {
    dispatch: jest.fn(),
  },
} as unknown as PlansProps

describe("Plans", () => {
  it("can select a plan", async () => {
    const { getByRole, getAllByRole } = await render(<Plans {...props} />)

    const continueButton = getByRole("button")

    const plans = getAllByRole("radio")
    const vipPlan = plans[2]

    fireEvent.press(vipPlan)

    fireEvent.press(continueButton)
    fireEvent.press(continueButton)

    // TODO: Test for plan creation
    await waitFor(() => {
      expect(props.navigation.dispatch).toHaveBeenCalledWith(
        CommonActions.reset({ index: 0, routes: [{ name: Routes.main.navigator }] }),
      )
    })
  })
})
