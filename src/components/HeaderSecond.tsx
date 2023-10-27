import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Typography from './Typography'
import Button from './Button'
import { useNavigation } from '@react-navigation/native'
import {
  AutheticatedRoutesNavigationProps,
  RoutesNavigationType,
} from '../interfaces/Authenticated.interface'

export default function HeaderSecond() {
  const navigation = useNavigation<AutheticatedRoutesNavigationProps>()

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
      }}
    >
      <Typography
        text="New Rivals"
        size={23}
        color="#000"
        style={{ fontWeight: 'bold' }}
      />
      <Button
        onPress={() =>
          navigation.navigate(RoutesNavigationType.NewRivalsScreen)
        }
      >
        <Icon name="ios-grid" size={24} color="#29464a" />
      </Button>
    </View>
  )
}
