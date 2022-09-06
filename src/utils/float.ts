import * as Localization from "expo-localization"

export const parseFloatWithLocale = (value: string) => {
  const separationToken = Localization.digitGroupingSeparator
  const decimalToken = Localization.decimalSeparator

  return parseFloat(value.replaceAll(separationToken, "").replaceAll(decimalToken, "."))
}
