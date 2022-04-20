export interface ITransactions {
    id: string;
    description: string;
    type: 'up'|'down'|'total';
    modality: 'buy'|'sell';
    datetransaction: Date;
    amount: number;
    price: number;
    ispaid: boolean;
}