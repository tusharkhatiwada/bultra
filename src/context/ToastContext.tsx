import { FC, createContext, useCallback, useContext, useMemo, useState } from "react"

import { Toast } from "components/Toast"
import { ToastProps } from "components/Toast/Toast"

type ToastContextProps = {
  showToast: (toast: ToastProps) => void
}

const ToastContext = createContext({} as ToastContextProps)

export const ToastProvider: FC = ({ children }) => {
  const [toast, setToast] = useState<ToastProps | null>(null)

  const showToast = useCallback(
    (toast: ToastProps) => {
      setToast(toast)
    },
    [setToast],
  )

  const closeToast = () => setToast(null)

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && <Toast {...toast} onClose={closeToast} />}
    </ToastContext.Provider>
  )
}

export const useToastContext = () => {
  const context = useContext(ToastContext)

  if (context == null) {
    throw new Error("useToastContext must be used within an ToastProvider")
  }

  return context
}
