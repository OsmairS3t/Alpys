import React from 'react';
import { FlatList } from 'react-native';
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
  Price
} from './styles';

export interface ListSalesProps {
  key: string;
  client: string;
  phone: string;
  product: string;
  amount: string;
  price: number;
}

interface Props {
  listSale: ListSalesProps[];
  closeListSales: ()=>void;
}

export function ListSales({ listSale, closeListSales }: Props) {

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
        style={{ flex: 1, width: '100%'}}
        keyExtractor={(item)=>item.key}
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
          </GroupList>
        </ListSalesTotal>
        )}
      />

    </Container>
  )
}