import React from 'react';

import { 
  Container, 
  Product,
  Icon
} from './styles';

interface Props {
  title: string;
  onPress: () => void;
}

export function ProductSelectButton({title , onPress}: Props) {
  return (
    <Container onPress={onPress}>
      <Product>{title}</Product>
      <Icon name="chevron-down" />
    </Container>
  )
}

