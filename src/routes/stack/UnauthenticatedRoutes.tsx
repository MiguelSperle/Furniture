import { RoutesNavigationType } from '../../interfaces/Unauthenticated.interface'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Access from '../../screens/UnauthenticatedScreens.tsx/Access'
import SignIn from '../../screens/UnauthenticatedScreens.tsx/SignIn'
import SignUp from '../../screens/UnauthenticatedScreens.tsx/SignUp'

const Stack = createNativeStackNavigator()

export default function UnauthenticatedRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={RoutesNavigationType.AccessScreen}
        component={Access}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={RoutesNavigationType.SignInScreen}
        component={SignIn}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={RoutesNavigationType.SignUpScreen}
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}
