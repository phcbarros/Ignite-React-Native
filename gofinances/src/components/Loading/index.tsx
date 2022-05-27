import React from 'react'
import {ActivityIndicator} from 'react-native'
import {useTheme} from 'styled-components'

import {LoadingContainer} from './styles'

export function Loading() {
  const theme = useTheme()
  return (
    <LoadingContainer>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </LoadingContainer>
  )
}
