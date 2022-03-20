import React, {useState} from 'react'
import {Button} from '../../components/Form/Button'

import {Input} from '../../components/Form/Input'
import {TransactionTypeButton} from '../../components/Form/TransactionTypeButton'
import {TransactionsType as EnumTransactionsType} from '../../types/type'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsType,
} from './styles'

export function Register() {
  const [transactionType, setTransactionType] = useState('')

  function handleTransactionTypeSelect(type: EnumTransactionsType): void {
    setTransactionType(type)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionsType>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() =>
                handleTransactionTypeSelect(EnumTransactionsType.up)
              }
              isActive={transactionType === EnumTransactionsType.up}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() =>
                handleTransactionTypeSelect(EnumTransactionsType.down)
              }
              isActive={transactionType === EnumTransactionsType.down}
            />
          </TransactionsType>
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  )
}
