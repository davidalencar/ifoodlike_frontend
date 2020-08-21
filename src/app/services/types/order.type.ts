import { AddressType } from './address.type';

export class OrderType {
    paymMethod: string;
    instruction: string;
    userName: string;
    userPhone: string;
    address: AddressType;

    constructor() {
        this.address = new AddressType();
    }
}