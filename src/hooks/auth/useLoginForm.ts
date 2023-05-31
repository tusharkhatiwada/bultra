import * as y from "yup"

import { UseFormProps, useForm } from "hooks/useForm"

type LoginForm = {
  email_address: string
  hashed_password: string
}

const DEFAULT_VALUES: LoginForm = {
  email_address: "",
  hashed_password: "",
}

type FormProps = UseFormProps<LoginForm>

export interface LoginFormProps {
  onSubmit: FormProps["onSubmit"]
  defaultValues?: LoginForm
}

export const useLoginForm = ({ onSubmit, defaultValues = DEFAULT_VALUES }: LoginFormProps) => {
  return useForm({
    defaultValues,
    onSubmit,
    schema: y.object().shape({
      email_address: y.string().email().required(),
      hashed_password: y.string().required(),
    }),
  })
}
