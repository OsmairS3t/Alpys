import React, { useState } from 'react';
import { Image } from 'react-native';
import { HightLightCard } from '../../components/HightLightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';

import {
  Container,
  Titulo,
  Header,
  UserWraper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  LogoutButton,
  Icon,
  HightLightCards,
  GroupHeaderTitle,
  Content,
  Title,
  TransactionList
} from './styles';

type User = {
  name: string;
  photo: string;
}

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const user:User = {
    name: 'Osmair',
    photo: 'https://avatars.githubusercontent.com/u/12415391?v=4'
  };

  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Salario",
      amount: "R$ 10.000,00",
      category: {
        name: 'Salario',
        icon: 'dollar-sign'
      },
      date: "10/01/2022"
    },
    {
      id: '2',
      type: 'negative',
      title: "Sanduiche",
      amount: "R$ 21,00",
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: "10/01/2022"
    },
    {
      id: '3',
      type: 'negative',
      title: "Aluguel",
      amount: "R$ 800,00",
      category: {
        name: 'Casa',
        icon: 'shopping-bag'
      },
      date: "10/01/2022"
    }
  ]

  return (
    <Container>
      <Header>
        <UserWraper>
          <UserInfo>
            <Photo source={{ uri: user.photo }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{user.name}</UserName>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => { }}>
            <Icon name="power" />
          </LogoutButton>
        </UserWraper>

        <GroupHeaderTitle>
          <Titulo>Alpys Chocolateria</Titulo>
          <Image width={90} source={require('../../assets/logo_alpys_branco.png')} />
        </GroupHeaderTitle>
      </Header>

      <HightLightCards>
        <HightLightCard
          type="up"
          amount="1.500,00"
          title="Entradas"
          lastTransaction="Última entrada dia 05 de janeiro de 2022"
        />
        <HightLightCard
          type="down"
          amount="-500,00"
          title="Saídas"
          lastTransaction="Última saida dia 06 de janeiro de 2022"
        />
        <HightLightCard
          type="total"
          amount="1.000,00"
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

