import React from 'react'
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { HeaderScreen } from '../../components/HeaderScreen';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormDataProps } from '../../components/Forms/InputForm'

import {
  Container,
  Form,
  Fields,
  TitleForm
} from './styles';

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('O nome do item é obrigatório'),
  amount: Yup
    .number()
    .required('A quantidade é necessária'),
  price: Yup
    .number()
    .required('O valor é necessário')
    .typeError('Este campo é para valores numéricos. Para números decimais informar ponto(.) ao invés de vírgula(,)')
})

export function Purchases() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors } } = useForm<FormDataProps>({
      resolver: yupResolver(schema)
    });

  function handleSubmitPurchase(form: FormDataProps) {
    const data = {
      name: form.name,
      amount: form.amount,
      price: form.price
    }
    console.log(data);
    Alert.alert('Compra cadastrada com sucesso');
    reset();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <HeaderScreen />
        <Form>
          <Fields>
            <TitleForm>Compras:</TitleForm>
            <InputForm
              placeholder='Nome'
              name='name'
              control={control}
              autoCapitalize='characters'
              error={errors.name && errors.name.message}
            />
            <InputForm
              placeholder='Quantidade'
              name='amount'
              control={control}
              keyboardType='numeric'
              error={errors.amount && errors.amount.message}
            />
            <InputForm
              placeholder='Preço'
              name='price'
              control={control}
              keyboardType='numeric'
              error={errors.price && errors.price.message}
            />
          </Fields>
          <Button
            title='Cadastrar'
            onPress={handleSubmit(handleSubmitPurchase)}
          />
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  )
}