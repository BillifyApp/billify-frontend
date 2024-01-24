import React from 'react';
import {View, StyleSheet} from "react-native";
import CustomText from './CustomText';
import { COLORS } from '../../styles/colors';
import { rh, rw } from '../../utils/responsiveDimenstions';
import CustomNumberText from './CustomNumberText';

interface ReceiptItemEntry {
    count: number;
    quantity: any;
    itemName: string;
    unitPrice: any;
    subtotal: any;
}

function ReceiptItemEntry({count, quantity, itemName, unitPrice, subtotal}: ReceiptItemEntry) {
    const numberFormatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      });
    return (
        <View style={styles.container}>
            <CustomText style={styles.textLight} >{`${count +1}.`}</CustomText>
            <View style={styles.itemName}>
                <CustomText>{itemName}</CustomText>
                <CustomText style={styles.textLight}> Menge: {quantity}</CustomText>
            </View>
            <View>
            <CustomNumberText style={styles.numbers} >{numberFormatter.format(subtotal)}</CustomNumberText>
            {quantity > 1 && <CustomNumberText style={[styles.textLight, styles.numbers]} >{numberFormatter.format(unitPrice)}</CustomNumberText>}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: rh(1),
    },
    itemName: {
        flex: 1,
        textAlign: 'left',
        paddingLeft: rw(8),
    },
    textLight: {
        color: COLORS.gray_dark,
    },
    numbers:{
        fontSize: 16,
        fontFamily: "Inter-Regular",
        textAlign: 'right'
    }
});
export default ReceiptItemEntry;