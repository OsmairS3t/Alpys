import React, { useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderScreen } from '../../components/HeaderScreen';

import {
  Container,
  Header,
  Title,
  ButtonBack,
  TitleButtonBack,
  Icon,
  ListSalesTotal,
  GroupTitle,
  ClientName,
  ClientPhone,
  GroupList,
  ProductName,
  Amount,
  Price,
  DeleteButton,
  IconDelete
} from './styles';

export interface ListSalesProps {
  id: string;
  client: string;
  phone: string;
  product: string;
  amount: string;
  price: number;
}

interface Props {
  listSale: ListSalesProps[];
  closeListSales: () => void;
}
export function ListSales({ listSale, closeListSales }: Props) {
  const dataKeySales = "@AlphysChoco-Sales";

  async function handleDeleteSale(id: string) {
    try {
      const data = await AsyncStorage.getItem(dataKeySales);
      await AsyncStorage.removeItem(dataKeySales);
      Alert.alert(`${id} deletado com sucesso.`);
      return true;
    }
    catch (exception) {
      return false;
    }
  }
  return (
    <Container>
      <HeaderScreen />
      <Header>
        <Title>Lista de Vendas:</Title>
        <ButtonBack onPress={closeListSales}>
          <Icon name='corner-up-left' size={25} />
        </ButtonBack>
      </Header>

      <FlatList
        data={listSale}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListSalesTotal>
            <GroupTitle>
              <ClientName>{item.client}</ClientName>
              <ClientPhone>{item.phone}</ClientPhone>
            </GroupTitle>
            <GroupList>
              <Amount>{item.amount}</Amount>
              <ProductName>{item.product}</ProductName>
              <Price>R$ {item.price},00</Price>
              <DeleteButton onPress={() => handleDeleteSale(item.id)}>
                <IconDelete name="trash-2" size={20} />
              </DeleteButton>
            </GroupList>
          </ListSalesTotal>
        )}
      />

    </Container>
  )
}