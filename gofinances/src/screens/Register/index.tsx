import React, {useState} from 'react'
import {Modal} from 'react-native'

import {Button} from '../../components/Form/Button'
import {CategorySelectButton} from '../../components/Form/CategorySelectButton'
import {Input} from '../../components/Form/Input'
import {TransactionTypeButton} from '../../components/Form/TransactionTypeButton'

import {TransactionsType as EnumTransactionsType} from '../../types/type'
import {CategorySelect} from '../CategorySelect'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsType,
} from './styles'

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  function handleTransactionTypeSelect(type: EnumTransactionsType): void {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
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

          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen} animationType="slide">
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  )
}
