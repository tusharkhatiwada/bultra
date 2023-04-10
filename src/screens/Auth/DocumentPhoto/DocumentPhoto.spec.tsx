// import { Camera, PermissionResponse, PermissionStatus } from "expo-camera"
// import { DocumentPhoto, DocumentPhotoProps } from "./DocumentPhoto"
// import { fireEvent, render, waitFor } from "tests/app-tests-utils"
//
// const props = {
//   navigation: {
//     goBack: jest.fn(),
//   },
// } as unknown as DocumentPhotoProps
//
// const permissionsResponse: PermissionResponse = {
//   status: PermissionStatus.GRANTED,
//   expires: "never",
//   granted: true,
//   canAskAgain: true,
// }
// const requestPermissions = jest.fn()

// describe("DocumentPhoto", () => {
//   it("renders loading status", async () => {
//     jest
//       .spyOn(Camera, "useCameraPermissions")
//       .mockImplementationOnce(() => [null, requestPermissions, jest.fn()])
//
//     const { getByLabelText } = await render(<DocumentPhoto {...props} />)
//
//     expect(getByLabelText("loading")).toBeTruthy()
//   })
//
//   it("renders capture button if permissions have been granted", async () => {
//     jest
//       .spyOn(Camera, "useCameraPermissions")
//       .mockImplementationOnce(() => [permissionsResponse, requestPermissions, jest.fn()])
//
//     const { getByLabelText } = await render(<DocumentPhoto {...props} />)
//
//     expect(getByLabelText("wallet.kyc.documentPhoto.capture")).toBeTruthy()
//   })
//
//   it("can request permissions it not granted", async () => {
//     jest
//       .spyOn(Camera, "useCameraPermissions")
//       .mockImplementationOnce(() => [
//         { ...permissionsResponse, status: PermissionStatus.DENIED, granted: false },
//         requestPermissions,
//         jest.fn(),
//       ])
//
//     const { getByLabelText } = await render(<DocumentPhoto {...props} />)
//
//     fireEvent.press(getByLabelText("wallet.kyc.documentPhoto.requestPermissionsCta"))
//
//     await waitFor(() => {
//       expect(requestPermissions).toHaveBeenCalledTimes(1)
//     })
//   })
//
//   it.todo("can take picture correctly")
// })
