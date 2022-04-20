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
  FooterTotal,
  TotalSales
} from './styles';

export interface ListSalesProps {
  id: string;
  client: string;
  phone: string;
  product: string;
  amount: string;
  total: string;
  ispaid: boolean;
  datesale: string;
}

interface Props {
  listSale: ListSalesProps[];
  setListSale: (listSale: ListSalesProps[]) => void;
  closeListSales: () => void;
  totalSale: string;
}
export function ListSales({ listSale, setListSale, closeListSales, totalSale }: Props) {

  function handleDeleteSale(id: string, product: string) {
    Alert.alert(
      "Alerta de Exclusão",
      "Tem certeza que deseja excluir?",
      [
        {
          text: "Não",
          onPress: () => {},
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => {
            deleteItem(id, product);
          }
        }
      ]
    );
  }

  async function deleteItem(id: string, product: string) {
    let descriptionDeleted = '';
    let totalSaleAtual = Number(totalSale)
    let totalDeleted=0;
    try {
      const currentData = await AsyncStorage.getItem(keySale);
      let newData = currentData !== null && JSON.parse(currentData);
      for (let i = 0; i < newData.length; i++) {
        if (newData[i].id === id) {
          descriptionDeleted = `${newData[i].product} de ${newData[i].client}`;
          totalDeleted = newData[i].total
          newData.splice(i, 1);
        }
      }
      totalSaleAtual -= totalDeleted;
      totalSale = totalSaleAtual.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
      await AsyncStorage.removeItem(keySale);
      await AsyncStorage.setItem(keySale, JSON.stringify(newData));
      setListSale(newData);
      return true;
    }
    catch (exception) {
      return false;
    }
  }

  async function handleEditSale(id: string) {
    try {
      const response = await AsyncStorage.getItem(keySale);
      let listSalesResponse: ListSalesProps[] = response ? JSON.parse(response) : [];
      listSalesResponse.map((item) => {
        if (item.id === id) {
          (item.ispaid) ?
            item.ispaid = false
            :
            item.ispaid = true
        }
      });
      setListSale(listSalesResponse);
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
              <Amount>Quantidade: {item.amount}    Data: {item.datesale}</Amount>
              <Price>Total: {item.total}</Price>
            </GroupList>
            <GroupButton>
              <EditButton onPress={() => handleEditSale(item.id)}>
                <Paid isPaid={item.ispaid}>{item.ispaid ? 'Pagamento Confirmado' : 'Pagamento Pendente'}</Paid>
              </EditButton>
              <DeleteButton onPress={() => handleDeleteSale(item.id, item.product)}>
                <IconDelete name="trash-2" size={30} />
              </DeleteButton>
            </GroupButton>
          </ListSalesTotal>
        )}
      />
      <FooterTotal>
        <TotalSales>Total: {totalSale}</TotalSales>
      </FooterTotal>
    </Container>
  )
}