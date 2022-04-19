import React from 'react';

import { 
  Container,
  Header,
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

export interface TransactionCardProps {
  type: 'positive' | 'negative';
  producttype: string;
  amount: string;
  price: string;
  category: Category;
  date: string;
}

interface Props {
  data: TransactionCardProps;
}

export function TransactionCard({ data }: Props) {
  return (
    <Container>
      <Header>
        <Title>{data.producttype}</Title>
        <Amount>{data.amount}</Amount>
      </Header>

      <Price type={data.type}>
        {data.type === 'negative' && '- ' }
        {data.price}
      </Price>
      
      <Footer>
        <Category>
          <Icon name={data.category.icon} />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  )
}