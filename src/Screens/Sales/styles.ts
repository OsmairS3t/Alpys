import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Form = styled.View`
  flex: 1;
  margin: 0 20px 8px 20px;
  justify-content: space-between;
`;

export const TitleForm = styled.Text`
  color: ${({ theme }) => theme.colors.light};
  font-size: ${RFValue(25)}px;
  margin: 20px 0;
`;

export const GroupFields = styled.View``;

export const Fields = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const Field = styled.View`
  width: 180px;
`;

export const GroupTitleForm = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ListSalesButton = styled(TouchableOpacity)`
  border: 0px;
  background-color: transparent;
  `;

export const TitleListSalesButton = styled.Text`
  font-size: ${RFValue(13)}px;
  color: ${({ theme }) => theme.colors.light};
`;

export const TextInputForm = styled.TextInput`
  width: 100%;
  padding: 16px 18px;
  font-size: ${RFValue(14)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  margin-bottom: 8px;
`;
