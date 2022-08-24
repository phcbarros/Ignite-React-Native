import {useState} from 'react'
import {StackScreenProps} from '@react-navigation/stack'
import {useTheme} from 'styled-components'
import {StatusBar} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import {BackButton} from '../../components/BackButton'
import {Button} from '../../components/Button'

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
import {
  Calendar,
  DayProps,
  MarkedDateProps,
  generateInterval,
} from '../../components/Calendar'
import {AppRoutes} from '../../routes/stack.routes'

type SchedulingProps = StackScreenProps<AppRoutes, 'Scheduling'>

export function Scheduling({route}: SchedulingProps) {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps,
  )
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps,
  )

  const theme = useTheme()
  const navigation = useNavigation()

  function handleSchedulingDetails() {
    navigation.navigate('SchedulingDetails')
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
            <DateValueContainer selected={false}>
              <DateValue></DateValue>
            </DateValueContainer>
          </DateInfo>

          <ArrowSVG />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueContainer selected={false}>
              <DateValue></DateValue>
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
