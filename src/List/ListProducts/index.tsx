import React, {useEffect} from 'react';
import { Alert, FlatList } from 'react-native';
import { HeaderScreen } from '../../components/HeaderScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    TotalProduct,
    DeleteButton,
    IconDelete,
    FooterTotal
} from './styles';

export interface ListProductsProps {
    id: string;
    category: string;
    name: string;
    price: number;
    photo: string;
}

interface Props {
    listProducts: ListProductsProps[];
    closeListProduct: () => void;
}

export function ListProducts({ listProducts, closeListProduct }: Props) {
    const dataKey = "@AlphysChoco-Product";
    const totalProduct = 100;

    async function handleDeleteProduct(name: string) {
        try {
            const data = await AsyncStorage.getItem(dataKey);
            await AsyncStorage.removeItem(dataKey);
            //Alert.alert(`${name} deletado ja.`);
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
                data={listProducts}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <ListProductTotal>
                        <ProductCategory>{item.category}</ProductCategory>
                        <ProductName>({item.name})</ProductName>
                        <Price>R$ {item.price},00</Price>
                        <DeleteButton onPress={() => handleDeleteProduct(item.name)}>
                            <IconDelete name="trash-2" size={20}/>
                        </DeleteButton>
                    </ListProductTotal>
                )}
            />
            <FooterTotal>
                <TotalProduct>Total: {totalProduct},00</TotalProduct>
            </FooterTotal>
        </Container>
    )
}
