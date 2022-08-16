import { StyleSheet, View } from "react-native"

import { RootView } from "components/RootView"
import { Typography } from "components/Typography"

/**
 * TODO: Remove this screen
 * @deprecated
 */
export default function TabTwoScreen() {
  return (
    <RootView style={styles.container}>
      <Typography size="h1">Tab Two</Typography>
      <View style={styles.separator} />

      <View>
        <Typography size="h1">Typography h1</Typography>
        <Typography size="h2">Typography h2</Typography>
        <Typography size="h3">Typography h3</Typography>
        <Typography size="headline">Typography headline</Typography>
        <Typography size="body">Typography body</Typography>
        <Typography size="small">Typography small</Typography>
        <Typography size="mini">Typography mini</Typography>
      </View>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
})
