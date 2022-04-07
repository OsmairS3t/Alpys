import React, { useEffect } from 'react'
import { Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { HeaderScreen } from '../../components/HeaderScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const dataKey = "@AlphysChoco";
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors } } = useForm<FormDataProps>({
      resolver: yupResolver(schema)
    });

  async function handleSubmitPurchase(form: FormDataProps) {
    const dataPurchase = {
      name: form.name,
      amount: form.amount,
      price: form.price
    }

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        dataPurchase
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      console.log(dataFormatted)
      Alert.alert('Compra cadastrada com sucesso');
      reset();

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel salvar');
    }
  }

  async function listPurchases() {
    const listPurchase = await AsyncStorage.getItem(dataKey);
    console.log(listPurchase)
  } 

/*   useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey);
    }
    loadData();
  },[]);
 */
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