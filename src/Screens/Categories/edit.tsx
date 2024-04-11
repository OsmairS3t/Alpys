import { useState } from "react";
import { Alert, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { keyCategory } from '../../utils/keyStorage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { useForm } from 'react-hook-form';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

import { HeaderScreen } from "../../components/HeaderScreen";
import { FormDataProps, InputForm } from "../../components/Forms/InputForm";

import {
  Container,
  HeaderContainer,
  ButtonList,
  TitleButtonList,
  Form,
  Fields,
  TitleForm
} from './styles';
import { Button } from "../../components/Forms/Button";
import { useNavigation } from "@react-navigation/native";

const schema = Yup.object().shape({
  name: Yup.string().required('O nome da categoria é necessário'),
})

interface EditProps {
  category: {
    id: string;
    name: string;
  }
  closeEditCategory?: () => void;
}

export default function EditCategory({category, closeEditCategory}: EditProps) {
  const [name, setName] = useState(category.name)
  const { 
    handleSubmit, 
    control, 
    reset, 
    formState: { errors }
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema)
  });
  
  function handleSubmitCategory(form: FormDataProps) {
    console.log(form)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <HeaderScreen />
        <HeaderContainer>
          <TitleForm>Categorias:</TitleForm>
          <ButtonList onPress={closeEditCategory}>
            <TitleButtonList>Voltar</TitleButtonList>
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
              value={name}
              autoCorrect={false}
              />
          </Fields>
          <Button
            title='Alterar'
            onPress={handleSubmit(handleSubmitCategory)}
          />
        </Form>

      </Container>
    </TouchableWithoutFeedback>
  )
}