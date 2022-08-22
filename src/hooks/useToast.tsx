import { useCallback, useMemo } from "react"

import { Toast } from "components/Toast"
import { useToast as useToastNativeBase } from "native-base"

const renderToast = (
  id: string,
  title: string,
  description: string,
  status: "error" | "success" | "warning" | "info",
  onClose: (id: string) => void,
) => <Toast id={id} title={title} description={description} status={status} onClose={onClose} />

export const useToast = () => {
  const toastNativeBase = useToastNativeBase()

  const success = useCallback((title: string, description: string) => {
    return toastNativeBase.show({
      render: ({ id }) =>
        renderToast(id, title, description, "success", (id) => toastNativeBase.close(id)),
    })
  }, [])
  const info = useCallback(
    (title: string, description: string) =>
      toastNativeBase.show({
        render: ({ id }) =>
          renderToast(id, title, description, "info", (id) => toastNativeBase.close(id)),
      }),
    [],
  )
  const warning = useCallback(
    (title: string, description: string) =>
      toastNativeBase.show({
        render: ({ id }) =>
          renderToast(id, title, description, "warning", (id) => toastNativeBase.close(id)),
      }),
    [],
  )
  const error = useCallback(
    (title: string, description: string) =>
      toastNativeBase.show({
        render: ({ id }) =>
          renderToast(id, title, description, "error", (id) => toastNativeBase.close(id)),
      }),
    [],
  )

  const toast = useMemo(
    () => ({
      success,
      info,
      warning,
      error,
      closeAll: toastNativeBase.closeAll(),
    }),
    [],
  )

  return { toast }
}
