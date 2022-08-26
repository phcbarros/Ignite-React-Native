import styled from 'styled-components/native'
import {RFValue} from 'react-native-responsive-fontsize'
import {RectButton, RectButtonProps} from 'react-native-gesture-handler'
import {PropsWithChildren} from 'React'

interface ButtonProps extends PropsWithChildren<RectButtonProps> {
  color?: string
  enabled?: boolean
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;

  padding: 20px;
  align-items: center;
  justify-content: center;

  background-color: ${({color}) => color};
  opacity: ${({enabled}) => (enabled ? 1 : 0.5)};
`

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_500};
  color: ${({theme}) => theme.colors.shape};
  font-size: ${RFValue(15)}px;
`
