import React from 'react';
import {View, StyleSheet} from "react-native";
import CustomText from './CustomText';

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
            <CustomText >{`${count +1}.`}</CustomText>
            <CustomText style={styles.itemName}>{itemName}</CustomText>
            <CustomText >{`${subtotal} €`}</CustomText>
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