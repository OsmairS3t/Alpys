import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
  Container,
  Icon,
  Title
 } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  isActive: boolean;
  onPress: ()=>void;
} 

export function TransactionTypeButton({title, isActive, onPress, ...rest}: Props) {
  return (
    <Container 
     isActive={isActive}
     onPress={onPress}
     {...rest}
     >
      <Icon 
        name={isActive ? 'attach-money' : 'money-off'} 
        isActive={isActive}
      />
      <Title>{title}</Title>
    </Container>
  )
}

