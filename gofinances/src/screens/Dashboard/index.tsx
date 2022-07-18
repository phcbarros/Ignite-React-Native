import React, {useEffect, useState} from 'react'
import {useIsFocused} from '@react-navigation/native'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'

import {HighlightCard} from '../../components/HighlightCard'
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard'
import {Loading} from '../../components/Loading'

import {Storage} from '../../infrastructure/storage'
import {Transaction, TransactionsType} from '../../types/type'
import {formatCurrency} from '../../utils/formatCurrency'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles'
import {useAuth} from '../../context/auth'
import {TRANSACTIONS_KEY} from '../Register'

export interface DataListProps extends TransactionCardProps {
  id: string
}

type HighlightProps = {
  amount: string
  lastTransaction: string
}

type HighLighData = {
  entries: HighlightProps
  expenses: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const isFocused = useIsFocused()
  const {signOut, user} = useAuth()

  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>(
    [] as DataListProps[],
  )
  const [highLighData, setHighLightData] = useState<HighLighData>(
    {} as HighLighData,
  )

  async function loadTransactions() {
    const dataKey = `${TRANSACTIONS_KEY}${user.id}`
    let entriesTotal = 0
    let expensiveTotal = 0

    const transactions = await Storage.get<Transaction[]>(dataKey)

    const formattedTransactions: DataListProps[] = transactions.map(
      (transaction) => {
        const amount = Number(transaction.amount)

        if (transaction.type === TransactionsType.POSITIVE) {
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

    const lastTransactionEntries = getLastTransactionDate(
      transactions,
      TransactionsType.POSITIVE,
    )
    const lastTransactionExpenses = getLastTransactionDate(
      transactions,
      TransactionsType.NEGATIVE,
    )
    const totalInterval = `01 a ${lastTransactionExpenses}`

    setHighLightData({
      entries: {
        amount: formatCurrency(entriesTotal),
        lastTransaction: lastTransactionEntries,
      },
      expenses: {
        amount: formatCurrency(expensiveTotal),
        lastTransaction: lastTransactionExpenses,
      },
      total: {
        amount: formatCurrency(entriesTotal - expensiveTotal),
        lastTransaction: totalInterval,
      },
    })

    setTransactions(formattedTransactions)
    setIsLoading(false)
  }

  useEffect(() => {
    if (isFocused) {
      loadTransactions()
    }
  }, [isFocused])

  return (
    <Container>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>{user.name.replace('da', '')}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highLighData.entries.amount}
              lastTransaction={`Última entrada dia ${highLighData.entries.lastTransaction}`}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highLighData.expenses.amount}
              lastTransaction={`Última saída dia ${highLighData.expenses.lastTransaction}`}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highLighData.total.amount}
              lastTransaction={highLighData.total.lastTransaction}
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
        </>
      )}
    </Container>
  )
}

function getLastTransactionDate(
  transactions: Transaction[],
  type: TransactionsType,
) {
  const lastTransaction = new Date(
    Math.max.apply(
      Math,
      transactions
        .filter((transaction) => transaction.type === type)
        .map((transaction) => new Date(transaction.date).getTime()),
    ),
  )

  return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
    'pt-BR',
    {
      month: 'long',
    },
  )}`
}
