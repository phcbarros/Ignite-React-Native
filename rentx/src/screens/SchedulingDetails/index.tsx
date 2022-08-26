import {useEffect, useState} from 'react'
import {RFValue} from 'react-native-responsive-fontsize'
import {Feather} from '@expo/vector-icons'
import {useTheme} from 'styled-components'
import {useNavigation} from '@react-navigation/native'
import {StackScreenProps} from '@react-navigation/stack'
import {Alert} from 'react-native'
import {format} from 'date-fns'

import {BackButton} from '../../components/BackButton'
import {ImageSlider} from '../../components/ImageSlider'
import {Accessory} from '../../components/Accessory'
import {Button} from '../../components/Button'

import {getAccessoryIcon} from '../../utils/getAccessory'
import {getPlatformDate} from '../../utils/getPlatformDate'

import {api} from '../../services/api'
import {AppRoutes} from '../../routes/stack.routes'

import {
  Container,
  Header,
  CardImage,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal,
  Footer,
} from './styles'

type SchedulingDetailsProps = StackScreenProps<AppRoutes, 'SchedulingDetails'>

interface RentalPeriod {
  startFormatted: string
  endFormatted: string
}

export function SchedulingDetails({route}: SchedulingDetailsProps) {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod,
  )
  const [loading, setLoading] = useState(false)

  const {car, dates} = route.params
  const theme = useTheme()
  const navigation = useNavigation()

  async function handleSchedulingComplete() {
    try {
      setLoading(true)
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`)
      const unavailableDates = [
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      ]

      await api.post('/schedules_byuser', {
        user_id: 1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), 'yyyy-MM-dd'),
        endDate: format(
          getPlatformDate(new Date(dates[dates.length - 1])),
          'yyyy-MM-dd',
        ),
      })

      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates: unavailableDates,
      })

      navigation.navigate('SchedulingComplete')
    } catch (error) {
      console.error(error)
      Alert.alert('Não foi possível efetuar o agendamento')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endFormatted: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        'dd/MM/yyyy',
      ),
    })
  }, [])

  const totalRent = car.rent.price * Number(dates.length)

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>

      <CardImage>
        <ImageSlider imagesUrl={car.photos} />
      </CardImage>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.shape}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              R$ {car.rent.price} x{dates.length} diárias
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {totalRent}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          onPress={handleSchedulingComplete}
          color={theme.colors.success}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  )
}
