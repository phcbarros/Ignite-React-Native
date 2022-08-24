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
  About,
  Accessories,
  Footer,
} from './styles'

import {AppRoutes} from '../../routes/stack.routes'
import {StackScreenProps} from '@react-navigation/stack'

type CarDetailProps = StackScreenProps<AppRoutes, 'CarDetails'>

export function CarDetails({route}: CarDetailProps) {
  const navigation = useNavigation()
  const {car} = route.params

  console.log(car.accessories)

  function handleConfirmRental() {
    navigation.navigate('Scheduling')
  }

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
              icon={speedSVG}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  )
}
