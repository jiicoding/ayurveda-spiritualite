/**
 * The root navigator is used to switch between major navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow (which is contained in your PrimaryNavigator) which the user
 * will use once logged in.
 */
import React from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { HomeNavigator, AuthNavigator } from "./primary-navigator"
import { useStores } from "../models"
import { SlideFromRightIOS } from "react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/TransitionPresets"
import { auth } from "../components/base-components/Firebase"
import { observer } from "mobx-react-lite"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * We recommend using MobX-State-Tree store(s) to handle state rather than navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
export type RootParamList = {
  homeStack: undefined
  authStack: undefined
}

const Stack = createStackNavigator<RootParamList>()

const RootStack = observer(function RootStack() {
  const rootStore = useStores()
  // rootStore.firebaseAuth()
  /* */
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = auth.onAuthStateChanged(async (authUser) => {
      try {
        await (authUser ? rootStore.setUser(authUser.uid) : rootStore.setUser(null))
        setIsLoading(false)
        console.log(`Use Effect -> compte trouvé ${authUser.email}`)
      } catch (error) {
        console.log(error)
      }
    })

    // unsubscribe auth listener on unmount
    return unsubscribeAuth
  }, [])
  /* */

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
    >
      {console.log("Load stack navigator")}
      {rootStore.uid2 !== null || rootStore.uid2 !== "1" ? (
        <>
          {console.log("homeStack")}
          <Stack.Screen
            name="homeStack"
            component={HomeNavigator}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          {console.log("authStack")}
          <Stack.Screen
            name="authStack"
            component={AuthNavigator}
            options={{
              headerShown: false,
              title: "Sign in",
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: rootStore.isSignout ? "pop" : "push",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  )
})

export const RootNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  return (
    <NavigationContainer {...props} ref={ref}>
      <RootStack />
    </NavigationContainer>
  )
})

RootNavigator.displayName = "RootNavigator"
