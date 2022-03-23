import React from 'react';

import {Input} from '../../components/Forms/Input';
import {Button} from '../../components/Forms/Button';

import {
  Container,
  Header,
  Title,
  Form,
  Fields
} from './styles';

export function Products() {
  return (
    <Container>
      <Header>
        <Title>Produtos</Title>
      </Header>
      <Form>
        <Fields>
          <Input 
            placeholder='Nome'
            autoCapitalize='characters'
            autoCorrect={false}
          />
          <Input 
            placeholder='Preço'
            autoCapitalize='characters'
            keyboardType='numeric'
          />
          <Input 
            placeholder='Foto'
            autoCapitalize='characters'
            keyboardType='url'
          />
        </Fields>
        <Button 
          title='Cadastrar'
          onPress={()=>{}}
        />
      </Form>
    </Container>
  )
}