import { useAuthContext } from "../../context/AuthContext"
import { isNil } from "lodash"
import { PlanTypes } from "../../models/Plans"
import { Routes } from "../../models/Routes"
import { CompositeNavigationProp } from "@react-navigation/native"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { MainTabParamList, RootStackParamList } from "../../models/Navigation"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

interface Options {
  navigationProps: CompositeNavigationProp<
    BottomTabNavigationProp<MainTabParamList, "main/home", undefined>,
    // @ts-ignore
    NativeStackNavigationProp<RootStackParamList, string, undefined>
  >
}

export const useCheckNeedGoToPlan = (options: Options) => {
  const { isLoggedIn, selectedPlan, userV2 } = useAuthContext()

  const userPlan =
    !isNil(userV2) && !isNil(userV2.UserPlan) ? userV2.UserPlan.Plan.name : PlanTypes.FREE

  if (isLoggedIn && !isNil(selectedPlan) && selectedPlan.name !== userPlan) {
    options.navigationProps.navigate(Routes.auth.navigator, {
      screen: Routes.auth.plans,
      params: {
        desiredPlan: selectedPlan,
        step: 2,
      },
    })
  }
}
