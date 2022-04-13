import React from 'react';

import { 
  Container, 
  GroupNameProduct,
  Category,
  Product,
  Icon
} from './styles';

interface Props {
  subTitle: string;
  title: string;
  onPress: () => void;
}

export function ProductSelectButton({subTitle, title , onPress}: Props) {
  return (
    <Container onPress={onPress}>
      <GroupNameProduct>
        <Category>{subTitle}</Category>
        <Product>{title}</Product>
      </GroupNameProduct>
      <Icon name="chevron-down" />
    </Container>
  )
}

