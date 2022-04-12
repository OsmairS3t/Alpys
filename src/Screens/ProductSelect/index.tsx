import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { categories } from '../../utils/categories';

/* const products = [
    {
      "category": "Barra Recheada",
      "name": "Maracuja",
      "photo": "dd",
      "price": 3,
    },
    {
      "category": "Bombom",
      "name": "Morango",
      "photo": "dana",
      "price": 3,
    },
  ]
 */

import { 
  Container,
  Header,
  Title,
  Category,
  ButtonProduct,
  Name,
  Separator,
  Footer
 } from './styles';

interface Product {
    category: string;
    name: string;
    price: number;
    photo: string;
}

interface ProductProps {
  products: Product[];
  closeSelectProduct: () => void;
}

export function ProductSelect({ products, closeSelectProduct }: ProductProps) {

  return (
    <Container>
      <Header>
        <Title>Produto</Title>
      </Header>

      <FlatList 
        data={products}
        style={{ flex: 1, width: '100%'}}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <ButtonProduct
            onPress={() => {}}
          >
            <Category>{item.category}</Category>
            <Name>{item.name}</Name>
          </ButtonProduct>
        )}
        ItemSeparatorComponent={Separator}
      />

      <Footer>
        <Button 
          title='Selecionar' 
          onPress={closeSelectProduct}  
        />
      </Footer>
    </Container>
  )
}
