import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize'; 

export const Container = styled.View`
  margin: 8px 0px;
`;

export const Error = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.attention};
  margin: 7px 0;
`;
