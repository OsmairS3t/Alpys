import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import { HightLightCard } from '../../components/HightLightCard';
import { TransactionCard } from '../../components/TransactionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { keyTransaction } from '../../utils/keyStorage';

import {
    LoadContainer,
    Container,
    Header,
    LogoTipo,
    HightLightCards,
    Content,
    Title,
    TextMessageEmpty
} from './styles';

const logotipo = '../../assets/logo_alpys.png';
import { ITransactionProps, IHightLightProps, ITransactionViewProps } from '../../utils/transactions';

export function Listing() {
    const [isLoading, setIsloading] = useState(true);
    const [highlightData, setHighlightData] = useState<IHightLightProps>({} as IHightLightProps);
    const [objTransactions, setObjTransactions] = useState<ITransactionViewProps[]>([]);
    const theme = useTheme();

    function getLastTransactionDate(collection: ITransactionProps[], modality: 'buy' | 'sell') {
        const collectionFilttered = collection.filter(
            transaction => transaction.modality === modality);

        if (collectionFilttered.length === 0) {
            return 0;
        }

        const lastTransaction = new Date(
            new Date(Math.max.apply(Math, collectionFilttered
                .map(transaction => new Date(transaction.datetransaction).getTime()))))

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`;
    }

    async function loadTransactions() {
        const response = await AsyncStorage.getItem(keyTransaction);
        const transactions:ITransactionProps[] = response ? JSON.parse(response) : [];
       
        let sellTotal = 0;
        let buyTotal = 0;

        const transactionsFormatted:ITransactionViewProps[] = transactions
            .map((item: ITransactionProps) => {

                if (item.modality === 'sell') {
                    sellTotal += item.price;
                } else {
                    buyTotal += item.price
                }

                const price = item.price
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });

                const dateStr = Intl.DateTimeFormat('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                }).format(new Date(item.datetransaction));

                return {
                    id: item.id,
                    description: item.description,
                    modality: item.modality,
                    modalityicon: item.modalityicon,
                    price,
                    datetransaction: dateStr,
                    amount: item.amount,
                    ispaid: item.ispaid
                }
            });

            setObjTransactions(transactionsFormatted);

        const lastTransactionSell = getLastTransactionDate(transactions, 'sell')
        const lastTransactionBuy = getLastTransactionDate(transactions, 'buy');
        const totalInterval = lastTransactionBuy === 0
            ? 'Não há compras'
            : `01 a ${lastTransactionBuy}`;

        const total = sellTotal - buyTotal;

        setHighlightData({
            sells: {
                price: sellTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionSell === 0
                    ? 'Não há vendas'
                    : `Última venda dia ${lastTransactionSell}`,
            },
            buys: {
                price: buyTotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: lastTransactionBuy === 0
                    ? 'Não há compras'
                    : `Última compra dia ${lastTransactionBuy}`,
            },
            total: {
                price: total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: totalInterval
            }
        });
        setIsloading(false);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>
            {isLoading ?
                <LoadContainer>
                    <ActivityIndicator
                        color={theme.colors.secondary}
                        size="large"
                    />
                </LoadContainer> :
                <>
                    <Header>
                        <LogoTipo width={207} source={require(logotipo)} />
                    </Header>
                    <HightLightCards>
                        <HightLightCard
                            modality="sell"
                            title="Vendas"
                            price={highlightData.sells.price}
                            lastTransaction={highlightData.sells.lastTransaction}
                        />
                        <HightLightCard
                            modality="buy"
                            title="Compras"
                            price={highlightData.buys.price}
                            lastTransaction={highlightData.buys.lastTransaction}
                        />
                        <HightLightCard
                            modality="total"
                            title="Saldo"
                            price={highlightData.total.price}
                            lastTransaction={highlightData.total.lastTransaction}
                        />
                    </HightLightCards>
                    <Content>
                        <Title>Listagem:</Title>
                        {objTransactions.length > 0 ?  
                            <FlatList
                                data={objTransactions}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) =>
                                    <TransactionCard data={item} />
                                }
                            />
                        :
                         <TextMessageEmpty>Não há compras ou vendas no momento</TextMessageEmpty>
                        }
                    </Content>
                </>
            }
        </Container>
    )
}
