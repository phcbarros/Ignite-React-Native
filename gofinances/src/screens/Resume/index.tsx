import React, {useEffect, useState} from 'react'
import {useTheme} from 'styled-components'
import {RFValue} from 'react-native-responsive-fontsize'
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs'
import {addMonths, subMonths, format} from 'date-fns'
import {ptBR} from 'date-fns/locale'

import {Storage} from '../../infrastructure/storage'
import {Transaction, TransactionsType} from '../../types/type'
import {HistoryCard} from '../../components/HistoryCard'

import {categories} from '../../utils/categories'
import {formatCurrency} from '../../utils/formatCurrency'

import {
  Container,
  Title,
  Header,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
} from './styles'
import {VictoryPie} from 'victory-native'

type CaterogyData = {
  key: string
  name: string
  color: string
  totalFormated: string
  total: number
  percent: string
}

export function Resume() {
  const theme = useTheme()
  const bottomTabBarHeight = useBottomTabBarHeight()

  const [totalByCategories, setTotalByCategories] = useState<CaterogyData[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())

  function handleDateChange(action: 'next' | 'prev') {
    return action === 'next'
      ? setSelectedDate(addMonths(selectedDate, 1))
      : setSelectedDate(subMonths(selectedDate, 1))
  }

  async function loadData() {
    const transactions = await Storage.get<Transaction[]>()

    const expensives = transactions.filter(
      (transaction) =>
        transaction.type === TransactionsType.NEGATIVE &&
        new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear(),
    )

    const expensiveTotal = expensives.reduce(
      (acc, expensive) => acc + Number(expensive.amount),
      0,
    )

    const totalByCategory: CaterogyData[] = []

    categories.forEach((category) => {
      const total = expensives
        .filter((transaction) => transaction.category === category.key)
        .reduce((acc, transaction) => {
          return acc + Number(transaction.amount)
        }, 0)

      if (total > 0) {
        const percent = `${((total / expensiveTotal) * 100).toFixed(0)}%`

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          totalFormated: formatCurrency(total),
          total,
          percent,
        })
      }
    })

    setTotalByCategories(totalByCategory)
  }

  useEffect(() => {
    loadData()
  }, [selectedDate])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: bottomTabBarHeight,
        }}>
        <MonthSelect>
          <MonthSelectButton onPress={() => handleDateChange('prev')}>
            <MonthSelectIcon name="chevron-left" />
          </MonthSelectButton>
          <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>
          <MonthSelectButton onPress={() => handleDateChange('next')}>
            <MonthSelectIcon name="chevron-right" />
          </MonthSelectButton>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percent"
            y="total"
            colorScale={totalByCategories.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape,
              },
            }}
            labelRadius={50}
          />
        </ChartContainer>
        {totalByCategories.map((item) => (
          <HistoryCard
            key={item.key}
            color={item.color}
            amount={item.totalFormated}
            title={item.name}
          />
        ))}
      </Content>
    </Container>
  )
}
