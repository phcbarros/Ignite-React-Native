import React, {useEffect, useState} from 'react'
import {StatusBar, Alert, FlatList} from 'react-native'
import {useTheme} from 'styled-components'
import {useNavigation} from '@react-navigation/native'
import {AntDesign} from '@expo/vector-icons'
import {format} from 'date-fns'

import {BackButton} from '../../components/BackButton'
import {Car} from '../../components/Car'
import {Loading} from '../../components/Loading'

import {api} from '../../services/api'
import {getPlatformDate} from '../../utils/getPlatformDate'

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
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles'

export function MyCars() {
  const [cars, setCars] = useState<CarProps[]>([])
  const [loading, setLoading] = useState(true)

  const theme = useTheme()
  const navigation = useNavigation()

  useEffect(() => {
    async function fetchCars() {
      try {
        const {data} = await api.get<CarProps[]>(
          `schedules_byuser?user_id=${1}`,
        )

        setCars(data)
      } catch (error) {
        console.error(error)
        Alert.alert('Não foi possível recuperar os seus agendamentos')
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
          <AppointmentsQuantity>{cars.length}</AppointmentsQuantity>
        </Appointments>

        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={cars}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <CarWrapper>
                <Car data={item.car} />
                <CarFooter>
                  <CarFooterTitle>Período</CarFooterTitle>
                  <CarFooterPeriod>
                    <CarFooterDate> {formatDate(item.startDate)}</CarFooterDate>
                    <AntDesign
                      name="arrowright"
                      size={20}
                      color={theme.colors.title}
                      style={{marginHorizontal: 10}}
                    />
                    <CarFooterDate>{formatDate(item.endDate)}</CarFooterDate>
                  </CarFooterPeriod>
                </CarFooter>
              </CarWrapper>
            )}
          />
        )}
      </Content>
    </Container>
  )
}

function formatDate(date: string) {
  return format(getPlatformDate(new Date(date)), 'dd/MM/yyyy')
}
