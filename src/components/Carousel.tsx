import { View, Image } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

export default function CarouselComponent() {
  const slides = [
    require('../../assets/fn1.jpg'),
    require('../../assets/fn2.jpg'),
    require('../../assets/fn5.jpg'),
  ]

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Carousel
        style={{ borderRadius: 15 }}
        loop
        autoPlay={true}
        data={slides}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={{
              borderRadius: 15,
              width: '100%',
              height: '100%',
              marginTop: 15,
            }}
            resizeMode="cover"
            alt=""
          />
        )}
        width={380}
        height={230}
      />
    </View>
  )
}
