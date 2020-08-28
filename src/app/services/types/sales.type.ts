import { ProductType } from './product.type';

export class SalesType {
    status: string;
    deliveryOrder: number = 0;
    selected: boolean = false;
    salesId: string;
    store: string;
    time: Date;    
    cust: {
        address: {
            zipCode: string;
            street: string;
            number: string;
            district: string;
            city: string;
            state: string;
            complement: string;
        };
        phone: string;
        name: string;
        custId: string;
    };
    paymMethod: string;
    totalAmount: number;
    instruction: string;
    taxes: [{
        name: string
        value: number;
    }];
    lines: [{
        qty: number;
        productId: ProductType;
        product: string;
        amount: number;
        items: [{
            category: string;
            items: [{
                qty: number;
                item: string
            }]
        }]
    }]
}