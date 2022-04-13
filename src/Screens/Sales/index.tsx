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
import { ListSalesProps } from '../ListSales';
import { ProductSelectButton } from '../../components/Forms/ProductSelectButton';
import { ProductSelect } from '../ProductSelect';

const schema = Yup.object().shape({
  client: Yup.string(),
  product: Yup.string().required('é necessário informar o nome do Produto'),
  amount: Yup.number().typeError('Informe um valor numérico'),
  total: Yup.number(),
})

export function Sales() {
  const dataKey = "@AlphysChoco-Sales";
  const [isModalOpenProducts, setIsModalOpenProducts] = useState(false);
  const [isModalListOpen, setIsModalListOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [descriptionPaid, setDescriptionPaid] = useState('Pagamento Pendente');
  const [product, setProduct] = useState({
    category: '',
    name: 'Produto',
    price: 0,
    photo: ''
  });
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
  const products = [
    {
      "category": "Barra Recheada",
      "name": "Maracuja",
      "photo": "dd",
      "price": 3,
    },
    {
      "category": "Bombom",
      "name": "Morango",
      "photo": "dana",
      "price": 3,
    },
  ]
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

  function handleOpenModalProducts() {
    setIsModalOpenProducts(true);
  }

  function handleCloseModalProducts() {
    setIsModalOpenProducts(false);
  }

  async function handleSubmitSale(form: FormDataProps) {
    console.log('Teste cadastro de venda');
/*     if (product.name === 'Produto')
    return Alert.alert('Selecione o produto.');

    const dataSales = {
      client: form.client,
      product: form.product,
      amount: form.amount,
      total: form.total,
      paid: descriptionPaid
    }

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];  
      const dataFormatted = [
        ...currentData,
        dataSales
      ]
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));
      console.log(dataFormatted)
      Alert.alert('Venda cadastrada com sucesso!');
      setProduct({
        category: '',
        name: 'Produto',
        price: 0,
        photo: ''
      })
      reset();
      setIsPaid(false);
      setDescriptionPaid('Pagamento Pendente');
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel salvar');
    }
 */  
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
              subTitle={product.category}
              title={product.name}
              onPress={handleOpenModalProducts}
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

        <Modal visible={isModalOpenProducts}>
          <ProductSelect
            product={product}
            setProduct={setProduct}
            closeSelectProduct={handleCloseModalProducts}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
