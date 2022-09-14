import styled from 'styled-components/native'
import {RFValue} from 'react-native-responsive-fontsize'
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper'

export const Container = styled.View`
  flex: 1;

  background-color: ${({theme}) => theme.colors.background_secondary};
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  position: absolute;
  margin-top: ${getStatusBarHeight() + 18}px;
  margin-left: 24px;
`

export const CardImage = styled.View`
  margin-top: ${getStatusBarHeight() + 32}px;
`

export const Details = styled.View`
  width: 100%;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 40px;
`

export const Description = styled.View``

export const Brand = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.text_detail};
  font-size: ${RFValue(10)}px;

  text-transform: uppercase;
`

export const Name = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_500};
  color: ${({theme}) => theme.colors.title};
  font-size: ${RFValue(25)}px;
`

export const Rent = styled.View``

export const Period = styled(Brand)``

export const Price = styled(Name)`
  color: ${({theme}) => theme.colors.main};
`

export const About = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_400};
  color: ${({theme}) => theme.colors.text};
  font-size: ${RFValue(15)}px;
  text-align: justify;
  line-height: ${RFValue(25)}px;

  margin-top: 24px;
`

export const Accessories = styled.View`
  width: 100%;

  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  margin-top: 16px;
`

// Boa prática
export const Footer = styled.View`
  width: 100%;

  background-color: ${({theme}) => theme.colors.background_secondary};

  padding: 24px 24px ${getBottomSpace() + 24}px;
`
