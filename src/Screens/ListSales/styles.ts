import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  `;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-size: ${RFValue(25)}px;
  margin: 20px 0;
  padding: 4px 24px;
  `;

export const ListSalesTotal = styled.View`
  padding: 4px 24px;
  width: 100%;
  border-bottom-width: 1px;
  border-color: ${({ theme })=> theme.colors.text};
  border-style: solid;
`;

export const GroupTitle = styled.View`
  flex-direction: row;
  padding: 0px;
`;

export const ClientName = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};
  width: 200px;
  `;

export const ClientPhone = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.colors.title};
  width: 146px;
`;

export const GroupList = styled.View`
  flex-direction: row;
`;

export const ProductName = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  width: 200px;
  font-size: ${RFValue(14)}px;
`;

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  margin-right: 30px;
  font-size: ${RFValue(14)}px;
`;

export const Price= styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;
