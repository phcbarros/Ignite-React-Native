import React from 'react'
import {HistoryCard} from '../../components/HistoryCard'

import {Container, Title, Header} from './styles'

export function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <HistoryCard color="red" title="Casa" amount="1000" />
    </Container>
  )
}
