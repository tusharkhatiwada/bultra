import * as y from "yup"

import { UseFormProps, useForm } from "hooks/useForm"

type ForgotPasswordForm = {
  email: string
}

const DEFAULT_VALUES: ForgotPasswordForm = {
  email: "",
}

type FormProps = UseFormProps<ForgotPasswordForm>

export interface ForgotPasswordFormProps {
  onSubmit: FormProps["onSubmit"]
  defaultValues?: ForgotPasswordForm
}

export const useForgotPasswordForm = ({
  onSubmit,
  defaultValues = DEFAULT_VALUES,
}: ForgotPasswordFormProps) => {
  return useForm({
    defaultValues,
    onSubmit,
    schema: y.object().shape({
      email: y.string().email().required(),
    }),
  })
}
