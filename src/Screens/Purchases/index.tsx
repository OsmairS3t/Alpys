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
import { keyTransaction } from '../../utils/keyStorage';

import {
  Container,
  HeaderContainer,
  ButtonList,
  TitleButtonList,
  Form,
  Fields,
  TitleForm
} from './styles';
import { ITransactionProps } from '../../utils/transactions';

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
  const [totalPurchase, setTotalPurchase] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [listPurchase, setListPurchase] = useState<ITransactionProps[]>([]);
  const { handleSubmit, control, reset, formState: { errors } } = useForm<FormDataProps>({resolver: yupResolver(schema)});

  async function handleSubmitPurchase(form: FormDataProps) {
    const dataPurchase = {
      id: uuid.v4(),
      description: form.name,
      modality: 'buy',
      modalityicon: 'dollar-sign',
      ispaid: true,
      amount: form.amount,
      price: form.price,
      datetransaction: new Date()
    }
    try {
      const data = await AsyncStorage.getItem(keyTransaction);
      const currentData:ITransactionProps[] = data ? JSON.parse(data) : [];
      const dataFormatted = [
        ...currentData,
        dataPurchase
      ]
      await AsyncStorage.setItem(keyTransaction, JSON.stringify(dataFormatted));
      Alert.alert('Compra cadastrada com sucesso');
      reset();

    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel cadastrar');
    }
  }
        /* const dateFormatted = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.datetransaction)); */

  async function handleModalPurchasesOpen() {
    let sumPurchase = 0;
    const response = await AsyncStorage.getItem(keyTransaction);
    const dataPurchase = response ? JSON.parse(response) : [];
    const dataPurchaseFormatted:ITransactionProps[] = dataPurchase
    .map((item: ITransactionProps) => {
      sumPurchase += item.price;
      return {
        id: item.id,
        description: item.description,
        modality: item.modality,
        modalityicon: item.modalityicon,
        amount: item.amount,
        price: item.price,
        datetransaction: item.datetransaction,
        ispaid: item.ispaid
      }
    });
    setTotalPurchase(sumPurchase);
    setListPurchase(dataPurchaseFormatted);
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
              <ButtonList onPress={handleModalPurchasesOpen}>
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
            setListPurchase={setListPurchase}
            listPurchase={listPurchase}
            totalPurchases={totalPurchase}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}