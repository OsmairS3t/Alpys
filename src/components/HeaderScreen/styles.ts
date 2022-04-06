import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(100)}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  align-items: center;
  padding-top: 44px;
`;

export const ImgLogo = styled.Image`
  width: 137px;
  height: 52px;
`;
