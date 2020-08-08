export class ProductType {
    _id: string;
    name: string;
    description?: string;
    unit: string;
    price: number;
    category: string;
    enable: boolean;
    img?: string;
    qty?: number;
    
    constructor(){
        this.qty = 0;
    }
}