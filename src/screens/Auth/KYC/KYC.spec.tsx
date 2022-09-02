import { KYC, KYCProps } from "./KYC"
import { fireEvent, render, waitFor } from "tests/app-tests-utils"

import { DeviceEventEmitter } from "react-native"
import { Events } from "models/Events"
import { Routes } from "models/Routes"

const props = {
  navigation: {
    goBack: jest.fn(),
    navigate: jest.fn(),
  },
} as unknown as KYCProps

describe("KYC", () => {
  it("calls kyf endpoint with form data", async () => {
    const { getByText, getByLabelText, getByPlaceholderText } = await render(<KYC {...props} />)

    const nameInput = getByPlaceholderText("wallet.kyc.form.name.placeholder")
    const documentTypeSelect = getByLabelText("wallet.kyc.form.documentType.label")
    const documentNumberInput = getByPlaceholderText("wallet.kyc.form.documentNumber.placeholder")
    const addressInput = getByPlaceholderText("wallet.kyc.form.address.placeholder")

    fireEvent.changeText(nameInput, "Full name")
    fireEvent.changeText(documentNumberInput, "Document number")
    fireEvent.changeText(addressInput, "Address")

    fireEvent.press(documentTypeSelect)
    fireEvent.press(getByText("National Document"))

    DeviceEventEmitter.emit(Events.CameraCapture, { uri: "fileUri" })

    fireEvent.press(getByLabelText("wallet.kyc.form.cta"))

    await waitFor(() => {
      // TODO: Verify endpoint call
      expect(props.navigation.goBack).toHaveBeenCalledTimes(1)
    })
  })

  it("navigates to the document upload screen", async () => {
    const { getByText } = await render(<KYC {...props} />)

    const cameraButton = getByText("wallet.kyc.form.documentPhoto.cta")

    fireEvent.press(cameraButton)

    await waitFor(() => {
      expect(props.navigation.navigate).toHaveBeenCalledWith(Routes.auth.document_photo)
    })
  })
})
