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
    name: string;
    amount: number;
    price: number;
}

interface Props {
    listPurchase: ListPurchaseProps[];
    closeListPurchase: () => void;
}

export function ListPurchases({ listPurchase, closeListPurchase }: Props) {
    const dataKey = "@AlphysChoco";
    const totalPurchase = 100;

    useEffect(() => {
        async function loadPurchases() {
            //const dataPurchases = await AsyncStorage.getItem(dataKey);
            //const arrayPurchases = JSON.stringify(dataPurchases);
            //console.log(arrayPurchases);
        }
        loadPurchases;
    },[]);

    async function handleDeletePurchase(name: string) {
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
                <Title>Lista de Compras:</Title>
                <ButtonBack onPress={closeListPurchase}>
                    <Icon name='corner-up-left' size={25} />
                </ButtonBack>
            </Header>

            <FlatList
                data={listPurchase}
                style={{ flex: 1, width: '100%' }}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <ListPurchaseTotal>
                        <PurchaseName>{item.name}</PurchaseName>
                        <Amount>{item.amount}</Amount>
                        <Price>R$ {item.price},00</Price>
                        <DeleteButton onPress={() => handleDeletePurchase(item.name)}>
                            <IconDelete name="trash-2" size={20}/>
                        </DeleteButton>
                    </ListPurchaseTotal>
                )}
            />
            <FooterTotal>
                <TotalPurchases>Total: {totalPurchase},00</TotalPurchases>
            </FooterTotal>
        </Container>
    )
}
