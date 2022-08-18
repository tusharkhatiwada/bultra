import { FormikConfig, useFormik } from "formik"
import { get, isObject } from "lodash"

import { AnyObjectSchema } from "yup"
import { Path } from "types/Path"
import { useTranslation } from "react-i18next"

type ExternalErrors<Keys> = { field: Keys; message: string }[]

export const FieldStatusList = ["success", "warning", "info", "error"] as const

export type FieldStatusTypes = typeof FieldStatusList[number]

export interface UseFormProps<Values> {
  defaultValues: FormikConfig<Values>["initialValues"]
  onSubmit: FormikConfig<Values>["onSubmit"]
  schema: AnyObjectSchema
}

export function useForm<Values>({ onSubmit, schema, defaultValues }: UseFormProps<Values>) {
  const { t } = useTranslation()

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
    setFieldError,
    touched,
    ...rest
  } = useFormik<Values>({
    initialValues: defaultValues,
    onSubmit,
    validationSchema: schema,
  })

  const setServerErrors = (errors: ExternalErrors<Path<Values>>) => {
    for (const error of errors) {
      setFieldError(error.field, error.message)
    }
  }

  const getErrorProps = (path: string) => {
    let message = get(errors, path)
    const hasError = Boolean(message)
    const isTouched = Boolean(get(touched, path))
    const showError = hasError && isTouched

    // TODO: Hanlde translations
    if (isObject(message)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message = t((message as any).key, (message as any).attrs)
    }

    return {
      ...(showError && { status: "error" as FieldStatusTypes }),
      ...(showError && message ? { message } : {}),
    }
  }

  const _registerTextField = (path: Path<Values>) => ({
    name: path,
    value: get(values, path),
    onChangeText: handleChange(path),
    onBlur: handleBlur(path),
    ...getErrorProps(path),
  })

  return {
    ...rest,
    values,
    handleSubmit,
    getTextFieldProps: _registerTextField,
    errors,
    setError: setFieldError,
    setServerErrors,
    setValue: setFieldValue,
    setValues,
    touched,
  }
}
