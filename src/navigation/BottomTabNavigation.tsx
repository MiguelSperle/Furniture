import { RoutesNavigationType } from '../interfaces/Authenticated.interface'
import Home from '../screens/AuthenticatedScreens.tsx/Home'
import Search from '../screens/AuthenticatedScreens.tsx/Search'
import Profile from '../screens/AuthenticatedScreens.tsx/Profile'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'

const Stack = createBottomTabNavigator()

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
}

export default function BottomTabNavigation() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name={RoutesNavigationType.HomeScreen}
        component={Home}
        options={{
          tabBarIcon: ({ size, focused }) => {
            return (
              <Icon
                name={focused ? 'home' : 'home-outline'}
                size={size}
                color={focused ? '#132626' : 'gray'}
              />
            )
          },
        }}
      />

      <Stack.Screen
        name={RoutesNavigationType.SearchScreen}
        component={Search}
        options={{
          tabBarIcon: ({ size, focused }) => {
            return (
              <Icon
                name="search-sharp"
                size={size}
                color={focused ? '#132626' : 'gray'}
              />
            )
          },
        }}
      />

      <Stack.Screen
        name={RoutesNavigationType.ProfileScreen}
        component={Profile}
        options={{
          tabBarIcon: ({ size, focused }) => {
            return (
              <Icon
                name={focused ? 'person' : 'person-outline'}
                size={size}
                color={focused ? '#132626' : 'gray'}
              />
            )
          },
        }}
      />
    </Stack.Navigator>
  )
}
