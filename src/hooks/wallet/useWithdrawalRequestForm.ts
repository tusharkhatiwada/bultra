import * as y from "yup"

import { UseFormProps, useForm } from "hooks/useForm"

// import { useTranslation } from "react-i18next"

type WithdrawalRequestValues = {
  network: string
  walletAddress: string
  token: string
  amount: string
}

const DEFAULT_VALUES: WithdrawalRequestValues = {
  network: "",
  walletAddress: "",
  token: "",
  amount: "",
}

type FormProps = UseFormProps<WithdrawalRequestValues>

export interface WithdrawalRequestProps {
  onSubmit: FormProps["onSubmit"]
  defaultValues?: WithdrawalRequestValues
}

export const useWithdrawalRequestForm = ({
  onSubmit,
  defaultValues = DEFAULT_VALUES,
}: WithdrawalRequestProps) => {
  // const patternTwoDigisAfterComma = /^(\d+(?:[.,]\d{2})?)$/
  // const { t } = useTranslation()

  return useForm({
    defaultValues,
    onSubmit,
    schema: y.object().shape({
      network: y.string().required(),
      token: y.string().required(),
      walletAddress: y.string().required(),
      amount: y
        .string()
        // .test("is-decimal", t("common.numberInput.2decimals"), (val) => {
        //   if (val != undefined) {
        //     return patternTwoDigisAfterComma.test(val)
        //   }
        //   return true
        // })
        .required(),
    }),
  })
}
