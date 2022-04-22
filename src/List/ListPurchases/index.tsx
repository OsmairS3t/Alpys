import React, { useState } from 'react';
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

import { ITransactionProps } from '../../utils/transactions';

interface Props {
    listPurchase: ITransactionProps[];
    setListPurchase: (listPurchase: ITransactionProps[]) => void;
    closeListPurchase: () => void;
    totalPurchases: number;
}

export function ListPurchases({ listPurchase, setListPurchase, closeListPurchase, totalPurchases }: Props) {
    console.log(listPurchase)
    const [totPurchase, setTotPurchase] = useState(totalPurchases);
    const [purchaseViewTotal, setPurchaseViewTotal] = useState(totalPurchases.toLocaleString('pt-BR', {
        style:'currency',
        currency: 'BRL'
    }));

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
            const response = await AsyncStorage.getItem(keyPurchase);
            const newPurchaseData:ITransactionProps[] = response ? JSON.parse(response) : [];
            let purchaseItem:ITransactionProps = newPurchaseData.find((item) => item.id === id) as ITransactionProps;
            let subPurchaseItem = totPurchase - purchaseItem.price;
            setTotPurchase(subPurchaseItem);
            let purchaseArray:ITransactionProps[] = newPurchaseData.filter(item => item.id !== id);
            await AsyncStorage.removeItem(keyPurchase);
            await AsyncStorage.setItem(keyPurchase, JSON.stringify(purchaseArray));
            setListPurchase(purchaseArray);
            let subPurchase = subPurchaseItem.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            })
            setPurchaseViewTotal(subPurchase);
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
                        <PurchaseName>{item.description}</PurchaseName>
                        <Amount>{item.amount}</Amount>
                        <Price>
                            {item.price.toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL'
                            })}
                        </Price>
                        <DeleteButton onPress={() => handleDeletePurchase(item.id, item.description)}>
                            <IconDelete name="trash-2" size={20} />
                        </DeleteButton>
                    </ListPurchaseTotal>
                )}
            />
            <FooterTotal>
                <TotalPurchases>Total: {purchaseViewTotal}</TotalPurchases>
            </FooterTotal>
        </Container>
    )
}
