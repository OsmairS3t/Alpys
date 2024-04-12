import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { ITransactionProps } from '../../utils/transactions';

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const HightLightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 16 }
})`
    position: relative;
    width: 100%;
    margin: 16px 0px;
`;

export const Content = styled.View`
  height: ${RFValue(400)}px;
  margin: 0px 10px 0px 10px;
  padding: 10px 0px;
  border-radius: 10px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  margin-bottom: 16px;
`;

export const TransactionList = styled(FlatList as new () => FlatList<ITransactionProps>)
  .attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      paddingBottom: getBottomSpace()
    }
  })``;

export const Teste = styled.Text`
  font-family: ${({theme})=>theme.fonts.regular};
  color: ${({theme})=>theme.colors.shape};
  `;
  
export const TextMessageEmpty = styled.Text`
  color: ${({theme})=>theme.colors.shape};
  font-size: ${RFValue(14)}px;
  font-family: ${({theme})=>theme.fonts.regular};
`;

/* export const TransactionList = styled(FlatList as new () => FlatList<DataListProps>)
  .attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
      paddingBottom: getBottomSpace()
    }
  })``; */