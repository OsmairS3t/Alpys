import React, { useState } from 'react';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputForm } from '../../components/Forms/InputForm';
import { Button } from '../../components/Forms/Button';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { UnitSelectButton } from '../../components/Forms/UnitSelectButton';
import { CategorySelect } from '../../Screens/CategorySelect';
import { UnitSelect } from '../../Screens/UnitSelect';
import { useForm } from 'react-hook-form';

export interface FormDataProps {
  name: string;
  price: string;
  amount: string;
  unit: string;
}

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
  GroupInput,
  GroupInputAmount,
  GroupInputUnit
} from './styles';

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Nome é obrigatório'),
  price: Yup
    .number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo'),
  amount: Yup
    .number()
    .typeError('Informe um valor Numérico')
    .required('A quantidade é obrigatória')
});

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [unitModalOpen, setUnitModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });
  const [unit, setUnit] = useState({
    key: 'key',
    name: 'unit'
  });
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenModalSelectCategory() {
    setCategoryModalOpen(true);
  }

  function handleCloseModalSelectCategory() {
    setCategoryModalOpen(false);
  }

  function handleOpenModalSelectUnit() {
    setUnitModalOpen(true);
  }
  
  function handleCloseModalSelectUnit() {
    setUnitModalOpen(false);
  }

  function handleRegister(form: FormDataProps) {
    if(!transactionType)
      return Alert.alert('Selecione o tipo de transação');
    
    if(category.key === 'category')
      return Alert.alert('Selecione a categoria');

    const data = {
      name: form.name,
      price: form.price,
      transactionType,
      category: category.key,
      amount: form.amount
    }
    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder='Nome'
              autoCapitalize='characters'
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              name="price"
              control={control}
              placeholder='Preço'
              keyboardType='decimal-pad'
              error={errors.price && errors.price.message}
            />

            <TransactionTypes>
              <TransactionTypeButton
                type='up'
                title='Entrada'
                onPress={() => handleTransactionsTypeSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton
                type='down'
                title='Saída'
                onPress={() => handleTransactionsTypeSelect('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenModalSelectCategory}
            />
            
            <GroupInput>
              <GroupInputAmount>
                <InputForm
                  name="amount"
                  control={control}
                  placeholder='Quantidade'
                  keyboardType='numeric'
                  error={errors.amount && errors.amount.message}
                />
              </GroupInputAmount>
              <GroupInputUnit>
                <UnitSelectButton 
                  title={unit.name}
                  onPress={handleOpenModalSelectUnit}
                />
              </GroupInputUnit>
            </GroupInput>
            
          </Fields>

          <Button
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseModalSelectCategory}
          />
        </Modal>

        <Modal visible={unitModalOpen}>
          <UnitSelect 
            category={unit}
            setCategory={setUnit}
            closeSelectCategory={handleCloseModalSelectUnit}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}