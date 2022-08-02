import {BackButton} from '../../components/BackButton'
import {ImageSlider} from '../../components/ImageSlider'

import {Container, Header, CardImage} from './styles'

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CardImage>
        <ImageSlider
          imagesUrl={['https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png']}
        />
      </CardImage>
    </Container>
  )
}
