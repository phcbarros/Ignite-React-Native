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

import {TransactionsType as EnumTransactionsType} from '../../types/type'
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

interface FormData {
  name: string
  amount: string
}

type TransactionFormProps = {
  id: string
  name: string | undefined
  amount: string | undefined
  transactionType: string
  category: string
  date: Date
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

export function Register() {
  const navigation = useNavigation()
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

    const newTransaction: TransactionFormProps = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date(),
    }

    try {
      const data = await Storage.get<TransactionFormProps[]>()
      const dataFormatted = [...data, newTransaction]

      await Storage.save<TransactionFormProps[]>(dataFormatted)

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
    </TouchableWithoutFeedback>
  )
}
