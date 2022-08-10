import React, {useEffect, useState, useCallback} from 'react'
import {View} from 'react-native'
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,
} from '@expo-google-fonts/archivo'
import {Inter_400Regular, Inter_500Medium} from '@expo-google-fonts/inter'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import {ThemeProvider} from 'styled-components'

import theme from './src/styles/theme'

import {Home} from './src/screens/Home'
import {CarDetails} from './src/screens/CarDetails'
import {Scheduling} from './src/screens/Scheduling'
import {SchedulingDetails} from './src/screens/SchedulingDetails'

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync()
        await Font.loadAsync({
          Archivo_400Regular,
          Archivo_500Medium,
          Archivo_600SemiBold,
          Inter_400Regular,
          Inter_500Medium,
        })
      } catch (e) {
        console.warn(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare()
  }, [])

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync()
    }
  }, [appIsReady])

  if (!appIsReady) {
    return null
  }

  return (
    <View
      onLayout={onLayoutRootView}
      style={{
        flex: 1,
      }}>
      <ThemeProvider theme={theme}>
        <SchedulingDetails />
      </ThemeProvider>
    </View>
  )
}
