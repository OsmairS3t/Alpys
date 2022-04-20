import React, {useEffect, useState} from 'react';
import { FlatList } from 'react-native';
import { Button } from '../Forms/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
  Container,
  Header,
  Title,
  ButtonProduct,
  Name,
  Price,
  Separator,
  Footer
 } from './styles';

interface ProductProps {
    id: string;
    category: string;
    name: string;
    price: number;
    photo: string;
}

interface Props {
  product: ProductProps;
  setProduct: (product: ProductProps) => void;
  listProducts: ProductProps[];
  closeSelectProduct: () => void;
}

export function ProductSelect({ product, setProduct, listProducts, closeSelectProduct }: Props) {

  function handleProductSelect(product: ProductProps) {
    setProduct(product);
  }

  return (
    <Container>
      <Header>
        <Title>Produtos Disponíveis</Title>
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
            <Name>{item.category} ({item.name})</Name>
            <Price>
              {
                item.price.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                })
              }
            </Price>
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
