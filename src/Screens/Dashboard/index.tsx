import React from 'react';
import { HightLightCard } from '../../components/HightLightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import {
  Container,
  Header,
  LogoTipo,
  HightLightCards,
  Content,
  Title,
  TransactionList
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

const logotipo = '../../assets/logo_alpys.png';

export function Dashboard() {

  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      producttype: "Barra",
      amount: "1 Unid.",
      price: "R$ 22,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "10/01/2022"
    },
    {
      id: '2',
      type: 'negative',
      producttype: "Chocolate meio amargo",
      amount: "1 Unid.",
      price: "R$ 21,00",
      category: {
        name: 'Compra',
        icon: 'dollar-sign'
      },
      date: "10/01/2022"
    },
    {
      id: '3',
      type: 'positive',
      producttype: "Pão de mel",
      amount: "2 Unid.",
      price: "R$ 10,00",
      category: {
        name: 'Venda',
        icon: 'dollar-sign'
      },
      date: "10/01/2022"
    }
  ]

  return (
    <Container>
      <Header>
          <LogoTipo width={207} source={require(logotipo)} />
      </Header>

      <HightLightCards>
        <HightLightCard
          type="up"
          price="1.500,00"
          title="Entradas"
          lastTransaction="Última entrada dia 05 de janeiro de 2022"
        />
        <HightLightCard
          type="down"
          price="-500,00"
          title="Saídas"
          lastTransaction="Última saida dia 06 de janeiro de 2022"
        />
        <HightLightCard
          type="total"
          price="1.000,00"
          title="Total"
          lastTransaction="Última entrada dia 05 de janeiro de 2022"
        />
      </HightLightCards>

      <Content>
        <Title>Listagem:</Title>
        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Content>
    </Container>
  )
}
