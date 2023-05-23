import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Routes } from "models/Routes"
import { Trading } from "screens/Main/Trading/Trading"
import { TradingStackParamList } from "../models/Navigation"
import { Header } from "components/Header"
import { useTranslation } from "react-i18next"

const Stack = createNativeStackNavigator<TradingStackParamList>()

export function TradingNavigator() {
  const { t } = useTranslation()
  return (
    <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen
        name={Routes.main.trading.tradingDetails}
        component={Trading}
        options={{
          header: ({ navigation }) => (
            <Header canGoBack navigation={navigation} title={t("startTrading.title")} />
          ),
        }}
      />
    </Stack.Navigator>
  )
}
