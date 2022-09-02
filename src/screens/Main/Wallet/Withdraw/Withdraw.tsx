import { StyleSheet, View } from "react-native"

import { FC } from "react"
import { Typography } from "components/Typography"

// export type WithdrawProps = {}

export const Withdraw: FC = () => {
  return (
    <View style={styles.container}>
      <Typography size="h3">Withdraw</Typography>
      <Typography>This is the Withdraw component!</Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
