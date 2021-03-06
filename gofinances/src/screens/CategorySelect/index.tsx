import React from 'react'
import {FlatList} from 'react-native'

import {Button} from '../../components/Form/Button'

import {categories} from '../../utils/categories'

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  CategoryName,
  Separator,
  Footer,
} from './styles'

interface Category {
  key: string
  name: string
}

interface Props {
  category: Category
  setCategory: (name: Category) => void
  closeSelectCategory: () => void
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: Props) {
  function handleCategorySelect(category: Category): void {
    setCategory(category)
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        style={{flex: 1, width: '100%'}}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({item}) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={item.key === category.key}>
            <Icon name={item.icon} />
            <CategoryName>{item.name}</CategoryName>
          </Category>
        )}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  )
}
