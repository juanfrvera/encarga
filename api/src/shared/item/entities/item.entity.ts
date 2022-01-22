export class Item {
    id: string;
    description?: string;
    name: string;
    price?: number;

    constructor(
        id: string, name: string, price?: number, description?: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
    }
}
