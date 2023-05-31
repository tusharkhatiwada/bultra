import * as y from "yup"

import { UseFormProps, useForm } from "hooks/useForm"

import { useTranslation } from "react-i18next"

type CreateAccountForm = {
  email_address: string
  hashed_password: string
  repeat_password: string
}

const DEFAULT_VALUES: CreateAccountForm = {
  email_address: "",
  hashed_password: "",
  repeat_password: "",
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
      email_address: y.string().email().required(),
      hashed_password: y.string().required(),
      repeat_password: y
        .string()
        .oneOf([y.ref("hashed_password")], t("validations.password.match"))
        .required(),
    }),
  })
}
