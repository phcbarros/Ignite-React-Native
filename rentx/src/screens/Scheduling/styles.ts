import styled, {css} from 'styled-components/native'
import {RFValue} from 'react-native-responsive-fontsize'
import {getStatusBarHeight} from 'react-native-iphone-x-helper'

interface DateValueProps {
  selected?: boolean
}

export const Container = styled.View`
  flex: 1;

  background-color: ${({theme}) => theme.colors.background_secondary};
`

export const Header = styled.View`
  width: 100%;
  height: 325px;

  background-color: ${({theme}) => theme.colors.header};

  justify-content: center;
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 32}px;
`

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;
  line-height: 34px;

  margin-top: 24px;
`

export const RentalPeriod = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: 32px 0;
`

export const DateInfo = styled.View`
  width: 30%;
`

export const DateTitle = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.secondary_500};
  font-size: ${RFValue(10)}px;
  line-height: 11px;
`

export const DateValueContainer = styled.View<DateValueProps>`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  line-height: 18px;

  ${({selected, theme}) =>
    !selected &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${theme.colors.text};
      padding-bottom: 5px;
    `}
`

// Border não funciona em elementos Text no iOS
export const DateValue = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  line-height: 18px;
`

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24,
  },
  showsVerticalScrollIndicator: false,
})``

export const Footer = styled.View`
  padding: 24px;
`
