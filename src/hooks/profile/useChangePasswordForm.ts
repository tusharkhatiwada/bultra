import * as y from "yup"

import { UseFormProps, useForm } from "hooks/useForm"

import { useTranslation } from "react-i18next"

type ChangePasswordForm = {
  oldPassword: string
  newPassword: string
  repeatPassword: string
}

const DEFAULT_VALUES: ChangePasswordForm = {
  oldPassword: "",
  newPassword: "",
  repeatPassword: "",
}

type FormProps = UseFormProps<ChangePasswordForm>

export interface LoginFormProps {
  onSubmit: FormProps["onSubmit"]
  defaultValues?: ChangePasswordForm
}

export const useChangePasswordForm = ({
  onSubmit,
  defaultValues = DEFAULT_VALUES,
}: LoginFormProps) => {
  const { t } = useTranslation()
  return useForm({
    defaultValues,
    onSubmit,
    schema: y.object().shape({
      oldPassword: y.string().required(),
      newPassword: y.string().required(),
      repeatPassword: y
        .string()
        .oneOf([y.ref("newPassword")], t("validations.password.match"))
        .required(),
    }),
  })
}
