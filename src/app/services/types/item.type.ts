export class ItemType {
    name: string; 
    description?: string;
    unit: string;
    price: number;
    qty?: number;
    constructor(){
        this.qty = 0;
    }
}