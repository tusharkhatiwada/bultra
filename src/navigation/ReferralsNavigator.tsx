import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTranslation } from "react-i18next"

import { Header } from "components/Header"
import { Routes } from "models/Routes"
import { ReferralsStackParamList } from "../models/Navigation"
import { Referrals } from "../screens/Main/Referrals"
import { ReferralLevelDetails } from "../screens/Main/Referrals/ReferralLevelDetails"

const Stack = createNativeStackNavigator<ReferralsStackParamList>()

export function ReferralsNavigator() {
  const { t } = useTranslation()

  return (
    <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen
        name={Routes.main.referrals.information}
        component={Referrals}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.main.referrals.levelDetails}
        component={ReferralLevelDetails}
        options={{
          header: ({ navigation }) => (
            <Header canGoBack navigation={navigation} title={t("referrals.title")} />
          ),
        }}
      />
    </Stack.Navigator>
  )
}
