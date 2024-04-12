import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../Forms/Button';
import { featherIcons } from '../../utils/database';
import { IIcon } from '../../utils/interface';

import { 
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer
 } from './styles';

interface IconProps {
  icon: IIcon;
  setIcon: (icon: IIcon) => void;
  closeSelectIcon: () => void;
}
export function IconSelect({ icon, setIcon, closeSelectIcon }: IconProps) {

  function handleIconSelect(icon: IIcon) {
    setIcon(icon);
  }

  return (
    <Container>
      <Header>
        <Title>Ícone</Title>
      </Header>

      <FlatList 
        data={featherIcons}
        style={{ flex: 1, width: '100%'}}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleIconSelect(item)}
            isActive={icon.name === item.name}
          >
            <Icon name={item.name} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={Separator}
      />

      <Footer>
        <Button 
          title='Selecionar' 
          onPress={closeSelectIcon}  
        />
      </Footer>
    </Container>
  )
}
