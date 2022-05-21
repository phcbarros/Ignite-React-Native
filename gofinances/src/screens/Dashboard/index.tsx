import React, {useCallback, useEffect, useState} from 'react'
import {useFocusEffect} from '@react-navigation/native'
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

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([] as DataListProps[])

  async function loadTransactions() {
    const transactions = await Storage.get<Transaction[]>()

    const formattedTransactions: DataListProps[] = transactions.map(
      (transaction) => {
        const amount = Number(transaction.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(transaction.date))

        return {
          id: transaction.id,
          name: transaction.name,
          amount,
          date,
          category: transaction.category,
          type: transaction.type,
        } as DataListProps
      },
    )

    setData(formattedTransactions)
  }

  useFocusEffect(
    useCallback(() => {
      loadTransactions()
    }, []),
  )

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
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
          type="down"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
          keyExtractor={(item) => String(item.id)}
          renderItem={({item}) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  )
}
