import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderScreen } from '../../components/HeaderScreen';
import { keyTransaction } from '../../utils/keyStorage';

import {
  Container,
  Header,
  Title,
  ButtonBack,
  Icon,
  ListSalesTotal,
  Description,
  GroupList,
  Amount,
  Price,
  GroupButton,
  DeleteButton,
  IconEdit,
  IconDelete,
  EditButton,
  FooterTotal,
  TotalSales
} from './styles';

import { ITransactionProps } from '../../utils/transactions';

interface Props {
  listSale: ITransactionProps[];
  setListSale: (listSale: ITransactionProps[]) => void;
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
      const response = await AsyncStorage.getItem(keyTransaction);
      const newSaleData:ITransactionProps[] = response ? JSON.parse(response) : [];
      let saleItem:ITransactionProps = newSaleData.find((item) => item.id === id) as ITransactionProps;
      let subSaleItem = totSale - saleItem.price;
      setTotSale(subSaleItem);
      let saleArray:ITransactionProps[] = newSaleData.filter(item => item.id !== id);
      await AsyncStorage.removeItem(keyTransaction);
      await AsyncStorage.setItem(keyTransaction, JSON.stringify(saleArray));
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
      const response = await AsyncStorage.getItem(keyTransaction);
      let listTransactionResponse: ITransactionProps[] = response ? JSON.parse(response) : [];
      let listSalesResponse = listTransactionResponse.filter(transaction => transaction.modality!=='buy')
      listSalesResponse.map((item) => {
        if (item.id === id) {
          setIsPaid(item.ispaid);
          setIsPaid(!isPaid);
          item.ispaid = isPaid;
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
              <Description>Descrição: {item.description}</Description>
              <Amount>
                Quantidade: {item.amount}    Data: {Intl.DateTimeFormat('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit'
                }).format(new Date(item.datetransaction))}
              </Amount>
              <Price>
                Total: {item.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              })}</Price>
            </GroupList>
            <GroupButton>
              <EditButton onPress={() => handleEditSale(item.id)}>
                <IconEdit name={item.ispaid ? 'attach-money' : 'money-off'} isPaid={item.ispaid} size={30} />
              </EditButton>
              <DeleteButton onPress={() => handleDeleteSale(item.id, item.description)}>
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