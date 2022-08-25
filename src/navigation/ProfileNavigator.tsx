import { ChangePassword } from "screens/Main/Profile/ChangePassword"
import { Header } from "components/Header"
import { Logout } from "screens/Main/Profile/Logout"
import { Profile } from "screens/Main/Profile"
import { ProfileStackParamList } from "../models/Navigation"
import { Routes } from "models/Routes"
import { Support } from "screens/Main/Profile/Support"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTranslation } from "react-i18next"

const Stack = createNativeStackNavigator<ProfileStackParamList>()

export function ProfileNavigator() {
  const { t } = useTranslation()

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={Routes.main.profile.userProfile}
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.main.profile.support}
        component={Support}
        options={{
          header: ({ navigation }) => (
            <Header canGoBack navigation={navigation} title={"Support"} />
          ),
        }}
      />
      <Stack.Screen
        name={Routes.main.profile.changePassword}
        component={ChangePassword}
        options={{
          header: ({ navigation }) => (
            <Header canGoBack navigation={navigation} title={"Change Password"} />
          ),
        }}
      />
      <Stack.Screen
        name={Routes.main.profile.logout}
        component={Logout}
        options={{
          header: ({ navigation }) => (
            <Header canGoBack navigation={navigation} title={t("profile.logout.title")} />
          ),
        }}
      />
    </Stack.Navigator>
  )
}