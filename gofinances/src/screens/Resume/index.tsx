import React, {useCallback, useState} from 'react'
import {useTheme} from 'styled-components'
import {RFValue} from 'react-native-responsive-fontsize'
import {useFocusEffect} from '@react-navigation/native'
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
import {Loading} from '../../components/Loading'
import {useAuth} from '../../context/auth'
import {TRANSACTIONS_KEY} from '../Register'

type CategoryData = {
  key: string
  name: string
  color: string
  totalFormatted: string
  total: number
  percent: string
}

export function Resume() {
  const theme = useTheme()
  const bottomTabBarHeight = useBottomTabBarHeight()
  const {user} = useAuth()

  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)

  function handleDateChange(action: 'next' | 'prev') {
    return action === 'next'
      ? setSelectedDate(addMonths(selectedDate, 1))
      : setSelectedDate(subMonths(selectedDate, 1))
  }

  async function loadData() {
    setIsLoading(true)
    const dataKey = `${TRANSACTIONS_KEY}${user.id}`
    const transactions = await Storage.get<Transaction[]>(dataKey)

    const spending = transactions.filter(
      (transaction) =>
        transaction.type === TransactionsType.NEGATIVE &&
        new Date(transaction.date).getMonth() === selectedDate.getMonth() &&
        new Date(transaction.date).getFullYear() === selectedDate.getFullYear(),
    )

    const expensiveTotal = spending.reduce(
      (acc, expensive) => acc + Number(expensive.amount),
      0,
    )

    const totalByCategory: CategoryData[] = []

    categories.forEach((category) => {
      const total = spending
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
          totalFormatted: formatCurrency(total),
          total,
          percent,
        })
      }
    })

    setTotalByCategories(totalByCategory)
    setIsLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      loadData()
    }, [selectedDate]),
  )

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? (
        <Loading />
      ) : (
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
              amount={item.totalFormatted}
              title={item.name}
            />
          ))}
        </Content>
      )}
    </Container>
  )
}
