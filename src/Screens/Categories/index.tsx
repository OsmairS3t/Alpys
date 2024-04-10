import React, { useEffect, useState } from 'react';
import { Alert, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { keyCategory } from '../../utils/keyStorage'

import { useForm } from 'react-hook-form';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import { HeaderScreen } from '../../components/HeaderScreen';
import { Button } from '../../components/Forms/Button';
import { InputForm } from '../../components/Forms/InputForm';
import { FormDataProps } from '../../components/Forms/InputForm';

import {
  Container,
  HeaderContainer,
  ButtonList,
  TitleButtonList,
  Form,
  Fields,
  TitleForm
} from './styles';
import { ListCategories, ListCategoriesProps } from '../../List/ListCategories';

const schema = Yup.object().shape({
  category: Yup.string().required('O nome da categoria é necessário'),
})

export default function Categories() {
  const { handleSubmit, control, reset, formState: { errors }} = useForm<FormDataProps>({resolver: yupResolver(schema)});
  const [listCategories, setListCategories] = useState<ListCategoriesProps[]>([]);
  const [isModalOpenCategory, setIsModalOpenCategory] = useState(false);
  
  function closeModalCategory() {
    setIsModalOpenCategory(false);
  }

  function openModalCategory() {
    setIsModalOpenCategory(true);
  }

  async function handleModalCategoryOpen() {
    const response = await AsyncStorage.getItem(keyCategory);
    const dataCategory = response ? JSON.parse(response) : [];
    const dataCategoryFormatted: ListCategoriesProps[] = dataCategory
    .map((item: ListCategoriesProps) => {
      return {
        id: item.id,
        name: item.name,
      }
    });
    setListCategories(dataCategoryFormatted);
    setIsModalOpenCategory(true);
  }
  
  async function handleSubmitCategory(form: FormDataProps) {
    const dataCategory = {
      id: uuid.v4(),
      category: form.name
    }
    console.log(dataCategory)
    try {
      const data = await AsyncStorage.getItem(keyCategory);
      const currentData = data ? JSON.parse(data) : [];  
      const dataFormatted = [
        ...currentData,
        dataCategory
      ]
      await AsyncStorage.setItem(keyCategory, JSON.stringify(dataFormatted));
      Alert.alert('Categoria cadastrada com sucesso!', JSON.stringify(dataFormatted));
      // reset();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel salvar');
    }    
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <HeaderScreen />
        <HeaderContainer>
          <TitleForm>Categorias:</TitleForm>
          <ButtonList onPress={handleModalCategoryOpen}>
            <TitleButtonList>Listar</TitleButtonList>
          </ButtonList>
        </HeaderContainer>

        <Form>
          <Fields>
          <InputForm
              name='name'
              control={control}
              error={errors.name && errors.name.message}
              placeholder='Categoria'
              autoCapitalize='characters'
              autoCorrect={false}
              />
          </Fields>
          <Button
            title='Cadastrar'
            onPress={handleSubmit(handleSubmitCategory)}
          />
        </Form>

        <Modal visible={isModalOpenCategory}>
          <ListCategories
            listCategory={listCategories}
            setListCategory={setListCategories}
            closeListCategory={closeModalCategory}
          />
        </Modal>

      </Container>
    </TouchableWithoutFeedback>
  )
}
