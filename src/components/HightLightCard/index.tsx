import React from 'react';
import {
  Container,
  Header,
  Footer,
  Price,
  LastTransaction,
  Icon,
  Title
} from './styles';

interface Props {
  title: string;
  price: string;
  lastTransaction: string;
  type: 'up' | 'down' | 'total';
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign'
}

export function HightLightCard({ type, title, price, lastTransaction }: Props) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type}/>
      </Header>
      <Footer>
        <Price>
          <Title type={type}>{price}</Title>
        </Price>
        <LastTransaction>
          <Title type={type}>{lastTransaction}</Title>
        </LastTransaction>
      </Footer>
    </Container>
  )
}