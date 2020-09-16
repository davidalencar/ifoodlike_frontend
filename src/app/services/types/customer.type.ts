import { RegisterInterface } from '../interfaces/register.interface';

export class CustomerType implements RegisterInterface {
    _id: string;
    changed: boolean = false;
    address: {
        zipCode: string;
        street: string;
        number: string;
        district: string;
        city: string;
        state: string;
        complement: string;
        lat?: number;
        lon?: number;
    };
    phone: string;
    name: string;
    custId: string;
    stores: [{
        name: string,
        label: string
    }]
}