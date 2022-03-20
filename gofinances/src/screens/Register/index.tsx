import React, {useState} from 'react'
import {Modal} from 'react-native'
import {useForm} from 'react-hook-form'

import {Button} from '../../components/Form/Button'
import {CategorySelectButton} from '../../components/Form/CategorySelectButton'
import {InputForm} from '../../components/Form/InputForm'
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

interface FormData {
  name: string
  amount: string
}

export function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const {control, handleSubmit} = useForm()

  function handleTransactionTypeSelect(type: EnumTransactionsType): void {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  function handleRegister(form: FormData) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    }
    console.log(data)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm control={control} name="name" placeholder="Nome" />
          <InputForm control={control} name="amount" placeholder="Preço" />

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

        <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
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
