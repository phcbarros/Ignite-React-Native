import styled from 'styled-components/native'
import {RFValue} from 'react-native-responsive-fontsize'
import {Feather} from '@expo/vector-icons'

export interface TransactionProps {
  type: 'positive' | 'negative'
}

export const Container = styled.View`
  width: 100%;
  border-radius: 5px;
  background-color: ${({theme}) => theme.colors.shape};

  padding: 17px 24px;
  margin-bottom: 16px;
`

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.title};
`

export const Amount = styled.Text<TransactionProps>`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(20)}px;
  color: ${({type, theme}) =>
    type === 'negative' ? theme.colors.attention : theme.colors.success};

  margin-top: 2px;
`

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 19px;
`

export const CategoryProps = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.colors.text};
`

export const CategoryName = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text};
  margin-left: 17px;
`

export const Date = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.colors.text};
`
