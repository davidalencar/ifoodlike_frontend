import { ProductType } from './product.type';
import { CustomerType } from './customer.type';

export class SalesType {
    status: string;
    deliveryOrder: number = 0;
    selected: boolean = false;
    salesId: string;
    store: string;
    time: Date;    
    cust: CustomerType;
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