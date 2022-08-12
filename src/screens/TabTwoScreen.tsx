import { StyleSheet } from "react-native"
import { Typography } from "components/Typography"
import { View } from "../components/Themed"

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Typography size="h1">Tab Two</Typography>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View>
        <Typography size="h1">Typography h1</Typography>
        <Typography size="h2">Typography h2</Typography>
        <Typography size="h3">Typography h3</Typography>
        <Typography size="h4">Typography h4</Typography>
        <Typography size="h5">Typography h5</Typography>
        <Typography size="h6">Typography h6</Typography>
        <Typography size="headline">Typography headline</Typography>
        <Typography size="body">Typography body</Typography>
        <Typography size="small">Typography small</Typography>
        <Typography size="mini">Typography mini</Typography>
      </View>
    </View>
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
