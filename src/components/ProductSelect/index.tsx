import React, {useEffect, useState} from 'react';
import { FlatList } from 'react-native';
import { Button } from '../Forms/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* const products = [
    {
      "id": "fjsdçafjsa",
      "category": "Barra Recheada",
      "name": "Maracuja",
      "photo": "dd",
      "price": 3,
    },
    {
      "id": "fjsdçafjsfsdfsd",
      "category": "Bombom",
      "name": "Morango",
      "photo": "dana",
      "price": 3,
    },
  ] */

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

interface ProductProps {
    id: string;
    category: string;
    name: string;
    price: string;
    photo: string;
}

interface Props {
  product: ProductProps;
  setProduct: (product: ProductProps) => void;
  listProducts: ProductProps[];
  closeSelectProduct: () => void;
}

export function ProductSelect({ product, setProduct, listProducts, closeSelectProduct }: Props) {
  console.log(`Lista Products: ${listProducts}`);

  function handleProductSelect(product: ProductProps) {
    setProduct(product);
  }

  return (
    <Container>
      <Header>
        <Title>Produtos</Title>
      </Header>

      <FlatList 
        data={listProducts}
        style={{ flex: 1, width: '100%'}}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ButtonProduct
            onPress={() => handleProductSelect(item)}
            isActive={product.id === item.id}
          >
            <Category>{item.category}</Category>
            <Name>({item.name})</Name>
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
