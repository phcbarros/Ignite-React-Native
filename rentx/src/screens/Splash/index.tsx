import React, {useEffect} from 'react'
import {StatusBar} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'

import {Container} from './styles'

// useSharedValue compartilha valores entre as animações
// useAnimatedStyle usado para mudar os estilos durante as animações
// withTiming transição da animação durante o tempo
import LogoSVG from '../../assets/logo.svg'
import BrandSVG from '../../assets/brand.svg'

//https://cubic-bezier.com/#.17,.67,.83,.67

export function Splash() {
  const splashAnimation = useSharedValue(0)

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [1, 0]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [0, -50],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }
  })

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 50], [0, 1]),
      transform: [
        {
          translateX: interpolate(
            splashAnimation.value,
            [0, 50],
            [-50, 0],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }
  })

  useEffect(() => {
    splashAnimation.value = withTiming(50, {duration: 1000})
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View style={[brandStyle, {position: 'absolute'}]}>
        <BrandSVG width={90} height={90} />
      </Animated.View>

      <Animated.View style={[logoStyle, {position: 'absolute'}]}>
        <LogoSVG width={180} height={20} />
      </Animated.View>
    </Container>
  )
}
