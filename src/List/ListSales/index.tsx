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
  IconEdit,
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
  total: number;
  ispaid: boolean;
  datesale: string;
}

interface Props {
  listSale: ListSalesProps[];
  setListSale: (listSale: ListSalesProps[]) => void;
  closeListSales: () => void;
  totalSale: number;
}
export function ListSales({ listSale, setListSale, closeListSales, totalSale }: Props) {
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [totSale, setTotSale] = useState(totalSale);
  const [totalSaleView, setTotalSaleView] = useState(totalSale.toLocaleString('pt-BR', {
    style:'currency',
    currency: 'BRL'
  }))

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
    try {
      const response = await AsyncStorage.getItem(keySale);
      const newSaleData:ListSalesProps[] = response ? JSON.parse(response) : [];
      let saleItem:ListSalesProps = newSaleData.find((item) => item.id === id) as ListSalesProps;
      let subSaleItem = totSale - saleItem.total;
      setTotSale(subSaleItem);
      let saleArray:ListSalesProps[] = newSaleData.filter(item => item.id !== id);
      await AsyncStorage.removeItem(keySale);
      await AsyncStorage.setItem(keySale, JSON.stringify(saleArray));
      setListSale(saleArray);
      let subSale = subSaleItem.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
      setTotalSaleView(subSale);
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
              <Amount>Quantidade: {item.amount}  Data: {item.datesale}</Amount>
              <Price>Total: {item.total}</Price>
            </GroupList>
            <GroupButton>
              <EditButton onPress={() => handleEditSale(item.id)}>
                <IconEdit name={item.ispaid ? 'attach-money' : 'money-off'} isPaid={item.ispaid} size={30} />
              </EditButton>
              <DeleteButton onPress={() => handleDeleteSale(item.id, item.product)}>
                <IconDelete name="trash-2" size={30} />
              </DeleteButton>
            </GroupButton>
          </ListSalesTotal>
        )}
      />
      <FooterTotal>
        <TotalSales>Total: {totalSaleView}</TotalSales>
      </FooterTotal>
    </Container>
  )
}