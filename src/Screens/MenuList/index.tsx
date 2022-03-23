import React, {useState} from 'react';
import { FlatList } from 'react-native';
import { menucadastro } from '../../utils/menucadastro';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Header,
  Title,
  Menu,
  Icon,
  Name,
  Separator
} from './styles';

interface Menu {
  key: string;
  name: string;
  icon: string;
}

export function MenuList() {
  const navigation = useNavigation();
  const [isActive, setIsActive] = useState(false);

  function handleMenuSelect(menu: Menu) {
    console.log(menu);
  }

  return (
    <Container>
      <Header>
        <Title>CADASTRO:</Title>
      </Header>

      <FlatList
        data={menucadastro}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Menu onPress={() => handleMenuSelect(item)}>
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Menu>
        )}
        ItemSeparatorComponent={Separator}
      />
    </Container>
  )
}