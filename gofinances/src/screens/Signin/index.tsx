import React from 'react'
import {RFValue} from 'react-native-responsive-fontsize'

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from './styles'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'

import {SigninSocialButton} from '../../components/SigninSocialButton'

export function SignIn() {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
        </TitleWrapper>

        <Title>
          Controle suas {'\n'}finanças de forma {'\n'}muita simples
        </Title>

        <SignInTitle>
          Faça seu login com {'\n'}uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SigninSocialButton title="Entrar com Google" svg={GoogleSvg} />
          <SigninSocialButton title="Entrar com Apple" svg={AppleSvg} />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}
