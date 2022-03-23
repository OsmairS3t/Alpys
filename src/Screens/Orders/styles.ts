import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;
  padding-bottom: 19px;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(20)}px;
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
`;

export const GroupFields = styled.View``;

export const Fields = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Field = styled.View`
  width: 201px;
`;