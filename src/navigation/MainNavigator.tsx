import { Home } from "screens/Main/Home"
import { Icon } from "components/Icon"
import { MainTabParamList } from "../models/Navigation"
import { ProfileNavigator } from "./ProfileNavigator"
import { Referrals } from "screens/Main/Referrals"
import { Routes } from "models/Routes"
import { WalletNavigator } from "./WalletNavigator"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import useColorScheme from "../hooks/useColorScheme"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useTheme } from "native-base"
import { useTranslation } from "react-i18next"
import { TransactionHistory } from "../screens/Main/TransactionHistory"

const BottomTab = createBottomTabNavigator<MainTabParamList>()

export function MainNavigator() {
  const colorScheme = useColorScheme()

  const { colors } = useTheme()
  const { bottom } = useSafeAreaInsets()

  const { t } = useTranslation()

  return (
    <BottomTab.Navigator
      initialRouteName={Routes.main.home}
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "dark" ? colors.white : colors.black,
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 4 + bottom,
          height: 56 + bottom,
        },
      }}
    >
      <BottomTab.Screen
        name={Routes.main.home}
        component={Home}
        options={() => ({
          title: t("home.title"),
          tabBarIcon: ({ color }) => <Icon size="xl" name="home" color={color} />,
        })}
      />
      <BottomTab.Screen
        name={Routes.main.wallet.navigator}
        component={WalletNavigator}
        options={() => ({
          title: t("wallet.title"),
          tabBarIcon: ({ color }) => <Icon size="xl" name="wallet" color={color} />,
        })}
      />
      <BottomTab.Screen
        name={Routes.main.referrals}
        component={Referrals}
        options={() => ({
          title: t("referrals.title"),
          tabBarIcon: ({ color }) => <Icon size="xl" name="user-plus" color={color} />,
        })}
      />
      <BottomTab.Screen
        name={Routes.main.transactionHistory}
        component={TransactionHistory}
        options={() => ({
          title: t("wallet.history.title"),
          tabBarIcon: ({ color }) => <Icon size="xl" name="history" color={color} />,
        })}
      />
      <BottomTab.Screen
        name={Routes.main.profile.navigator}
        component={ProfileNavigator}
        options={() => ({
          title: t("profile.title"),
          tabBarIcon: ({ color }) => <Icon size="xl" name="user-circle" color={color} />,
        })}
      />
    </BottomTab.Navigator>
  )
}
