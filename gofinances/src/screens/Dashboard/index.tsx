import React from 'react'
import {getBottomSpace} from 'react-native-iphone-x-helper'
import {HighlightCard} from '../../components/HighlightCard'
import {Transaction, TransactionCard} from '../../components/TransactionCard'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreetting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles'

export function Dashboard() {
  const data: Transaction[] = [
    {
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {name: 'Vendas', icon: 'dollar-sign'},
      date: '13/04/2020',
    },
    {
      title: 'Hambugueria',
      amount: '- R$ 100,00',
      category: {name: 'Alimentação', icon: 'coffee'},
      date: '13/04/2020',
    },
    {
      title: 'Hambugueria',
      amount: '- R$ 100,00',
      category: {name: 'Alimentação', icon: 'coffee'},
      date: '13/04/2020',
    },
    {
      title: 'Hambugueria',
      amount: '- R$ 100,00',
      category: {name: 'Alimentação', icon: 'coffee'},
      date: '13/04/2020',
    },
  ]
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
          <Icon name="power" />
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
          //keyExtractor: {item => item.id}
          renderItem={({item}) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: getBottomSpace()}}
        />
      </Transactions>
    </Container>
  )
}
