import styled, {css} from 'styled-components/native'
import {RFValue} from 'react-native-responsive-fontsize'
import {getStatusBarHeight} from 'react-native-iphone-x-helper'

export const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.header};

  padding-top: 96px;
`
export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  font-family: ${({theme}) => theme.fonts.secondary_600};
  font-size: ${RFValue(30)}px;
  color: ${({theme}) => theme.colors.shape};

  margin-top: 40px;
`

export const Message = styled.Text`
  font-family: ${({theme}) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.colors.text_detail};
  text-align: center;
  line-height: ${RFValue(25)}px;

  margin-top: 20px;
`

export const Footer = styled.View`
  width: 100%;
  align-items: center;

  margin: 80px 0;
`
