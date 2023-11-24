import React from 'react';
import {Text, View, StyleSheet} from "react-native";

interface ReceiptItemEntry {
    count: number;
    quantity: any;
    itemName: string;
    unitPrice: any;
    subtotal: any;
}

function ReceiptItemEntry({count, quantity, itemName, unitPrice, subtotal}: ReceiptItemEntry) {
    return (
        <View style={styles.container}>
            <Text >{`${count +1}.`}</Text>
            <Text style={styles.itemName}>{itemName}</Text>
            <Text >{`${subtotal} €`}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        paddingVertical: 20,
    },
    itemName: {
        textAlign: 'left',
        flex: 2,
        paddingLeft: 30,
    },
});
export default ReceiptItemEntry;