import {useState} from 'react'
import {StackScreenProps} from '@react-navigation/stack'
import {useTheme} from 'styled-components'
import {StatusBar, Alert} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {format} from 'date-fns'

import {BackButton} from '../../components/BackButton'
import {Button} from '../../components/Button'
import {
  Calendar,
  DayProps,
  MarkedDateProps,
  generateInterval,
} from '../../components/Calendar'

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValueContainer,
  DateValue,
  Content,
  Footer,
} from './styles'

import ArrowSVG from '../../assets/arrow.svg'
import {AppRoutes} from '../../routes/stack.routes'
import {getPlatformDate} from '../../utils/getPlatformDate'

type SchedulingProps = StackScreenProps<AppRoutes, 'Scheduling'>

interface RentalPeriod {
  startFormatted: string
  endFormatted: string
}

export function Scheduling({route}: SchedulingProps) {
  const {car} = route.params
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps,
  )
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps,
  )
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod,
  )

  const theme = useTheme()
  const navigation = useNavigation()

  function handleSchedulingDetails() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert('Selecione o período do aluguel')
      return
    }
    navigation.navigate('SchedulingDetails', {
      car,
      dates: Object.keys(markedDates),
    })
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
    let end = date

    if (start.timestamp > end.timestamp) {
      const aux = start
      start = end
      end = aux
    }

    setLastSelectedDate(end)

    const interval = generateInterval({start, end})
    setMarkedDates(interval)

    const firstDate = Object.keys(interval)[0]
    const lastDate = Object.keys(interval)[Object.keys(interval).length - 1]

    setRentalPeriod({
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        'dd/MM/yyyy',
      ),
      endFormatted: format(getPlatformDate(new Date(lastDate)), 'dd/MM/yyyy'),
    })
  }

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
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValueContainer selected={Boolean(rentalPeriod.startFormatted)}>
              <DateValue>{rentalPeriod.startFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>

          <ArrowSVG />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueContainer selected={Boolean(rentalPeriod.endFormatted)}>
              <DateValue>{rentalPeriod.endFormatted}</DateValue>
            </DateValueContainer>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={handleSchedulingDetails} />
      </Footer>
    </Container>
  )
}
