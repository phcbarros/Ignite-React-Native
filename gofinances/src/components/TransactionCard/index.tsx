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
import {categories} from '../../utils/categories'

// export interface CategoryProps {
//   name: string
//   icon: React.ComponentProps<typeof Feather>['name']
// }

export interface TransactionCardProps {
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}
interface Props {
  data: TransactionCardProps
}

export function TransactionCard({data}: Props) {
  const [category] = categories.filter((item) => item.key === data.category)
  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === 'negative' && '- '}
        {data.amount}
      </Amount>
      <Footer>
        <CategoryProps>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </CategoryProps>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}
