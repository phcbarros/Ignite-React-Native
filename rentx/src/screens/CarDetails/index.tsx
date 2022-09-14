import {StatusBar} from 'react-native'
import {StackScreenProps} from '@react-navigation/stack'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'

import {BackButton} from '../../components/BackButton'
import {ImageSlider} from '../../components/ImageSlider'
import {Accessory} from '../../components/Accessory'
import {Button} from '../../components/Button'

import {AppRoutes} from '../../routes/stack.routes'
import {CarDTO} from '../../dtos/CarDTO'

import {getAccessoryIcon} from '../../utils/getAccessory'

import {
  Container,
  Header,
  CardImage,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer,
} from './styles'

type CarDetailProps = StackScreenProps<AppRoutes, 'CarDetails'>

export function CarDetails({route, navigation}: CarDetailProps) {
  const {car} = route.params

  const scrollY = useSharedValue(0)
  const handleScroll = useAnimatedScrollHandler((event) => {
    console.log(event.contentOffset.y)
    scrollY.value = event.contentOffset.y
  })

  const headerAnimationStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollY.value, [0, 200], [200, 0], Extrapolate.CLAMP),
    }
  })

  function handleConfirmRental(car: CarDTO) {
    navigation.navigate('Scheduling', {car})
  }

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View style={[headerAnimationStyle]}>
        <Header>
          <BackButton onPress={() => navigation.goBack()} />
        </Header>

        <CardImage>
          <ImageSlider imagesUrl={car.photos} />
        </CardImage>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
        <About>{car.about}</About>
        <About>{car.about}</About>
        <About>{car.about}</About>
        <About>{car.about}</About>
      </Animated.ScrollView>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={() => handleConfirmRental(car)}
        />
      </Footer>
    </Container>
  )
}
