import * as y from "yup"

import { useForm, UseFormProps } from "hooks/useForm"

export type OtpForm = {
  otpCode: string
}

const DEFAULT_VALUES: OtpForm = {
  otpCode: "",
}

type FormProps = UseFormProps<OtpForm>

export interface OtpFormProps {
  onSubmit: FormProps["onSubmit"]
  defaultValues?: OtpForm
}

export const useOtpForm = ({ onSubmit, defaultValues = DEFAULT_VALUES }: OtpFormProps) => {
  return useForm({
    defaultValues,
    onSubmit,
    schema: y.object().shape({
      otpCode: y.string().required().min(6, "").max(6, ""),
    }),
  })
}
