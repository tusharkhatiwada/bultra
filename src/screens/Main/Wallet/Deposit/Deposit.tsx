import { StyleSheet, View } from "react-native"

import { FC } from "react"
import { Typography } from "components/Typography"

// export type DepositProps = {}

export const Deposit: FC = () => {
  return (
    <View style={styles.container}>
      <Typography size="h3">Deposit</Typography>
      <Typography>This is the Deposit component!</Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
