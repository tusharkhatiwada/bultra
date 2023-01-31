import { CommonActions, CompositeNavigationProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { AuthStackParamList, RootStackParamList } from "../../models/Navigation"
import { Routes } from "../../models/Routes"
import { useAuthContext } from "../../context/AuthContext"
import { isNil } from "lodash"
import { Plan, PlanTranslationsTypes } from "../../models/Plans"
import { useTranslation } from "react-i18next"

interface Options {
  navigation: CompositeNavigationProp<
    NativeStackNavigationProp<AuthStackParamList, "auth/plans", undefined>,
    // @ts-ignore
    NativeStackNavigationProp<RootStackParamList, string, undefined>
  >
  desiredPlan?: Plan
  step?: number
}
export const useChangePlansNavigationProps = ({ navigation, desiredPlan, step }: Options) => {
  const { isLoggedIn, setSelectedPlan } = useAuthContext()
  const { t } = useTranslation()

  const onBackPress = () => {
    if (isLoggedIn) {
      setSelectedPlan(null)
      navigation.dispatch(
        CommonActions.reset({ index: 0, routes: [{ name: Routes.main.navigator }] }),
      )
    }
  }

  const headerTitle = !isNil(desiredPlan)
    ? t(`plans.selectPlan.${PlanTranslationsTypes[desiredPlan.name]}`)
    : t("plans.selectPlan.title")

  return {
    needToChangeNavOptions: !isNil(desiredPlan) && step === 2,
    onBackPress,
    headerTitle: headerTitle,
  }
}
