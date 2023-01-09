import { AuthStackParamList } from "../models/Navigation"
import { CreateAccount } from "screens/Auth/CreateAccount"
import { DocumentPhoto } from "screens/Auth/DocumentPhoto"
import { ForgotPassword } from "screens/Auth/ForgotPassword"
import { Header } from "components/Header"
import { KYC } from "screens/Auth/KYC"
import { Login } from "screens/Auth/Login"
import { Plans } from "screens/Auth/Plans"
import { ResetPassword } from "screens/Auth/ResetPassword"
import { Routes } from "models/Routes"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { useTranslation } from "react-i18next"
import { Otp } from "../screens/Auth/OTP/Otp"

const Stack = createNativeStackNavigator<AuthStackParamList>()

export function AuthNavigator() {
  const { t } = useTranslation()

  return (
    <Stack.Navigator screenOptions={{ animation: "slide_from_right" }}>
      <Stack.Screen
        name={Routes.auth.login}
        component={Login}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} canGoBack title={t("login.title")} />
          ),
        }}
      />
      <Stack.Screen
        name={Routes.auth.otp}
        component={Otp}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} canGoBack title={t("login.form.otp.label")} />
          ),
        }}
      />
      <Stack.Screen
        name={Routes.auth.forgot_password}
        component={ForgotPassword}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} canGoBack title={t("forgotPassword.title")} />
          ),
        }}
      />
      <Stack.Screen
        name={Routes.auth.reset_password}
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={Routes.auth.create_account}
        component={CreateAccount}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} canGoBack title={t("createAccount.title")} />
          ),
        }}
      />
      <Stack.Screen
        name={Routes.auth.kyc}
        component={KYC}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} canGoBack title={t("wallet.kyc.title")} />
          ),
        }}
      />
      <Stack.Screen
        name={Routes.auth.document_photo}
        component={DocumentPhoto}
        options={{
          header: ({ navigation }) => (
            <Header navigation={navigation} canGoBack title={t("wallet.kyc.documentPhoto.title")} />
          ),
        }}
      />
      <Stack.Screen
        name={Routes.auth.plans}
        component={Plans}
        options={{
          header: ({ navigation }) => (
            <Header canGoBack navigation={navigation} title={t("plans.title")} />
          ),
        }}
      />
    </Stack.Navigator>
  )
}
