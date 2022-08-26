import {RFValue} from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'
import {FlatList, FlatListProps} from 'react-native'
import {RectButton} from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;

  background-color: ${({theme}) => theme.colors.background_primary};
`
