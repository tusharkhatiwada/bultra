import * as Localization from "expo-localization"

export const parseFloatWithLocale = (value: string) => {
  const separationToken = `/${Localization.digitGroupingSeparator}/`
  const decimalToken = `/${Localization.decimalSeparator}/`

  const separationTokenRegExp = new RegExp(separationToken, "g")
  const decimalTokenRegExp = new RegExp(decimalToken, "g")

  return parseFloat(value.replace(separationTokenRegExp, "").replace(decimalTokenRegExp, "."))
}
