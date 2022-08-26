import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {Splash} from '../screens/Splash'
import {Home} from '../screens/Home'
import {CarDetails} from '../screens/CarDetails'
import {Scheduling} from '../screens/Scheduling'
import {SchedulingDetails} from '../screens/SchedulingDetails'
import {SchedulingComplete} from '../screens/SchedulingComplete'
import {MyCars} from '../screens/MyCars'

import {CarDTO} from '../dtos/CarDTO'

export type AppRoutes = {
  Splash: undefined
  Home: undefined
  CarDetails: {car: CarDTO}
  Scheduling: {car: CarDTO}
  SchedulingDetails: {car: CarDTO; dates: string[]}
  SchedulingComplete: undefined
  MyCars: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRoutes {}
  }
}

const {Navigator, Screen} = createStackNavigator<AppRoutes>()

export function StackRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}} initialRouteName="Splash">
      <Screen name="Splash" component={Splash} />
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  )
}
