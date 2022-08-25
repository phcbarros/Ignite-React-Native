import {RFValue} from 'react-native-responsive-fontsize'
import {Feather} from '@expo/vector-icons'
import {useTheme} from 'styled-components'
import {useNavigation} from '@react-navigation/native'

import {BackButton} from '../../components/BackButton'
import {ImageSlider} from '../../components/ImageSlider'
import {Accessory} from '../../components/Accessory'
import {Button} from '../../components/Button'

import speedSVG from '../../assets/speed.svg'
import accelerationSVG from '../../assets/acceleration.svg'
import forceSVG from '../../assets/force.svg'
import gasolineSVG from '../../assets/gasoline.svg'
import exchangeVG from '../../assets/exchange.svg'
import peopleSVG from '../../assets/people.svg'

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

export function SchedulingDetails() {
  const theme = useTheme()
  const navigation = useNavigation()

  function handleSchedulingComplete() {
    navigation.navigate('SchedulingComplete')
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>

      <CardImage>
        <ImageSlider
          imagesUrl={['https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png']}
        />
      </CardImage>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380km/h" icon={speedSVG} />
          <Accessory name="3,2s" icon={accelerationSVG} />
          <Accessory name="800 HP" icon={forceSVG} />
          <Accessory name="Gasolina" icon={gasolineSVG} />
          <Accessory name="Auto" icon={exchangeVG} />
          <Accessory name="2 pessoas" icon={peopleSVG} />
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
            <DateValue>10/10/2022</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.shape}
          />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>10/10/2022</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>R$ 580,00 x3 diárias</RentalPriceQuota>
            <RentalPriceTotal>R$ 2.900,00</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          onPress={handleSchedulingComplete}
          color={theme.colors.success}
        />
      </Footer>
    </Container>
  )
}
