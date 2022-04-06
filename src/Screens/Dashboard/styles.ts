import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { Feather } from '@expo/vector-icons';

import { DataListProps } from '.';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(130)}px;
  background-color: ${({ theme })=> theme.colors.secondary};
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

export const LogoTipo = styled.Image``;

export const Titulo = styled.Text`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.title};
`;

export const ImgLogo = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
`;

export const HightLightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }
})`
  position: relative;
  width: 100%;
  `;

export const Content = styled.View`
  height: ${RFValue(400)}px;
  margin: 10px 10px 0px 10px;
  padding: 10px 0px;
  border-radius: 10px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  margin-bottom: 16px;
`;

export const TransactionList = styled(
  FlatList as new () => FlatList<DataListProps>
  ).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace()
  }
  })``;


