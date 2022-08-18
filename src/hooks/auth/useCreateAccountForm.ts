import * as y from "yup"

import { UseFormProps, useForm } from "hooks/useForm"

import { useTranslation } from "react-i18next"

type CreateAccountForm = {
  email: string
  referralId: string
  password: string
  repeatPassword: string
}

const DEFAULT_VALUES: CreateAccountForm = {
  email: "",
  referralId: "",
  password: "",
  repeatPassword: "",
}

type FormProps = UseFormProps<CreateAccountForm>

export interface CreateAccountFormProps {
  onSubmit: FormProps["onSubmit"]
  defaultValues?: CreateAccountForm
}

export const useCreateAccountForm = ({
  onSubmit,
  defaultValues = DEFAULT_VALUES,
}: CreateAccountFormProps) => {
  const { t } = useTranslation()

  return useForm({
    defaultValues,
    onSubmit,
    schema: y.object().shape({
      email: y.string().email().required(),
      referralId: y.string(),
      password: y.string().required(),
      repeatPassword: y
        .string()
        .oneOf([y.ref("password")], t("validations.password.match"))
        .required(),
    }),
  })
}
