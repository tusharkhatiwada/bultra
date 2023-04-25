import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTranslation } from "react-i18next"

import { InvestDeposit } from "../screens/Main/Invest/InvestDeposit"
import { Header } from "components/Header"
import { Routes } from "models/Routes"
import { InvestStackParamList } from "../models/Navigation"
import { Invest } from "../screens/Main/Invest"
import { Refund } from "../screens/Main/Invest/Refund"

const Stack = createNativeStackNavigator<InvestStackParamList>()

export function InvestNavigator() {
  const { t } = useTranslation()

  return (
    <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen
        name={Routes.main.invest.walletDetails}
        component={Invest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.main.invest.deposit}
        component={InvestDeposit}
        options={{
          header: ({ navigation }) => (
            <Header canGoBack navigation={navigation} title={t("invest.title")} />
          ),
        }}
      />
      <Stack.Screen
        name={Routes.main.invest.refund}
        component={Refund}
        options={{
          header: ({ navigation }) => (
            <Header canGoBack navigation={navigation} title={t("invest.refund")} />
          ),
        }}
      />
      {/*<Stack.Screen*/}
      {/*  name={Routes.main.invest.qr_scanner}*/}
      {/*  component={QrScanner}*/}
      {/*  options={{*/}
      {/*    header: ({ navigation }) => (*/}
      {/*      <Header canGoBack navigation={navigation} title={t("wallet.withdraw.title")} />*/}
      {/*    ),*/}
      {/*  }}*/}
      {/*/>*/}
    </Stack.Navigator>
  )
}
