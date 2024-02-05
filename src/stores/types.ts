export type Group = {
    _id: string;
    name: string;
    owner: string;
    users: string[];
    icon: string;
    date_created: Date;
    receipts_group: Receipt_Group[];
    debts: [];
}

export interface Image {
    path: string;
    date_uploaded: string;
}

export type Receipt_Group = {
    _id: object;
    group_id: string;
    user_id: string;
    receipt_id: string;
    date_created: Date;
    sum: number;
    users: Array<UsersReceiptGroup>;
}

export interface UsersReceiptGroup {
    readonly id: string;
    readonly sum: number;
    readonly name?: string
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
    total: string;
    category_id?: string;
}

export interface ReceiptsGroup {
    _id: string;
    group_id: string;
    user_id: string;
    receipt_id: string;
    date_added: string;
    sum: number;
    users: [];
    is_debt?: boolean;
}