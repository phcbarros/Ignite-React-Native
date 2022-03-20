import styled from 'styled-components/native'
import {RFValue} from 'react-native-responsive-fontsize'
import {TouchableOpacity} from 'react-native'
import {Feather} from '@expo/vector-icons'

export const Container = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})`
  background-color: ${({theme}) => theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 5px;
`

export const Category = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  padding: 18px;
  color: ${({theme}) => theme.colors.text};
`

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.colors.text};

  padding: 8px;
`
