import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

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

export const ListSalesTotal = styled.View`
  padding: 4px 24px;
  width: 100%;
  border-bottom-width: 1px;
  border-color: ${({ theme })=> theme.colors.text};
  border-style: solid;
`;

export const GroupList = styled.View``;

export const ClientName = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Paid = styled.Text`
  color: ${({theme})=>theme.colors.success};
`;

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  margin-right: 5px;
  font-size: ${RFValue(14)}px;
`;

export const ProductName = styled.Text`
  flex: 1;  
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;

export const Price= styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;

export const GroupButton = styled.View`
  flex-direction: row;
`;

export const DeleteButton = styled.TouchableOpacity`
  margin: 15px 0px;
`;

export const EditButton = styled.TouchableOpacity`
  margin: 15px;
`;

export const IconDelete = styled(Feather)`
  color: ${({ theme }) => theme.colors.shape};
`;

export const IconEdit = styled(Feather)`
  color: ${({ theme }) => theme.colors.shape};
`;