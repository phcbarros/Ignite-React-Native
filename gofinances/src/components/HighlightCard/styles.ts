import styled from 'styled-components/native'
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize'
import {Feather} from '@expo/vector-icons'

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.shape};
  border-radius: 5px;
  padding: ${RFValue(19)}px ${RFValue(23)}px;
  padding-bottom: ${RFValue(42)}px;
  width: ${RFValue(300)}px;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.title};
`

export const Icon = styled(Feather)`
  color: ${({theme}) => theme.colors.success};
  font-size: ${RFValue(33)}px;
`

export const Footer = styled.View``

export const Amount = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(32)}px;
  color: ${({theme}) => theme.colors.title};
`

export const LastTransaction = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({theme}) => theme.colors.text};
`
