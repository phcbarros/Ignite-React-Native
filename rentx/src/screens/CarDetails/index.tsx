import {StackScreenProps} from '@react-navigation/stack'

import {BackButton} from '../../components/BackButton'
import {ImageSlider} from '../../components/ImageSlider'
import {Accessory} from '../../components/Accessory'
import {Button} from '../../components/Button'

import {AppRoutes} from '../../routes/stack.routes'
import {CarDTO} from '../../dtos/CarDTO'

import {getAccessoryIcon} from '../../utils/getAccessory'

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

type CarDetailProps = StackScreenProps<AppRoutes, 'CarDetails'>

export function CarDetails({route, navigation}: CarDetailProps) {
  const {car} = route.params

  function handleConfirmRental(car: CarDTO) {
    navigation.navigate('Scheduling', {car})
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
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <About>{car.about}</About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={() => handleConfirmRental(car)}
        />
      </Footer>
    </Container>
  )
}
