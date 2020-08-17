export class StoreType {
    name: string;
    title: string;
    complement: string;
    shelfTitle: string;
    unitTitle: string;
    productTitle: string;
    minimumOrderAmount?: number;
    phone: string;
    taxes:{name: string, value:number}[];
    categories:{name: string, enable: boolean, order: number}[];
    questions: {
        address: boolean;
        phone: boolean;
    }
    paym: {
        money: boolean;
        credit: boolean;
        transfer: {
            enable: boolean;
            bank: string;
            account: string;
            document: string;
        }
    }

}