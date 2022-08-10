import {useTheme} from 'styled-components'

import {Container, Title} from './styles'

interface Props {
  title: string
  color?: string
  onPress: () => void
}

export function ConfirmButton({title, color, onPress, ...rest}: Props) {
  const theme = useTheme()

  return (
    <Container {...rest} color={color} onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  )
}
