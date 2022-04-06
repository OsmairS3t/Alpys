import React from 'react';

import {
  Container,
  ImgLogo
} from './styles';

const logo = '../../assets/logo_alpys.png';

export function HeaderScreen() {
  return (
    <Container>
      <ImgLogo source={require(logo)} />
    </Container>
  )
}