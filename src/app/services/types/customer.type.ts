export class CustomerType {
    _id: string;
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
    stores: [{
        name: string,
        label: string
    }]
}