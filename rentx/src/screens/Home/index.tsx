import React, {useEffect, useState} from 'react'
import {StatusBar} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useNavigation} from '@react-navigation/native'
import {Ionicons} from '@expo/vector-icons'
import {useTheme} from 'styled-components'

import Logo from '../../assets/logo.svg'

import {Car} from '../../components/Car'
import {Loading} from '../../components/Loading'

import {api} from '../../services/api'
import {CarDTO} from '../../dtos/CarDTO'

import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarButton,
} from './styles'

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()
  const theme = useTheme()

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', {car})
  }

  async function handleOpenMyCars() {
    navigation.navigate('MyCars')
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const {data} = await api.get<CarDTO[]>('/cars')

        setCars(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCars()
  }, [])

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>

      {loading ? (
        <Loading />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <MyCarButton onPress={handleOpenMyCars}>
        <Ionicons name="ios-car-sport" color={theme.colors.shape} size={32} />
      </MyCarButton>
    </Container>
  )
}
