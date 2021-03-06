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
    price: number;
    photo: string;
}

interface Props {
    listProduct: ListProductsProps[];
    setListProduct: (listProducts: ListProductsProps[]) => void;
    closeListProduct: () => void;
}

export function ListProducts({ listProduct, setListProduct, closeListProduct }: Props) {
    const totalProduct = 100;

    function handleDeleteProduct(id: string, category: string, name: string) {
        Alert.alert(
            "Alerta de Exclusão",
            "Tem certeza que deseja excluir "+category+" ("+name+") ?",
            [
                {
                    text: "Não",
                    onPress: () => {},
                    style: "cancel"
                },
                {
                    text: "Sim",
                    onPress: () => {
                        deleteItem(id);
                    }
                }
            ]
        );
    }

    async function deleteItem(id: string) {
        try {
            const response = await AsyncStorage.getItem(keyProduct);
            const newProductData: ListProductsProps[] = response ? JSON.parse(response) : [];
            let productArray: ListProductsProps[] = newProductData.filter(item => item.id !== id);
            await AsyncStorage.removeItem(keyProduct);
            await AsyncStorage.setItem(keyProduct, JSON.stringify(productArray));
            setListProduct(productArray);
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
