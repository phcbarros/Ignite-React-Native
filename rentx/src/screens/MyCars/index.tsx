import React, {useEffect, useState} from 'react'
import {StatusBar, Alert, FlatList} from 'react-native'
import {useTheme} from 'styled-components'
import {useNavigation} from '@react-navigation/native'

import {Loading} from '../../components/Loading'
import {BackButton} from '../../components/BackButton'

import {api} from '../../services/api'

import {CarDTO} from '../../dtos/CarDTO'

interface CarProps {
  id: number
  user_id: number
  car: CarDTO
  startDate: string
  endDate: string
}

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
} from './styles'
import {Car} from '../../components/Car'

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true)

  const theme = useTheme()
  const navigation = useNavigation()

  useEffect(() => {
    async function fetchCars() {
      try {
        const {data} = await api.get<CarProps[]>(`schedules_byuser?user_id${1}`)

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
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton
          onPress={() => navigation.goBack()}
          color={theme.colors.shape}
        />

        <Title>
          Seus agendamentos,{'\n'}
          estão aqui.
        </Title>

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>02</AppointmentsQuantity>
        </Appointments>

        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={cars}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => <Car data={item.car} />}
          />
        )}
      </Content>
    </Container>
  )
}
