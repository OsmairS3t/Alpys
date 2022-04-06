import React from 'react';
import { TextInputProps } from 'react-native'
import { Controller, Control } from 'react-hook-form';

import { Input } from '../Input';

import { Container, Error } from './styles';

interface Produto {
  name: string;
  price: number;
}

export interface FormDataProps{
  client: string;
  phone: string;
  product: Produto;
  category: string;
  name: string;
  amount: number;
  price: number;
  total: number;
  paid: boolean;
  photo: string;
}

interface Props extends TextInputProps {
  control: Control<FormDataProps>;
  name: 'client' | 
        'phone' | 
        'product' | 
        'category' | 
        'name' | 
        'amount' | 
        'price' | 
        'total' | 
        'paid' | 
        'photo';
  error?: string | undefined;
}

export function InputForm({
  control,
  name,
  error,
  ...rest
}: Props) {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: {onChange, value} }) => (
          <Input
            onChangeText={onChange}
            value={value as string}
            {...rest}
          />
        )}
      />
      {error && <Error>{ error }</Error>}
    </Container>
  )
}
