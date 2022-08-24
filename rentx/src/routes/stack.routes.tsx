import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {Home} from '../screens/Home'
import {CarDetails} from '../screens/CarDetails'
import {Scheduling} from '../screens/Scheduling'
import {SchedulingDetails} from '../screens/SchedulingDetails'
import {SchedulingComplete} from '../screens/SchedulingComplete'

export type AppRoutes = {
  Home: undefined
  CarDetails: undefined
  Scheduling: undefined
  SchedulingDetails: undefined
  SchedulingComplete: undefined
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRoutes {}
  }
}

const {Navigator, Screen} = createStackNavigator<AppRoutes>()

export function StackRoutes() {
  return (
    <Navigator screenOptions={{headerShown: false}} initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
    </Navigator>
  )
}
