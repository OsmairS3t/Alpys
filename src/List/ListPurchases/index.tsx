import React, { useEffect } from 'react';
import { Alert, FlatList } from 'react-native';
import { HeaderScreen } from '../../components/HeaderScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { keyPurchase } from '../../utils/keyStorage';

import {
    Container,
    Header,
    Title,
    ButtonBack,
    Icon,
    ListPurchaseTotal,
    PurchaseName,
    Amount,
    Price,
    TotalPurchases,
    DeleteButton,
    IconDelete,
    FooterTotal
} from './styles';

export interface ListPurchaseProps {
    id: string;
    name: string;
    amount: number;
    price: string;
    datepurchase: Date;
}

interface Props {
    listPurchase: ListPurchaseProps[];
    setListPurchase: (listPurchase: ListPurchaseProps[]) => void;
    closeListPurchase: () => void;
    totalPurchases: string;
}

export function ListPurchases({ listPurchase, setListPurchase, closeListPurchase, totalPurchases }: Props) {

    function handleDeletePurchase(id: string, name: string) {
        Alert.alert(
            "Alerta de Exclusão",
            "Tem certeza que deseja excluir "+name+" ?",
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
            const currentData = await AsyncStorage.getItem(keyPurchase);
            let newData = currentData !== null && JSON.parse(currentData);
            for (let i = 0; i < newData.length; i++) {
                if (newData[i].id === id) {
                    newData.splice(i, 1);
                }
            }
            await AsyncStorage.removeItem(keyPurchase);
            await AsyncStorage.setItem(keyPurchase, JSON.stringify(newData));
            setListPurchase(newData);
            totalPurchases='0'
            return true;
        }
        catch (exception) {
            return false;
        }
    }

    return (
        <Container>
            <HeaderScreen />
            <Header>
                <Title>Lista de Compras:</Title>
                <ButtonBack onPress={closeListPurchase}>
                    <Icon name='corner-up-left' size={25} />
                </ButtonBack>
            </Header>

            <FlatList
                data={listPurchase}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ListPurchaseTotal>
                        <PurchaseName>{item.name}</PurchaseName>
                        <Amount>{item.amount}</Amount>
                        <Price>{item.price}</Price>
                        <DeleteButton onPress={() => handleDeletePurchase(item.id, item.name)}>
                            <IconDelete name="trash-2" size={20} />
                        </DeleteButton>
                    </ListPurchaseTotal>
                )}
            />
            <FooterTotal>
                <TotalPurchases>Total: {totalPurchases}</TotalPurchases>
            </FooterTotal>
        </Container>
    )
}
