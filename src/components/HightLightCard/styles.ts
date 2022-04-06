import styled, { css } from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface TypeProps {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme, type }) => 
  type === 'total' ? theme.colors.secondary : theme.colors.shape};
  width: ${RFValue(300)}px;
  border-radius: 10px;
  padding: 10px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ type, theme }) => 
  type === 'total' ? theme.colors.shape : theme.colors.background};
`;

export const Footer = styled.View``;

export const Price = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.background};
  font-size: ${RFValue(20)}px;
  margin-bottom: 5px;
`;

export const LastTransaction = styled.Text`
  font-family: ${({ theme }) => theme.fonts.light};
  color: ${({ theme }) => theme.colors.background};
  font-size: 12px;
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(20)}px;

  ${({ type }) => type === 'up' && css`
    color: ${({ theme }) => theme.colors.success};
  `}

  ${({ type }) => type === 'down' && css`
    color: ${({ theme }) => theme.colors.attention};
  `}

  ${({ type }) => type === 'total' && css`
    color: ${({ theme }) => theme.colors.shape};
  `}
`;