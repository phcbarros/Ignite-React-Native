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
  lastTransaction: string
}

type HighLighData = {
  entries: HighlightProps
  expesives: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const isFocused = useIsFocused()

  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>(
    [] as DataListProps[],
  )
  const [highLighData, setHighLightData] = useState<HighLighData>(
    {} as HighLighData,
  )

  async function loadTransactions() {
    let entriesTotal = 0
    let expensiveTotal = 0

    const transactions = await Storage.get<Transaction[]>()

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
    const lastTransactionExpensives = getLastTransactionDate(
      transactions,
      TransactionsType.NEGATIVE,
    )
    const totalInterval = `01 a ${lastTransactionExpensives}`

    setHighLightData({
      entries: {
        amount: formatCurrency(entriesTotal),
        lastTransaction: lastTransactionEntries,
      },
      expesives: {
        amount: formatCurrency(expensiveTotal),
        lastTransaction: lastTransactionExpensives,
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
              lastTransaction={`Última entrada dia ${highLighData.entries.lastTransaction}`}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highLighData.expesives.amount}
              lastTransaction={`Última saída dia ${highLighData.expesives.lastTransaction}`}
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
