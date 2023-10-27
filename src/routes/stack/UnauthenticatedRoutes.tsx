import { RoutesNavigationType } from '../../interfaces/Unauthenticated.interface'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Access from '../../screens/UnauthenticatedeScreens.tsx/Access'
import SignIn from '../../screens/UnauthenticatedeScreens.tsx/SignIn'
import SignUp from '../../screens/UnauthenticatedeScreens.tsx/SignUp'

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
