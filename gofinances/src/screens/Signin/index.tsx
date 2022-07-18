import React from 'react'
import {useTheme} from 'styled-components'
import {ActivityIndicator, Alert} from 'react-native'
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

import {SignInSocialButton} from '../../components/SignInSocialButton'
import {useAuth} from '../../context/auth'

export function SignIn() {
  const {signInWithGoogle, signInWithApple} = useAuth()
  const [isLoading, setIsLoading] = React.useState(false)
  const theme = useTheme()

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true)
      return await signInWithGoogle()
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer login com o Google')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true)
      return await signInWithApple()
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível fazer login com a Apple')
    } finally {
      setIsLoading(false)
    }
  }

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
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton
            title="Entrar com Apple"
            svg={AppleSvg}
            onPress={handleSignInWithApple}
          />
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            size="large"
            color={theme.colors.shape}
            style={{marginTop: 18}}
          />
        )}
      </Footer>
    </Container>
  )
}
