import React, {useCallback, useEffect, useState} from 'react'
import {useFocusEffect, useIsFocused} from '@react-navigation/native'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import {HighlightCard} from '../../components/HighlightCard'
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard'
import {Storage} from '../../infrastructure/storage'
import {Transaction, TransactionsType} from '../../types/type'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreetting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string
}

type HighlightProps = {
  amount: string
}

type HighLighData = {
  entries: HighlightProps
  expesives: HighlightProps
  total: HighlightProps
}

const initialHighlightData: HighLighData = {
  entries: {amount: formatCurrency(0)},
  expesives: {amount: formatCurrency(0)},
  total: {amount: formatCurrency(0)},
}

export function Dashboard() {
  const isFocused = useIsFocused()

  const [transactions, setTransactions] = useState<DataListProps[]>(
    [] as DataListProps[],
  )
  const [highLighData, setHighLightData] =
    useState<HighLighData>(initialHighlightData)

  async function loadTransactions() {
    let entriesTotal = 0
    let expensiveTotal = 0

    const transactions = await Storage.get<Transaction[]>()

    const formattedTransactions: DataListProps[] = transactions.map(
      (transaction) => {
        console.log(transaction)

        const amount = Number(transaction.amount)

        if (transaction.type === TransactionsType.positive) {
          entriesTotal += amount
        } else {
          expensiveTotal += amount
        }

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(transaction.date))

        return {
          id: transaction.id,
          name: transaction.name,
          amount: formatCurrency(amount),
          date,
          category: transaction.category,
          type: transaction.type,
        } as DataListProps
      },
    )

    setHighLightData({
      entries: {amount: formatCurrency(entriesTotal)},
      expesives: {amount: formatCurrency(expensiveTotal)},
      total: {amount: formatCurrency(entriesTotal - expensiveTotal)},
    })

    setTransactions(formattedTransactions)
  }

  // useFocusEffect(
  //   useCallback(() => {
  //     loadTransactions()
  //   }, []),
  // )

  useEffect(() => {
    if (isFocused) {
      loadTransactions()
    }
  }, [isFocused])

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/12138058?v=4',
              }}
            />
            <User>
              <UserGreetting>Olá,</UserGreetting>
              <UserName>Paulo Barros</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount={highLighData.entries.amount}
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount={highLighData.expesives.amount}
          lastTransaction="Última saída dia 03 de abril"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount={highLighData.total.amount}
          lastTransaction="01 à 16 de abril"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={transactions}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  )
}

function formatCurrency(value: number) {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
