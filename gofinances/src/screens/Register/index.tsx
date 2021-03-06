import React, {useEffect, useState} from 'react'
import {Keyboard, Modal, TouchableWithoutFeedback, Alert} from 'react-native'
import * as Yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm} from 'react-hook-form'
import {useNavigation} from '@react-navigation/native'
import uuid from 'react-native-uuid'

import {Button} from '../../components/Form/Button'
import {CategorySelectButton} from '../../components/Form/CategorySelectButton'
import {InputForm} from '../../components/Form/InputForm'
import {TransactionTypeButton} from '../../components/Form/TransactionTypeButton'

import {
  TransactionsType as EnumTransactionsType,
  Transaction,
} from '../../types/type'
import {Storage} from '../../infrastructure/storage'
import {CategorySelect} from '../CategorySelect'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsType,
} from './styles'
import {useAuth} from '../../context/auth'

interface FormData {
  name: string
  amount: string
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('Preço é obrigatório'),
})

const initialCategory = {
  key: 'category',
  name: 'Categoria',
}

export const TRANSACTIONS_KEY = '@gofinances:transactions_user:'

export function Register() {
  const navigation = useNavigation()
  const {user} = useAuth()

  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState(initialCategory)

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  function handleTransactionTypeSelect(type: EnumTransactionsType): void {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  async function handleRegister(form: Partial<FormData>) {
    if (!transactionType) {
      return Alert.alert('Atenção', 'Selecione o tipo da transação')
    }

    if (category.key === 'category') {
      return Alert.alert('Atenção', 'Selecione uma categoria')
    }

    const newTransaction: Transaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const dataKey = `${TRANSACTIONS_KEY}${user.id}`
      const data = await Storage.get<Transaction[]>(dataKey)
      const dataFormatted = [...data, newTransaction]

      await Storage.save<Transaction[]>(dataFormatted, dataKey)

      setTransactionType('')
      setCategory(initialCategory)
      reset()

      navigation.navigate('Dashboard')
    } catch (error) {
      console.log(error)
      Alert.alert('Atenção', 'Erro ao cadastrar transação')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name="amount"
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />

            <TransactionsType>
              <TransactionTypeButton
                type="positive"
                title="Income"
                onPress={() =>
                  handleTransactionTypeSelect(EnumTransactionsType.POSITIVE)
                }
                isActive={transactionType === EnumTransactionsType.POSITIVE}
              />
              <TransactionTypeButton
                type="negative"
                title="Outcome"
                onPress={() =>
                  handleTransactionTypeSelect(EnumTransactionsType.NEGATIVE)
                }
                isActive={transactionType === EnumTransactionsType.NEGATIVE}
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
    </TouchableWithoutFeedback>
  )
}
