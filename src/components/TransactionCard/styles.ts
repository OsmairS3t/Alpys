import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface TransactionProps {
  type: 'positive' | 'negative';
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape_light};
  border-radius: 5px;
  padding: 10px 16px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
`;

export const Amount = styled.Text<TransactionProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) => 
  type === 'positive' ? theme.colors.success : theme.colors.attention};
  margin-top: 2px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const CategoryName = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.primary};
  margin-left: 10px;
`;

export const Date = styled.Text`
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.primary};
`;


