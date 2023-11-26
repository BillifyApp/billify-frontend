export interface Group {
    _id: string;
    name: string;
    date_created: string;
    owner: string;
    users: [];
    receipts: [];
}