import { StyleSheet, TouchableOpacity, View } from "react-native"

import { RootStackScreenProps } from "../models/Navigation"
import { Routes } from "models/Routes"
import { Text } from "native-base"

export default function NotFoundScreen({ navigation }: RootStackScreenProps<"NotFound">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>This screen doesnt exist.</Text>
      <TouchableOpacity
        onPress={() => navigation.replace(Routes.main.navigator)}
        style={styles.link}
      >
        <Text style={styles.linkText}>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
  },
})
