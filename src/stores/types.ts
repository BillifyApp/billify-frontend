export type Group = {
    _id: string;
    name: string;
    owner: string;
    users: string[];
    icon: string;
    date_created: Date;
    receipts: string[];
}