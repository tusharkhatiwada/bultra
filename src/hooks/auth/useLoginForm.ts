import * as y from "yup"

import { UseFormProps, useForm } from "hooks/useForm"

type LoginForm = {
  email: string
  password: string
}

const DEFAULT_VALUES: LoginForm = {
  email: "",
  password: "",
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
      email: y.string().email().required(),
      password: y.string().required(),
    }),
  })
}
