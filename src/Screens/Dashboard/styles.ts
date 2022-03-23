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
  background-color: ${({ theme })=> theme.colors.background};
  height: ${RFPercentage(35)}px;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const UserWraper = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 0 ${RFValue(24)}px;
  margin-top: ${getStatusBarHeight() + RFValue(35)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const UserInfo = styled.View`
  flex-direction: row;
`;

export const Photo = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 10px;
`;

export const User = styled.View`
  margin: 0 17px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: 18px;
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 18px;
`;

export const LogoutButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 24px;
`;

export const GroupHeaderTitle = styled.View`
  width: 100%;
  margin-top: 20px;
  padding: 0 21px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

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
  margin: 10px 21px 0px 21px;
  padding: 10px 0px;
  height: ${RFValue(300)}px;
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


