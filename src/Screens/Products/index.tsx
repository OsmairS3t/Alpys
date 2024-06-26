import React, { useEffect, useState } from 'react';
import { Alert, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { InputForm } from '../../components/Forms/InputForm';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { Button } from '../../components/Forms/Button';
import { HeaderScreen } from '../../components/HeaderScreen';
import { FormDataProps } from '../../components/Forms/InputForm';
import { CategorySelect } from '../../components/CategorySelect';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import { ListProducts } from '../../List/ListProducts';
import { ListProductsProps } from '../../List/ListProducts';

import { keyProduct } from '../../utils/keyStorage';

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
  name: Yup.string().required('O nome é necessário'),
  price: Yup.number().required('O preço é necessário')
})

export function Products() {
  const [listProducts, setListProducts] = useState<ListProductsProps[]>([]);
  const [isModalOpenCategory, setIsModalOpenCategory] = useState(false);
  const [isModalOpenProducts, setIsModalOpenProducts] = useState(false);
  const [category, setCategory] = useState({
    id: 'category',
    name: 'Tipo',
    icon: 'image'
  });
  const { handleSubmit, control, reset, formState: { errors }} = useForm<FormDataProps>({resolver: yupResolver(schema)});

  function closeModalCategory() {
    setIsModalOpenCategory(false);
  }

  function openModalCategory() {
    setIsModalOpenCategory(true);
  }

  async function handleModalProductOpen() {
    const response = await AsyncStorage.getItem(keyProduct);
    const dataProduct = response ? JSON.parse(response) : [];
    const dataProductFormatted: ListProductsProps[] = dataProduct
    .map((item: ListProductsProps) => {
      const price = Number(item.price).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      });
      return {
        id: item.id,
        category: item.category,
        name: item.name,
        price,
        photo: item.photo
      }
    });
    setListProducts(dataProductFormatted);
    setIsModalOpenProducts(true);
  }
  
  function handleModalClose() {
    setIsModalOpenProducts(false);
  }

  async function handleSubmitProduct(form: FormDataProps) {
    if (category.id === 'category')
      return Alert.alert('Selecione o tipo de produto.');
    
    const dataProducts = {
      id: uuid.v4(),
      category: category.name,
      name: form.name,
      price: form.price,
      photo: form.photo
    };

    try {
      const data = await AsyncStorage.getItem(keyProduct);
      const currentData = data ? JSON.parse(data) : [];  
      const dataFormatted = [
        ...currentData,
        dataProducts
      ]
      await AsyncStorage.setItem(keyProduct, JSON.stringify(dataFormatted));
      Alert.alert('Produto cadastrado com sucesso!');
      setCategory({
        id: 'category',
        name: 'Tipo',
        icon: 'image'
      })
      reset();
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
          <Fields>
            <HeaderContainer>
              <TitleForm>Produtos:</TitleForm>
              <ButtonList onPress={handleModalProductOpen}>
                <TitleButtonList>Lista</TitleButtonList>
              </ButtonList>
            </HeaderContainer>

            <CategorySelectButton
              title={category.name}
              onPress={openModalCategory}
            />
            <InputForm
              name='name'
              control={control}
              error={errors.name && errors.name.message}
              placeholder='Nome'
              autoCapitalize='characters'
              autoCorrect={false}
            />
            <InputForm
              name='price'
              control={control}
              error={errors.price && errors.price.message}
              placeholder='Preço'
              autoCapitalize='characters'
              keyboardType='numeric'
            />
          </Fields>
          <Button
            title='Cadastrar'
            onPress={handleSubmit(handleSubmitProduct)}
          />
        </Form>

        <Modal visible={isModalOpenCategory}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={closeModalCategory}
          />
        </Modal>
        <Modal visible={isModalOpenProducts}>
          <ListProducts
            listProduct={listProducts}
            setListProduct={setListProducts}
            closeListProduct={handleModalClose}
          />
        </Modal>

      </Container>
    </TouchableWithoutFeedback>
  )
}