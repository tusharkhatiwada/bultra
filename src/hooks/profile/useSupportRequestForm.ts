import * as y from "yup"

import { UseFormProps, useForm } from "hooks/useForm"

type SupportRequestForm = {
  phoneNumber: string
  message: string
}

const DEFAULT_VALUES: SupportRequestForm = {
  phoneNumber: "",
  message: "",
}

type FormProps = UseFormProps<SupportRequestForm>

export interface SupportRequestFormProps {
  onSubmit: FormProps["onSubmit"]
  defaultValues?: SupportRequestForm
}

export const useSupportRequestForm = ({
  onSubmit,
  defaultValues = DEFAULT_VALUES,
}: SupportRequestFormProps) => {
  return useForm({
    defaultValues,
    onSubmit,
    schema: y.object().shape({
      phoneNumber: y.string().required(),
      message: y.string().required(),
    }),
  })
}
