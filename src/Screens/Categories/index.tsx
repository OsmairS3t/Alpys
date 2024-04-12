import React, { useState } from 'react';
import { Alert, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { keyCategory } from '../../utils/keyStorage'

import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../components/Forms/Input';

import { HeaderScreen } from '../../components/HeaderScreen';
import { Button } from '../../components/Forms/Button';
import { ListCategories, ListCategoriesProps } from '../../List/ListCategories';
import { ICategory } from '../../utils/interface';

import {
  Container,
  HeaderContainer,
  ButtonList,
  TitleButtonList,
  Form,
  Fields,
  TitleForm,
  ErrorMessage
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome da categoria é necessário'),
})

export default function Categories() {
  const [listCategories, setListCategories] = useState<ListCategoriesProps[]>([]);
  const [isModalOpenCategory, setIsModalOpenCategory] = useState(false);
  const { 
    handleSubmit, 
    control, 
    reset, 
    formState: { 
      errors 
    }} = useForm<ICategory>({
      resolver: yupResolver(schema)
    });
  
  function closeModalCategory() {
    setIsModalOpenCategory(false);
  }

  async function handleModalCategoryOpen() {
    const response = await AsyncStorage.getItem(keyCategory);
    const dataCategory = response ? JSON.parse(response) : [];
    const dataCategoryFormatted: ICategory[] = dataCategory
    .map((item: ICategory) => {
      return {
        id: item.id,
        name: item.name,
        icon: item.icon
      }
    });
    setListCategories(dataCategoryFormatted);
    setIsModalOpenCategory(true);
  }
  
  async function handleSubmitCategory(form: ICategory) {
    const dataCategory = {
      id: uuid.v4(),
      name: form.name,
      icon: form.icon
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
      Alert.alert('Categoria cadastrada com sucesso!');
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
        <HeaderContainer>
          <TitleForm>Categorias:</TitleForm>
          <ButtonList onPress={handleModalCategoryOpen}>
            <TitleButtonList>Listar</TitleButtonList>
          </ButtonList>
        </HeaderContainer>

        <Form>
          <Fields>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Categoria"
                  autoCapitalize='characters'
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="name"
              />
              {errors.name && <ErrorMessage>errors.name.message</ErrorMessage>}
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  placeholder="Icone"
                  autoCapitalize='none'
                  autoCorrect={false}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="icon"
              />
              {errors.name && <ErrorMessage>errors.name.message</ErrorMessage>}
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
