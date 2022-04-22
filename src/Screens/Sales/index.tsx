import React, { useEffect, useState } from 'react';
import { Alert, TouchableWithoutFeedback, Keyboard, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { HeaderScreen } from '../../components/HeaderScreen';
import { ProductSelect } from '../../components/ProductSelect';
import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { FormDataProps } from '../../components/Forms/InputForm'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { ProductSelectButton } from '../../components/Forms/ProductSelectButton';

import { ListSales } from '../../List/ListSales';
//import { ListSalesProps } from '../../List/ListSales';
import { ListProductsProps } from '../../List/ListProducts';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { keyTransaction } from '../../utils/keyStorage';
import { keyProduct } from '../../utils/keyStorage';

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

const schema = Yup.object().shape({
  client: Yup.string(),
  product: Yup.string().required('é necessário informar o nome do Produto'),
  amount: Yup.number().typeError('Informe um valor numérico'),
})

/* export interface ITransactionProps {
  description: client - category - product;
  modality: 'sell';
  modalityicon: 'dollar-sign';
  datetransaction: datesale;
  price: total;
} 
export interface ListSalesProps {
  id: string;
  client: string;
  phone: string;
  product: string;
  amount: string;
  total: number;
  ispaid: boolean;
  datesale: string;
}*/

import { ITransactionProps } from '../../utils/transactions';

export function Sales() {
  const [totalSale, setTotalSale] = useState(0);
  const [totalPriceProduct, setTotalPriceProduct] = useState(0);
  const [sales, setSales] = useState<ITransactionProps[]>([]);
  const [products, setProducts] = useState<ListProductsProps[]>([]);
  const [isModalOpenProducts, setIsModalOpenProducts] = useState(false);
  const [isModalListOpen, setIsModalListOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [descriptionPaid, setDescriptionPaid] = useState('Pagamento Pendente');
  const [objProduct, setObjProduct] = useState<ListProductsProps>({
    id: '',
    category: '',
    name: 'Produto',
    price: 0,
    photo: ''
  });

  const { handleSubmit, control, reset, formState: { errors }
  } = useForm<FormDataProps>();

  function handleChangePaid() {
    setIsPaid(!isPaid);
    !isPaid ? setDescriptionPaid('Pagamento Confirmado') : setDescriptionPaid('Pagamento Pendente');
  }

  async function handOpenleListSales() {
    let sumSale = 0;
    const response = await AsyncStorage.getItem(keyTransaction);
    const dataListSales: ITransactionProps[] = response ? JSON.parse(response) : [];
    let listSalesResponse: ITransactionProps[] = dataListSales.filter(transaction => transaction.modality !== 'buy');
    const dataListSalesFormatted = listSalesResponse
    .map((item: ITransactionProps) => {
      sumSale += Number(item.price);
      const dateFormatted = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(item.datetransaction));
      return {
        id: item.id,
        description: item.description,
        modality: item.modality,
        modalityicon: item.modalityicon,
        amount: item.amount,
        price: item.price,
        ispaid: item.ispaid,
        datetransaction: dateFormatted
      }
    });
    setTotalSale(sumSale);
    setSales(dataListSalesFormatted);
    setIsModalListOpen(true);
  }

  function handCloseleListSales() {
    setIsModalListOpen(false);
  }

  async function handleOpenModalProducts() {
    const dataProducts = await AsyncStorage.getItem(keyProduct);
    dataProducts != null && setProducts(JSON.parse(dataProducts));
    setIsModalOpenProducts(true);
  }

  function handleCloseModalProducts() {
    setIsModalOpenProducts(false);
  }

  async function handleSubmitSale(form: FormDataProps) {
    setTotalPriceProduct(form.amount * objProduct.price);

    if (objProduct.name === 'Produto')
      return Alert.alert('Selecione o produto.');
    
    const dataSales = {
      id: uuid.v4().toString(),
      description: `${form.client} - ${objProduct.category} (${objProduct.name})`,
      modality: 'sell',
      modalityicon: 'dollar-sign',
      amount: form.amount,
      price: form.amount * objProduct.price,
      ispaid: isPaid,
      datetransaction: new Date()
    }
    try {
      const data = await AsyncStorage.getItem(keyTransaction);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [
        ...currentData,
        dataSales
      ]
      await AsyncStorage.setItem(keyTransaction, JSON.stringify(dataFormatted));
      Alert.alert('Venda cadastrada com sucesso!');
      setObjProduct({
        id: '',
        category: 'Categoria',
        name: 'Produto',
        price: 0,
        photo: '',
      })
      reset();
      setIsPaid(false);
      setDescriptionPaid('Pagamento Pendente');
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel salvar');
    }
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
            <ProductSelectButton
              subTitle={objProduct.category}
              title={objProduct.name}
              onPress={handleOpenModalProducts}
            />
            <InputForm
              placeholder='Quantidade'
              name='amount'
              control={control}
              error={errors.amount && errors.amount.message}
              keyboardType='numeric'
            />
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
            listSale={sales}
            setListSale={setSales}
            closeListSales={handCloseleListSales}
            totalSale={totalSale}
          />
        </Modal>

        <Modal visible={isModalOpenProducts}>
          <ProductSelect
            listProducts={products}
            product={objProduct}
            setProduct={setObjProduct}
            closeSelectProduct={handleCloseModalProducts}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
