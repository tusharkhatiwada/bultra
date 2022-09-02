import { Button } from "components/Button"
import { FC } from "react"
import { RootView } from "components/RootView"
import { Routes } from "models/Routes"
import { StyleSheet } from "react-native"
import { WalletStackScreenProps } from "models/Navigation"

export type WithdrawProps = WalletStackScreenProps<typeof Routes.main.wallet.withdraw>

export const Withdraw: FC<WithdrawProps> = ({ navigation }) => {
  const goToKYCForm = () => {
    // @ts-ignore
    navigation.navigate(Routes.auth.navigator, { screen: Routes.auth.kyc })
  }

  return (
    <RootView style={styles.container}>
      <Button onPress={goToKYCForm}>Go to KYC form</Button>
    </RootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
})
