const DIGITS_LENGTH = 2

export const formatNumberToCurrency = (value?: number) => {
  if (value || value === 0) {
    const digits = value % 1 != 0 ? DIGITS_LENGTH : 0

    return value.toLocaleString(undefined, {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    })
  }

  return ""
}
