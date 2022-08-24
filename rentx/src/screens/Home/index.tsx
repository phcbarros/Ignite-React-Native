import React, {useEffect, useState} from 'react'
import {StatusBar} from 'react-native'
import {RFValue} from 'react-native-responsive-fontsize'
import {useNavigation} from '@react-navigation/native'

import Logo from '../../assets/logo.svg'

import {Car} from '../../components/Car'
import {Loading} from '../../components/Loading'

import {api} from '../../services/api'
import {CarDTO} from '../../dtos/CarDTO'

import {Container, Header, HeaderContent, TotalCars, CarList} from './styles'

const car = {
  brand: 'Audi',
  name: 'RS5',
  rent: {
    period: 'Ao dia',
    price: 120,
  },
  thumbnail: 'https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png',
}

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  function handleCarDetails() {
    navigation.navigate('CarDetails')
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
            <Car data={item} onPress={handleCarDetails} />
          )}
        />
      )}
    </Container>
  )
}
