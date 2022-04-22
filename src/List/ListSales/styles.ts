import { Feather, MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface PaidProps {
  isPaid: boolean;
}

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
  border-color: ${({ theme }) => theme.colors.text};
  border-style: solid;
`;

export const GroupList = styled.View``;

export const Description = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  margin-right: 5px;
  font-size: ${RFValue(14)}px;
`;

export const Price = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;

export const GroupButton = styled.View`
  flex-direction: row;
`;

export const DeleteButton = styled.TouchableOpacity`
  margin: 15px 0px;
`;

export const IconEdit = styled(MaterialIcons)<PaidProps>`
  color: ${({ theme, isPaid }) => 
    isPaid ? theme.colors.success : theme.colors.attention
  };
`;

export const IconDelete = styled(Feather)`
color: ${({ theme }) => theme.colors.shape};
`;

export const EditButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
  border-radius: 10px;
`;

export const FooterTotal = styled.View`
  border-top-width: 1px;
  border-color: ${({ theme }) => theme.colors.text};
  border-style: dotted;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0px 24px 60px 24px;
`;

export const TotalSales = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;