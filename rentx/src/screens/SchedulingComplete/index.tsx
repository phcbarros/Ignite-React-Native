import {useWindowDimensions} from 'react-native'

import {Container, Content, Title, Message, Footer} from './styles'

import LogoSVG from '../../assets/logo_background_gray.svg'
import DoneSVG from '../../assets/done.svg'

import {ConfirmButton} from '../../components/ConfirmButton'

export function SchedulingComplete() {
  const {width} = useWindowDimensions()
  return (
    <Container>
      <LogoSVG width={width} />

      <Content>
        <DoneSVG width={80} height={80} />
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir{'\n'}
          até a concessionária da RENTX{'\n'}
          pegar o seu automóvel.
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="Ok" onPress={() => {}} />
      </Footer>
    </Container>
  )
}
