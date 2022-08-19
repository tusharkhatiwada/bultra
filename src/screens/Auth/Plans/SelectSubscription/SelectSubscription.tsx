import { StyleSheet, View } from "react-native"

import { FC } from "react"
import { Typography } from "components/Typography"

// export type SelectSubscriptionProps = {}

export const SelectSubscription: FC = () => {
  return (
    <View style={styles.container}>
      <Typography size="h3">SelectSubscription</Typography>
      <Typography>This is the SelectSubscription component!</Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
