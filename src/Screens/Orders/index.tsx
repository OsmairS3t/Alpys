import React from 'react';

import { Input } from '../../components/Forms/Input';
import { Button } from '../../components/Forms/Button';

import { 
  Container,
  Header,
  Title,
  Form,
  GroupFields,
  Fields,
  Field
} from './styles';

export function Orders() {
  return (
    <Container>
      <Header>
        <Title>Pedidos</Title>
      </Header>
      <Form>
        <GroupFields>
          <Input 
            placeholder='Cliente'
          />
          <Input 
            placeholder='Produto'
          />
          <Fields>
            <Field>
                <Input 
                  placeholder='Quantidade'
                  keyboardType='numeric'
                />
            </Field>
            <Field>
                <Input 
                  placeholder='Valor Total'
                  keyboardType='numeric'
                />
            </Field>
          </Fields>
          <Fields>
            <Field>
                <Input 
                  placeholder='Prev Pagamento'
                />
            </Field>
            <Field>
                <Input 
                  placeholder='Data Pagamento'
                />
            </Field>
          </Fields>
        </GroupFields>
        <Button 
          title='Cadastrar'
          onPress={()=>{}}
        />
      </Form>
    </Container>
  );
}