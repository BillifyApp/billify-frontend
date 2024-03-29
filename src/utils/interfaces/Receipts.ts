export interface Image {
    path: string;
    date_uploaded: string;
}

export interface Item {
    quantity: number;
    itemName: string;
    unitPrice: number;
    subtotal: number;
}

export interface Receipt {
    _id: string;
    user_id: string;
    image: Image;
    date_created: string;
    date_payed: string;
    comp_name: string;
    address: string;
    items: Array<Item>;
    total: number;
}