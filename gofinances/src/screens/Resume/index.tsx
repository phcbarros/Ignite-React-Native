import React, {useEffect, useState} from 'react'

import {Storage} from '../../infrastructure/storage'
import {Transaction, TransactionsType} from '../../types/type'
import {HistoryCard} from '../../components/HistoryCard'

import {categories} from '../../utils/categories'
import {formatCurrency} from '../../utils/formatCurrency'

import {Container, Title, Header, Content} from './styles'

type CaterogyData = {
  key: string
  name: string
  color: string
  total: string
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CaterogyData[]>([])

  async function loadData() {
    const transactions = await Storage.get<Transaction[]>()

    const expensives = transactions.filter(
      (transaction) => transaction.type === TransactionsType.NEGATIVE,
    )

    const totalByCategory: CaterogyData[] = []

    categories.forEach((category) => {
      const total = expensives
        .filter((transaction) => transaction.category === category.key)
        .reduce((acc, transaction) => {
          return acc + Number(transaction.amount)
        }, 0)

      if (total > 0) {
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: formatCurrency(total),
        })
      }
    })

    setTotalByCategories(totalByCategory)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            color={item.color}
            amount={item.total}
            title={item.name}
          />
        ))}
      </Content>
    </Container>
  )
}
