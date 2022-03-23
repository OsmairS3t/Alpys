import React from 'react';
import {
  Container,
  Header,
  Footer,
  Amount,
  LastTransaction,
  Icon,
  Title
} from './styles';

interface Props {
  title: string;
  amount: string;
  lastTransaction: string;
  type: 'up' | 'down' | 'total';
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign'
}

export function HightLightCard({ type, title, amount, lastTransaction }: Props) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type}/>
      </Header>
      <Footer>
        <Amount>
          <Title type={type}>{amount}</Title>
        </Amount>
        <LastTransaction>
          <Title type={type}>{lastTransaction}</Title>
        </LastTransaction>
      </Footer>
    </Container>
  )
}