---
to: "<%= files.includes('styles') ? null : `src/${path}/${h.changeCase.pascal(name)}/${h.changeCase.pascal(name)}.tsx` %>"
---
import { FC } from "react"
import { Text, View } from "react-native"

export type <%= h.changeCase.pascal(name) %>Props = {}

export const <%= h.changeCase.pascal(name) %>: FC<<%= h.changeCase.pascal(name) %>Props> = (_props) => {
  return (
    <View>
      <Text><%= h.changeCase.pascal(name) %></Text>
      <Text>This is the <%= h.changeCase.pascal(name) %> component!</Text>
    </View>
  )
}
