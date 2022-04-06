import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
  Container,
  Icon,
  Title
 } from './styles';

const icons = {
  up: 'attach-money',
  down: 'money-off'
} 

interface Props extends TouchableOpacityProps {
  type: 'up' | 'down';
  title: string;
  isActive: boolean;
  onPress: ()=>void;
} 

export function TransactionTypeButton({title, type, isActive, onPress, ...rest}: Props) {
  return (
    <Container 
     isActive={isActive}
     type={type}
     onPress={onPress}
     {...rest}
     >
      <Icon 
        name={icons[type]} 
        type={type}
      />
      <Title>{title}</Title>
    </Container>
  )
}

