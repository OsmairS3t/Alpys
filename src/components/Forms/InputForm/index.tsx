import React from 'react';
import { TextInputProps } from 'react-native'
import { Controller, Control } from 'react-hook-form';

import { Input } from '../Input';

import { Container, Error } from './styles';
import { FormDataProps } from '../../../Screens/Register';

interface Props extends TextInputProps {
  control: Control<FormDataProps>;
  name: 'name' | 'price' | 'amount' | 'unit';
  error: string | undefined;
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
        render={({ field: {onChange, value} }) => (
          <Input
            onChangeText={onChange}
            value={value as string}
            {...rest}
          />
        )}
        name={name}
      />
      {error && <Error>{ error }</Error>}
    </Container>
  )
}
