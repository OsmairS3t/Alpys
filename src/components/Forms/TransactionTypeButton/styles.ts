import styled, { css } from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface ContainerProps {
  isActive: boolean;
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 16px;

  ${({ isActive }) => isActive && css`
    background-color: ${({ theme }) => theme.colors.success_light };
  `}
  ${({ isActive }) => !isActive && css`
    background-color: ${({ theme }) => theme.colors.attention_light };
  `}
`;

export const Icon = styled(MaterialIcons)<ContainerProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.colors.text};
  margin-right: 12px;
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.success : theme.colors.attention 
  }
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;
