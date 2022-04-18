import React, { useEffect, useState } from 'react'
import { Alert, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { HeaderScreen } from '../../components/HeaderScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FormDataProps } from '../../components/Forms/InputForm'

import { ListPurchases } from '../../List/ListPurchases';
import { ListPurchaseProps } from '../../List/ListPurchases';
import { keyPurchase } from '../../utils/keyStorage';

import {
  Container,
  HeaderContainer,
  ButtonList,
  TitleButtonList,
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
});

export function Purchases() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchases, setPurchases] = useState<ListPurchaseProps[]>([]);
  const { handleSubmit, control, reset, formState: { errors } } = useForm<FormDataProps>({resolver: yupResolver(schema)});
  
  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(keyPurchase);
      data != null && setPurchases(JSON.parse(data));
      //console.log(data);
    }
    loadData;
  },[])

  async function handleSubmitPurchase(form: FormDataProps) {
    const dataPurchase = {
      id: uuid.v4(),
      name: form.name,
      amount: form.amount,
      price: form.price
    }

    try {
      const data = await AsyncStorage.getItem(keyPurchase);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        dataPurchase
      ]
      await AsyncStorage.setItem(keyPurchase, JSON.stringify(dataFormatted));
      console.log(dataFormatted)
      Alert.alert('Compra cadastrada com sucesso');
      reset();

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel salvar');
    }
  }
  
  async function handleModalOpen() {
    const data = await AsyncStorage.getItem(keyPurchase);
    data != null && setPurchases(JSON.parse(data));
    setIsModalOpen(true);
  }
  
  function handleModalClose() {
    setIsModalOpen(false);
  }
 
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <HeaderScreen />
        <Form>
          <Fields>
            <HeaderContainer>
              <TitleForm>Compras:</TitleForm>
              <ButtonList onPress={handleModalOpen}>
                <TitleButtonList>Lista</TitleButtonList>
              </ButtonList>
            </HeaderContainer>
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
        <Modal visible={isModalOpen}>
          <ListPurchases
            closeListPurchase={handleModalClose}
            listPurchase={purchases}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}