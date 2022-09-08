import { AxiosInstance } from "axios"
import FormData from "form-data"
import { KYC } from "api/domain/auth"

export const createKYCHttp =
  (client: AxiosInstance): KYC.Request =>
  async ({ name, documentType, documentNumber, address, documentPhoto, invoice }) => {
    const formData = new FormData()

    formData.append("name", name)
    formData.append("documentType", documentType)
    formData.append("documentNumber", documentNumber)
    formData.append("address", address)

    formData.append("documentPhoto", {
      type: "image/jpeg",
      name: "documentPhoto",
      uri: documentPhoto.uri,
    })

    formData.append("invoice", {
      type: invoice.mimeType,
      name: "invoice",
      uri: invoice.uri,
    })

    await client.post("/v1/auth/kyc", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
  }
