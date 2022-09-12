import * as Linking from "expo-linking"

import { EventType } from "expo-linking"
import { NavigationProp } from "@react-navigation/native"

export const handleLinkingUrl = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  urlEvent: string | EventType,
) => {
  const url = typeof urlEvent === "string" ? urlEvent : urlEvent.url
  const { path, queryParams } = Linking.parse(url)

  const urlPath = path?.replace("--/", "")

  if (urlPath) {
    const [navigator] = urlPath.split("/")

    // @ts-ignore
    navigation.navigate(navigator, { screen: urlPath, params: queryParams })
  }
}
