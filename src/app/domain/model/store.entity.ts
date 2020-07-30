export class store {
    name: string;
    complement: string;
    shelfTitle: string;
    unitTitle: string;
    productTitle: string;
    minimumOrderAmount?: number;
    taxes:{name: string, value:number}[]
}