import React from 'react';
import {Text, View} from "react-native";

interface ReceiptItemEntry {
    count: number;
    quantity: any;
    itemName: string;
    unitPrice: any;
}

function ReceiptItemEntry({count, quantity, itemName, unitPrice}: ReceiptItemEntry) {
    return (
        <View>
            <Text>{`${count}.`}</Text>
            <Text>{itemName}</Text>
            <Text>{quantity}</Text>
            <Text>{`${unitPrice} €`}</Text>
        </View>
    );
}

export default ReceiptItemEntry;