import React, {useEffect} from 'react';
import { Alert, FlatList } from 'react-native';
import { HeaderScreen } from '../../components/HeaderScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { keyProduct } from '../../utils/keyStorage';

import {
    Container,
    Header,
    Title,
    ButtonBack,
    Icon,
    ListProductTotal,
    ProductCategory,
    ProductName,
    Amount,
    Price,
    DeleteButton,
    IconDelete,
} from './styles';

export interface ListProductsProps {
    id: string;
    category: string;
    name: string;
    price: string;
    photo: string;
}

interface Props {
    listProduct: ListProductsProps[];
    setListProduct: (listProducts: ListProductsProps[]) => void;
    closeListProduct: () => void;
}

export function ListProducts({ listProduct, setListProduct, closeListProduct }: Props) {
    const totalProduct = 100;

    async function handleDeleteProduct(id: string, category: string, name: string) {
        try {
            Alert.alert(`Tem certeza que deseja excluir ${name}.?`);
            const currentData = await AsyncStorage.getItem(keyProduct);
            let newData = currentData !== null && JSON.parse(currentData);
            for(let i=0; i<newData.length; i++) {
                if(newData[i].id === id) {
                  newData.splice(i, 1);
                }
            }    
            await AsyncStorage.removeItem(keyProduct);
            await AsyncStorage.setItem(keyProduct, JSON.stringify(newData));
            setListProduct(newData);
            return true;
        }
        catch(exception) {
            return false;
        }
    }

    return (
        <Container>
            <HeaderScreen />
            <Header>
                <Title>Lista de Produtos:</Title>
                <ButtonBack onPress={closeListProduct}>
                    <Icon name='corner-up-left' size={25} />
                </ButtonBack>
            </Header>

            <FlatList
                data={listProduct}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ListProductTotal>
                        <ProductCategory>{item.category}</ProductCategory>
                        <ProductName>({item.name})</ProductName>
                        <Price>{item.price}</Price>
                        <DeleteButton onPress={() => handleDeleteProduct(item.id, item.category, item. name)}>
                            <IconDelete name="trash-2" size={20}/>
                        </DeleteButton>
                    </ListProductTotal>
                )}
            />
        </Container>
    )
}
