import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { units } from '../../utils/units';

import {
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer
} from './styles';

interface Category {
  key: string;
  name: string;
}

interface Props {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function UnitSelect({
  category,
  setCategory,
  closeSelectCategory
}: Props) {
  function handleCategorySelect(category: Category) {
    setCategory(category);
  }

  return (
    <Container>
      <Header>
        <Title>Unidade de Medida</Title>
      </Header>

      <FlatList
        data={units}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={Separator}
      />

      <Footer>
        <Button
          title='Selecionar'
          onPress={closeSelectCategory}
        />
      </Footer>
    </Container>
  )
}