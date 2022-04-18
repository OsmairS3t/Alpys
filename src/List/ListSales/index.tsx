import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderScreen } from '../../components/HeaderScreen';
import { keySale } from '../../utils/keyStorage';

import {
  Container,
  Header,
  Title,
  ButtonBack,
  Icon,
  ListSalesTotal,
  ClientName,
  GroupList,
  ProductName,
  Amount,
  Paid,
  Price,
  GroupButton,
  DeleteButton,
  IconDelete,
  EditButton,
  IconEdit
} from './styles';

export interface ListSalesProps {
  id: string;
  client: string;
  phone: string;
  product: string;
  amount: string;
  total: number;
  paid: string;
}

interface Props {
  listSale: ListSalesProps[];
  setListSale: (listSale: ListSalesProps[]) => void;
  closeListSales: () => void;
}
export function ListSales({ listSale, setListSale, closeListSales }: Props) {

  async function handleDeleteSale(id: string) {
    let descriptionDeleted = '';
    try {
      const currentData = await AsyncStorage.getItem(keySale);
      let newData = currentData !== null && JSON.parse(currentData);
      for(let i=0; i<newData.length; i++) {
        if(newData[i].id === id) {
          descriptionDeleted = `${newData[i].product} de ${newData[i].client}`;
          newData.splice(i, 1);
        }
      }
      await AsyncStorage.removeItem(keySale);
      await AsyncStorage.setItem(keySale, JSON.stringify(newData));
      setListSale(newData);
      Alert.alert(`${descriptionDeleted} excluído com sucesso.`);
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
            <GroupList>
              <ClientName>Cliente: {item.client}</ClientName>
              <ProductName>Produto: {item.product}</ProductName>
              <Amount>Quantidade: {item.amount}</Amount>
              <Price>Total: R$ {item.total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</Price>
              <Paid>{item.paid}</Paid>
            </GroupList>
            <GroupButton>
              <DeleteButton onPress={() => handleDeleteSale(item.id)}>
                <IconDelete name="trash-2" size={30} />
              </DeleteButton>
              <EditButton onPress={() => handleDeleteSale(item.id)}>
                <IconEdit name="edit" size={30} />
              </EditButton>
            </GroupButton>
          </ListSalesTotal>
        )}
      />

    </Container>
  )
}