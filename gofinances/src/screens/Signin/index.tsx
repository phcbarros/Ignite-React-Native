import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SigninTitle,
  Footer,
} from './styles'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import {RFValue} from 'react-native-responsive-fontsize'

export function Signin() {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
        </TitleWrapper>

        <Title>
          Controle suas {'\n'}finanças de forma {'\n'}muita simples
        </Title>

        <SigninTitle>
          Faça seu login com {'\n'}uma das contas abaixo
        </SigninTitle>
      </Header>

      <Footer />
    </Container>
  )
}
