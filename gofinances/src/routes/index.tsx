import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import AppLoading from 'expo-app-loading'

import {useAuth} from '../context/auth'
import {AppRoutes} from './app.routes'
import {AuthRoutes} from './auth.routes'

export function Routes() {
  const {user, loading} = useAuth()

  return (
    <NavigationContainer>
      {loading ? <AppLoading /> : user.id ? <AppRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
