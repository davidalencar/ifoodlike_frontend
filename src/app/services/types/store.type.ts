export class StoreType {
    name: string;
    title: string;
    logo: string;
    complement: string;
    shelfTitle: string;
    minimumOrderAmount?: number;
    phone: string;
    taxes:{name: string, value:number}[];
    categories:{name: string, enable: boolean, order: number}[];
    labels:{name: string, color: string}[];
    questions: {
        address: boolean;
        phone: boolean;
    };
    paym: {
        money: boolean;
        credit: boolean;
        transfer: {
            enable: boolean;
            bank: string;
            account: string;
            document: string;
        }
    };
    allowScheduleOrder: boolean;
    workday: {
        day: number;
        hours: {from: number, to: number}[];
    }[];
}