import React, { useState } from 'react';
import { Alert, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { HeaderScreen } from '../../components/HeaderScreen';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormDataProps } from '../../components/Forms/InputForm'

import {
  Container,
  Form,
  TitleForm,
  GroupFields,
  Fields,
  Field,
  GroupTitleForm,
  ListSalesButton,
  TitleListSalesButton
} from './styles';
import { ListSales } from '../ListSales';

type PropsType = 'up' | 'down';
import { ListSalesProps } from '../ListSales';

/* const lista = [
  {
    client: 'Osmair',
    phone: '9402-9998',
    product: 'Barra recheada',
    amount: '2',
    price: 10.00
  }
] */

const schema = Yup.object().shape({
  client: Yup.string(),
  product: Yup.string().required('é necessário informar o nome do Produto'),
  amount: Yup.number().typeError('Informe um valor numérico'),
  total: Yup.number(),
})

export function Sales() {
  const dataKey = '@AlphysChoco';
  const [lista, setLista] = useState<ListSalesProps[]>([
    {
      key: '1',
      client: 'Osmair',
      phone: '9402-9998',
      product: 'Barra recheada',
      amount: '2',
      price: 10.00
    },
    {
      key: '2',
      client: 'Wanessa',
      phone: '9857-5795',
      product: 'Bombom',
      amount: '10',
      price: 30.00
    }
  ]);
  const [isModalListOpen, setIsModalListOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [type, setType] = useState<PropsType>("down");
  const [descriptionPaid, setDescriptionPaid] = useState('Pagamento Pendente');
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema)
  });

  function handleChangePaid() {
    setIsPaid(!isPaid)
    !isPaid ? setDescriptionPaid('Pagamento Confirmado') : setDescriptionPaid('Pagamento Pendente')
  }

  function handOpenleListSales() {
    setIsModalListOpen(true);
  }

  function handCloseleListSales() {
    setIsModalListOpen(false);
  }

  function handleSubmitSale(form: FormDataProps) {
    const data = {
      client: form.client,
      product: form.product,
      amount: form.amount,
      total: form.total,
      paid: descriptionPaid
    }
    console.log(data);
    Alert.alert('Venda cadastrada com sucesso!');
    reset();
    setIsPaid(false);
    setDescriptionPaid('Pagamento Pendente');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <HeaderScreen />
        <Form>
          <GroupFields>
            <GroupTitleForm>
              <TitleForm>Vendas:</TitleForm>
              <ListSalesButton onPress={handOpenleListSales}>
                <TitleListSalesButton>Lista</TitleListSalesButton>
              </ListSalesButton>
            </GroupTitleForm>
            <InputForm
              placeholder='Cliente'
              name='client'
              control={control}
              autoCapitalize='characters'
              autoCorrect={false}
            />
            <InputForm
              placeholder='Produto'
              name='product'
              control={control}
              autoCorrect={false}
            />
            <Fields>
              <Field>
                <InputForm
                  placeholder='Quantidade'
                  name='amount'
                  control={control}
                  error={errors.amount && errors.amount.message}
                  keyboardType='numeric'
                />
              </Field>
              <Field>
                <InputForm
                  placeholder='Valor Total'
                  name='total'
                  control={control}
                  error={errors.total && errors.total.message}
                  keyboardType='numeric'
                />
              </Field>
            </Fields>
            <Fields>
              <TransactionTypeButton
                isActive={isPaid}
                title={descriptionPaid}
                onPress={handleChangePaid}
              />
            </Fields>
          </GroupFields>
          <Button
            title='Cadastrar'
            onPress={handleSubmit(handleSubmitSale)}
          />
        </Form>
        <Modal visible={isModalListOpen}>
          <ListSales 
            listSale={lista} 
            closeListSales={handCloseleListSales}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
