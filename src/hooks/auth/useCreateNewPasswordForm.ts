import * as y from "yup"

import { UseFormProps, useForm } from "hooks/useForm"

import { useTranslation } from "react-i18next"

type CreateNewPasswordForm = {
  password: string
  repeatPassword: string
}

const DEFAULT_VALUES: CreateNewPasswordForm = {
  password: "",
  repeatPassword: "",
}

type FormProps = UseFormProps<CreateNewPasswordForm>

export interface CreateNewPasswordFormProps {
  onSubmit: FormProps["onSubmit"]
  defaultValues?: CreateNewPasswordForm
}

export const useCreateNewPasswordForm = ({
  onSubmit,
  defaultValues = DEFAULT_VALUES,
}: CreateNewPasswordFormProps) => {
  const { t } = useTranslation()

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
