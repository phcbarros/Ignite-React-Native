import styled from 'styled-components/native'
import {RFValue} from 'react-native-responsive-fontsize'
import {Feather} from '@expo/vector-icons'
import {GestureHandlerRootView, RectButton} from 'react-native-gesture-handler'
interface CategoryProps {
  isActive: boolean
}

// garante que o botão irá funcionar no modal em Android
export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(113)}px;
  background-color: ${({theme}) => theme.colors.primary};

  justify-content: flex-end;
  align-items: center;

  padding-bottom: 18px;
`

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;

  color: ${({theme}) => theme.colors.shape};
`

export const Category = styled(RectButton)<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({theme, isActive}) =>
    isActive ? theme.colors.secondaryLight : theme.colors.background};
`

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;

  margin-right: 16px;
`

export const CategoryName = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`

export const Separator = styled.View`
  width: 100%;
  height: 1px;

  background-color: ${({theme}) => theme.colors.text};
`

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`
