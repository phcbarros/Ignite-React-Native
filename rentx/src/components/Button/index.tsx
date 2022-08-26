import {RectButtonProps} from 'react-native-gesture-handler'
import {ActivityIndicator} from 'react-native'
import {useTheme} from 'styled-components'

import {Container, Title} from './styles'

interface Props extends RectButtonProps {
  title: string
  color?: string
  loading?: boolean
}

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  ...rest
}: Props) {
  const theme = useTheme()

  return (
    <Container
      {...rest}
      enabled={enabled}
      color={color ? color : theme.colors.main}>
      {loading ? (
        <ActivityIndicator color={theme.colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  )
}
