import * as DocumentPicker from "expo-document-picker"

import { KYC, KYCProps } from "./KYC"
import { api, fireEvent, render, waitFor } from "tests/app-tests-utils"

import { DeviceEventEmitter } from "react-native"
import { Events } from "models/Events"
import { Routes } from "models/Routes"

const props = {
  navigation: {
    navigate: jest.fn(),
  },
  route: {
    params: {
      network: "network",
      walletAddress: "address",
      amount: 1000,
    },
  },
} as unknown as KYCProps

describe("KYC", () => {
  it("calls kyc endpoint with form data", async () => {
    jest.spyOn(api.auth, "kyc")
    jest
      .spyOn(DocumentPicker, "getDocumentAsync")
      .mockImplementationOnce(() =>
        Promise.resolve({ type: "success" } as DocumentPicker.DocumentResult),
      )

    const { getByText, getByLabelText, getByPlaceholderText } = await render(<KYC {...props} />)

    const nameInput = getByPlaceholderText("wallet.kyc.form.name.placeholder")
    const documentTypeSelect = getByLabelText("wallet.kyc.form.documentType.label")
    const documentNumberInput = getByPlaceholderText("wallet.kyc.form.documentNumber.placeholder")
    const addressInput = getByPlaceholderText("wallet.kyc.form.address.placeholder")
    const documentPicker = getByText("wallet.kyc.form.invoice.cta")

    fireEvent.changeText(nameInput, "Full name")
    fireEvent.changeText(documentNumberInput, "Document number")
    fireEvent.changeText(addressInput, "Address")

    fireEvent.press(documentTypeSelect)
    fireEvent.press(getByText("National Document"))

    DeviceEventEmitter.emit(Events.CameraCapture, { uri: "fileUri" })

    fireEvent.press(documentPicker)

    fireEvent.press(getByLabelText("wallet.kyc.form.cta"))

    await waitFor(() => {
      expect(api.auth.kyc).toHaveBeenCalledWith({
        name: "Full name",
        documentType: "nationalDocument",
        documentNumber: "Document number",
        address: "Address",
        documentPhoto: { uri: "fileUri" },
        invoice: { type: "success" },
      })
    })
  })

  it.skip("calls withdrawal endpoint with form data", async () => {
    jest.spyOn(api.wallet, "withdrawalRequest")
    jest
      .spyOn(DocumentPicker, "getDocumentAsync")
      .mockImplementationOnce(() =>
        Promise.resolve({ type: "success" } as DocumentPicker.DocumentResult),
      )

    const { getByText, getByLabelText, getByPlaceholderText } = await render(<KYC {...props} />)

    const nameInput = getByPlaceholderText("wallet.kyc.form.name.placeholder")
    const documentTypeSelect = getByLabelText("wallet.kyc.form.documentType.label")
    const documentNumberInput = getByPlaceholderText("wallet.kyc.form.documentNumber.placeholder")
    const addressInput = getByPlaceholderText("wallet.kyc.form.address.placeholder")
    const documentPicker = getByText("wallet.kyc.form.invoice.cta")

    fireEvent.changeText(nameInput, "Full name")
    fireEvent.changeText(documentNumberInput, "Document number")
    fireEvent.changeText(addressInput, "Address")

    fireEvent.press(documentTypeSelect)
    fireEvent.press(getByText("National Document"))

    DeviceEventEmitter.emit(Events.CameraCapture, { uri: "fileUri" })

    fireEvent.press(documentPicker)

    fireEvent.press(getByLabelText("wallet.kyc.form.cta"))

    await waitFor(() => {
      expect(api.wallet.withdrawalRequest).toHaveBeenCalledWith(props.route.params)
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
