import * as y from "yup"

import { UseFormProps, useForm } from "hooks/useForm"

import { t } from "i18next"

type ResetPasswordForm = {
  password: string
  repeatPassword: string
}

const DEFAULT_VALUES: ResetPasswordForm = {
  password: "",
  repeatPassword: "",
}

type FormProps = UseFormProps<ResetPasswordForm>

export interface ResetPasswordFormProps {
  onSubmit: FormProps["onSubmit"]
  defaultValues?: ResetPasswordForm
}

export const useResetPasswordForm = ({
  onSubmit,
  defaultValues = DEFAULT_VALUES,
}: ResetPasswordFormProps) => {
  return useForm({
    defaultValues,
    onSubmit,
    schema: y.object().shape({
      password: y.string().required(),
      repeatPassword: y
        .string()
        .oneOf([y.ref("password")], t("validations.password.match"))
        .required(),
    }),
  })
}
