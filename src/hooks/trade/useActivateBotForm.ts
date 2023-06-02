import * as y from "yup"

import { UseFormProps, useForm } from "hooks/useForm"

import { useTranslation } from "react-i18next"

type ActivateBotForm = {
  key: string
  secret: string
}

const DEFAULT_VALUES: ActivateBotForm = {
  key: "",
  secret: "",
}

type FormProps = UseFormProps<ActivateBotForm>

export interface ActivateBotFormProps {
  onSubmit: FormProps["onSubmit"]
  defaultValues?: ActivateBotForm
}

export const useActivateBotForm = ({
  onSubmit,
  defaultValues = DEFAULT_VALUES,
}: ActivateBotFormProps) => {
  const { t } = useTranslation()
  return useForm({
    defaultValues,
    onSubmit,
    schema: y.object().shape({
      key: y.string().required(),
      secret: y.string().required(),
    }),
  })
}
