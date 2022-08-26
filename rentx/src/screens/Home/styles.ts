import {RFValue} from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import {FlatList, FlatListProps} from 'react-native'
import {RectButton} from 'react-native-gesture-handler'

import {CarDTO} from '../../dtos/CarDTO'

export const Container = styled.View`
  flex: 1;

  background-color: ${({theme}) => theme.colors.background_primary};
`

export const Header = styled.View`
  width: 100%;
  height: 113px;

  background-color: ${({theme}) => theme.colors.header};
  padding: 32px 24px;
  justify-content: flex-end;
`

export const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const TotalCars = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  color: ${({theme}) => theme.colors.text};
`

export const CarList = styled(
  FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>,
).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showVerticalScrollIndicator: false,
})``

export const MyCarButton = styled(RectButton)`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;

  background-color: ${({theme}) => theme.colors.main};
  border-radius: 30px;

  position: absolute;
  bottom: 13px;
  right: 22px;
`
