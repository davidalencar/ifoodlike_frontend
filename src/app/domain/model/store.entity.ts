export class store {
    name: string;
    complement: string;
    shelfTitle: string;
    unitTitle: string;
    productTitle: string;
    minimumOrderAmount?: number;
    phone: string;
    taxes:{name: string, value:number}[]
}