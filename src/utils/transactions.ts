export interface ITransactionProps {
    id: string;
    description: string;
    modality: 'buy'|'sell';
    modalityicon: string;
    datetransaction: Date;
    amount: number;
    price: number;
    ispaid: boolean;
}

interface HighlightTypeProps {
    price: string;
    lastTransaction: string;
}
  
export interface IHightLightProps {
    buys: HighlightTypeProps;
    sells: HighlightTypeProps;
    total: HighlightTypeProps;
}
