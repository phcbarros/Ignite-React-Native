import {StatusBar} from 'react-native'
import {Button, StyleSheet, Dimensions} from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated'

import {Container} from './styles'

const WIDTH = Dimensions.get('window').width

// useSharedValue compartilha valores entre as animações
// useAnimatedStyle usado para mudar os estilos durante as animações
// withTiming transição da animação durante o tempo

//https://cubic-bezier.com/#.17,.67,.83,.67

export function Splash() {
  const animation = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(animation.value, {
            duration: 500,
            easing: Easing.bezier(0, 1.03, 0, 1.03),
          }),
        },
      ],
    }
  })

  function handleAnimationPosition() {
    animation.value = Math.random() * (WIDTH - 100)
  }

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Animated.View style={[styles.box, animatedStyles]} />

      <Button title="Mover" onPress={handleAnimationPosition} />
    </Container>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
})
