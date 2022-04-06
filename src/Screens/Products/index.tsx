import React, { useState } from 'react';
import { Alert, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { InputForm } from '../../components/Forms/InputForm';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { Button } from '../../components/Forms/Button';
import { HeaderScreen } from '../../components/HeaderScreen';
import { FormDataProps } from '../../components/Forms/InputForm';
import { CategorySelect } from '../CategorySelect';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import {
  Container,
  Form,
  Fields,
  TitleForm
} from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é necessário'),
  price: Yup.number().required('O preço é necessário')
})

export function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Tipo'
  });
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema)
  });

  function closeModalCategory() {
    setIsModalOpen(false);
  }

  function openModalCategory() {
    setIsModalOpen(true);
  }

  function handleSubmitProduct(form: FormDataProps) {
    if (category.key === 'category')
      return Alert.alert('Selecione o tipo de produto.');

    const data = {
      category: form.category,
      name: form.name,
      price: form.price,
      photo: form.photo
    };
    console.log(data);
    Alert.alert('Produto cadastrado com sucesso!');
    reset();
    setCategory({
      key: 'category',
      name: 'Tipo'
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <HeaderScreen />
        <Form>
          <Fields>
            <TitleForm>Produtos:</TitleForm>
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
            <InputForm
              name='photo'
              control={control}
              placeholder='Foto'
              autoCapitalize='characters'
              keyboardType='url'
            />
          </Fields>
          <Button
            title='Cadastrar'
            onPress={handleSubmit(handleSubmitProduct)}
          />
        </Form>

        <Modal visible={isModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={closeModalCategory}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}