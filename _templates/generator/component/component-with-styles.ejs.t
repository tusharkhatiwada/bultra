---
to: "<%= files.includes('styles') ? `src/${path}/${h.changeCase.pascal(name)}/${h.changeCase.pascal(name)}.tsx` : null %>"
---
import { FC } from 'react'
import { Text, View, StyleSheet } from "react-native"

export type <%= h.changeCase.pascal(name) %>Props = {}

export const <%= h.changeCase.pascal(name) %>: FC<<%= h.changeCase.pascal(name) %>Props> = (_props) => {
  return (
    <View style={styles.container}>
      <Text><%= h.changeCase.pascal(name) %></Text>
      <Text>This is the <%= h.changeCase.pascal(name) %> component!</Text>
    </View>    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})