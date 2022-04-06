import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Form = styled.View`
  flex: 1;
  margin: 0 20px 8px 20px;
  justify-content: space-between;
`;

export const Fields = styled.View``;

export const TitleForm = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-size: ${RFValue(25)}px;
  margin: 20px 0;
`;
