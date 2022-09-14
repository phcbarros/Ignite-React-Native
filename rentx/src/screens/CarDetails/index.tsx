import {StatusBar, StyleSheet} from 'react-native'
import {StackScreenProps} from '@react-navigation/stack'
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'
import {getStatusBarHeight} from 'react-native-iphone-x-helper'
import {useTheme} from 'styled-components'

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
  const theme = useTheme()

  const scrollY = useSharedValue(0)
  const handleScroll = useAnimatedScrollHandler((event) => {
    console.log(event.contentOffset.y)
    scrollY.value = event.contentOffset.y
  })

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP,
      ),
    }
  })

  const sliderCarStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 150], [1, 0]),
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
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          {backgroundColor: theme.colors.background_secondary},
        ]}>
        <Header>
          <BackButton onPress={() => navigation.goBack()} />
        </Header>

        <Animated.View style={[sliderCarStyleAnimation]}>
          <CardImage>
            <ImageSlider imagesUrl={car.photos} />
          </CardImage>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          padding: 24,
          paddingTop: getStatusBarHeight() + 160,
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
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

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
})
