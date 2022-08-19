import { StyleSheet, View } from "react-native"

import { FC } from "react"
import { Typography } from "components/Typography"

// export type SelectPlanProps = {}

export const SelectPlan: FC = () => {
  return (
    <View style={styles.container}>
      <Typography size="h3">SelectPlan</Typography>
      <Typography>This is the SelectPlan component!</Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
