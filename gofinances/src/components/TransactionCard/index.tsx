import React from 'react'
import {Feather} from '@expo/vector-icons'

import {
  Container,
  Title,
  Amount,
  Footer,
  CategoryProps,
  Icon,
  CategoryName,
  Date,
} from './styles'

interface CategoryProps {
  name: string
  icon: React.ComponentProps<typeof Feather>['name']
}

export interface TransactionCardProps {
  type: 'positive' | 'negative'
  title: string
  amount: string
  category: CategoryProps
  date: string
}

interface Props {
  data: TransactionCardProps
}

export function TransactionCard({data}: Props) {
  return (
    <Container>
      <Title>{data.title}</Title>
      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>
      <Footer>
        <CategoryProps>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </CategoryProps>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}
