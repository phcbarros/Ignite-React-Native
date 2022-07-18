import React from 'react'
import {StatusBar} from 'react-native'
import {ThemeProvider} from 'styled-components'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import {NavigationContainer} from '@react-navigation/native'

import {AppRoutes} from './src/routes/app.routes'

import theme from './src/global/styles/theme'

import {Signin} from './src/screens/Signin'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  })

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        {/* <AppRoutes /> */}
        <Signin />
      </NavigationContainer>
    </ThemeProvider>
  )
}
