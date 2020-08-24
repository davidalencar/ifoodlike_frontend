export class SalesType {
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
        name: string;
        custId: string;
    };
    paymMethod: string;
    totalAmount: number;
    instruction: string;
    taxes: [{
        name: {
            type: string;
            trim: true
        };
        value: {
            type: number
        }
    }];
    lines: [{
        qty: number;
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