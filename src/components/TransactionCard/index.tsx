import React from 'react';
import { ITransactionProps } from '../../utils/transactions'

import { 
  Container,
  Header,
  Content,
  Title,
  Amount,
  Price,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

interface Category {
  name: string;
  icon: string;
}

interface Props {
  data: ITransactionProps;
}

export function TransactionCard({ data }: Props) {
  const dateFormatted = Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }).format(data.datetransaction);
  const dataFormatted = {
    id: data.id,
    description: data.description,
    modality: data.modality,
    modalityicon: data.modalityicon,
    datetransaction: dateFormatted,
    amount: data.amount,
    price: data.price,
    ispaid: data.ispaid
  }

  return (
    <Container>
      <Header>
        <Title>{dataFormatted.description}</Title>
      </Header>

      <Content>
        <Price modality={dataFormatted.modality}>
          {dataFormatted.modality === 'buy' && '- ' }
          {dataFormatted.price}
        </Price>
        <Amount>{dataFormatted.amount}</Amount>
      </Content>

      <Footer>
        <Category>
          <Icon name={dataFormatted.modalityicon} />
          <CategoryName>{dataFormatted.modality === 'buy' ? 'Compras' : 'Vendas'}</CategoryName>
        </Category>
        <Date>{dataFormatted.datetransaction}</Date>
      </Footer>
    </Container>
  )
}