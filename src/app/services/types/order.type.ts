import { AddressType } from './address.type';

export class OrderType {
    paymMethod: string;
    instruction: string;
    userName: string;
    userPhone: string;
    address: AddressType;
    schedule?: {date: Date, period: string};    

    constructor() {
        this.address = new AddressType();
    }
}