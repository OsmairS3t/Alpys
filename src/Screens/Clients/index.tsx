import React from 'react';
import { Button } from '../../components/Forms/Button';
import { Input } from '../../components/Forms/Input';

import {
  Container,
  Header,
  Title,
  Form,
  Fields
} from './styles';

export function Clients() {
  function handleCadastrar() {
    console.log('Cliente cadastrado com sucesso!');
  }
  
  return (
    <Container>
      <Header>
        <Title>Clientes</Title>
      </Header>
      <Form>
        <Fields>
          <Input
            placeholder='Nome'
            autoCapitalize='characters'
            autoCorrect={false}
          />
          <Input
            placeholder='Telefone'
            keyboardType='phone-pad'
          />
        </Fields>

        <Button 
          title='Cadastrar'
          onPress={handleCadastrar}
        />
      </Form>
    </Container>
  )
}