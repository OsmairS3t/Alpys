import React from 'react';
import { HeaderScreen } from '../../components/HeaderScreen';

import {
  Container,
  Title,
  ListSalesTotal, 
  GroupTitle, 
  ClientName, 
  ClientPhone, 
  GroupList, 
  ProductName, 
  Amount, 
  Price
} from './styles';

interface Props {
  listSales: [
    {
      client: string;
      phone: string;
      product: string;
      amount: string;
      price: number;
    }
  ]
}

export function ListSales({listSales}:Props) {
  return (
    <Container>
      <HeaderScreen />
      <Title>Lista de Vendas:</Title>
      <ListSalesTotal>
        <GroupTitle>
          <ClientName>CLIENTE</ClientName>
          <ClientPhone>TELEFONE</ClientPhone>
        </GroupTitle>
        <GroupList>
          <ProductName>Produto</ProductName>
          <Amount>Quant</Amount>
          <Price>Valor</Price>
        </GroupList>
      </ListSalesTotal>
    </Container>
  )
}