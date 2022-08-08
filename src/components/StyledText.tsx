import { StyleSheet } from "react-native"
import { Text, TextProps } from "./Themed"

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, styles.container]} />
}

const styles = StyleSheet.create({
  container: {
    fontFamily: "space-mono",
  },
})
