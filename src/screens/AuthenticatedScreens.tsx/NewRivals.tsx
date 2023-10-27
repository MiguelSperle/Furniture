import { View, SafeAreaView } from 'react-native'
import Typography from '../../components/Typography'
import Button from '../../components/Button'
import Icon from 'react-native-vector-icons/Ionicons'
import ProductsFlatList from '../../components/ProductsFlatList'
import { useNavigation } from '@react-navigation/native'
import { AutheticatedRoutesNavigationProps } from '../../interfaces/Authenticated.interface'

export default function NewRivals() {
  const navigation = useNavigation<AutheticatedRoutesNavigationProps>()

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: '#254346',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            gap: 7,
            height: 45,
            borderRadius: 60,
            marginTop: 20,
            borderWidth: 1,
            marginHorizontal: 20,
          }}
        >
          <Button onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-circle" size={40} color="#fefbff" />
          </Button>

          <Typography
            text="PRODUCTS"
            size={18}
            color="#fff"
            style={{ fontWeight: 'bold' }}
          />
        </View>

        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <ProductsFlatList isColumnFlatItem="isColumnFlatItem" />
        </View>
      </View>
    </SafeAreaView>
  )
}
