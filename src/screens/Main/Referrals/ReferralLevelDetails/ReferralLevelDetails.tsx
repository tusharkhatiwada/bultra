import { ScrollView, StyleSheet, View } from "react-native"

import { FC, useEffect } from "react"
import { Typography } from "components/Typography"
import { ReferralsStackScreenProps } from "../../../../models/Navigation"
import { Routes } from "../../../../models/Routes"
import { Header } from "../../../../components/Header"

export type ReferralsProps = ReferralsStackScreenProps<typeof Routes.main.referrals.levelDetails>

export const ReferralLevelDetails: FC<ReferralsProps> = ({ navigation, route }) => {
  const headerTitle = route.params.levelName
  const { level } = route.params

  useEffect(() => {
    navigation.setOptions({
      header: ({ navigation }) => <Header navigation={navigation} canGoBack title={headerTitle} />,
    })
  }, [headerTitle])

  return (
    <ScrollView style={styles.container}>
      <View style={styles.padding}>
        <Typography color="primary.400">
          The color circle is red if the user has a paid investment plan enabled.
        </Typography>
        {level.users.length > 0 &&
          level.users.map((user) => (
            <View style={styles.sumBox} key={user.id}>
              <View style={styles.sumContainer}>
                <Typography>{user.email}</Typography>
                <View
                  style={[
                    styles.userStatusDot,
                    // eslint-disable-next-line react-native/no-color-literals,react-native/no-inline-styles
                    { backgroundColor: user.statusPlan ? "#35AF83" : "#FF0000" },
                  ]}
                />
              </View>
            </View>
          ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sumBox: {
    marginTop: 20,
  },
  // eslint-disable-next-line react-native/no-color-literals
  userStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 50,
    marginRight: 8,
  },
  sumContainer: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#E4E4E7",
    borderBottomWidth: 1,
    paddingBottom: 12,
  },
  padding: {
    padding: 24,
  },
})
