import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface ProductSelectProps {
  isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  `;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(60)}px;
  padding-top: 4px;
  background-color: ${({ theme }) => theme.colors.secondary};
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
  margin-bottom: 1px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const ButtonProduct = styled.TouchableOpacity<ProductSelectProps>`
  width: 100%;
  padding: ${RFValue(15)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme, isActive }) => 
    isActive ? theme.colors.secondary : theme.colors.background
  };
`;

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
  margin-left: 10px;
  `;
  
export const Price = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.title};
`;

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`;

