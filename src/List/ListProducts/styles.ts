import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import theme from '../../global/styles/theme';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;
  
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-size: ${RFValue(25)}px;
  margin: 20px 0;
  padding: 4px 24px;
`;
  
export const ButtonBack = styled.TouchableOpacity`  
  width: 80px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;
  
export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.shape};
`;

export const ListProductTotal = styled.View`
  padding: 5px 24px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: ${({ theme })=> theme.colors.text};
  border-style: solid;
`;

export const ProductCategory = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  margin-right: 10px;
`;
  
export const ProductName = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.shape};
`;
  
export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  margin-right: 15px;
`;
  
export const Price = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
`;

export const DeleteButton = styled.TouchableOpacity`
margin-left: 10px;
`;

export const IconDelete = styled(Feather)`
color: ${({ theme }) => theme.colors.shape};
`;

