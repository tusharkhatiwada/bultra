import * as y from "yup"

import { UseFormProps, useForm } from "hooks/useForm"

import { CameraCapturedPicture } from "expo-camera"
import { DocumentResult } from "expo-document-picker"

type KYCForm = {
  name: string
  documentType: string
  documentNumber: string
  address: string
  documentPhoto: CameraCapturedPicture
  invoice: Exclude<DocumentResult, { type: "cancel" }>
}

const DEFAULT_VALUES = {
  name: "",
  documentType: "",
  documentNumber: "",
  address: "",
} as KYCForm

type FormProps = UseFormProps<KYCForm>

export interface KYCFormProps {
  onSubmit: FormProps["onSubmit"]
  defaultValues?: KYCForm
}

export const useKYCForm = ({ onSubmit, defaultValues = DEFAULT_VALUES }: KYCFormProps) => {
  return useForm({
    defaultValues,
    onSubmit,
    schema: y.object().shape({
      name: y.string().required(),
      documentType: y.string().required(),
      documentNumber: y.string().required(),
      address: y.string().required(),
      documentPhoto: y.mixed().required(),
    }),
  })
}
