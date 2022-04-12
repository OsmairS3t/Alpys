import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const HeaderContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonList = styled.TouchableOpacity`
  background-color: transparent;
`;

export const TitleButtonList = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: ${RFValue(13)}px;
  color: ${({theme})=> theme.colors.shape};
`;

export const Form = styled.View`
  flex: 1;
  margin: 0 20px 8px 20px;
  justify-content: space-between;
`;

export const Fields = styled.View``;

export const TitleForm = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-size: ${RFValue(25)}px;
  margin: 20px 0;
`;
