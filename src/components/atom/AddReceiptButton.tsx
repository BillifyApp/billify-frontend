import React from 'react';
import {Text, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import CustomText from './CustomText';

interface Props {
    onPress: any,
    title: string
}

export default function AddReceiptButton(props: any) {
    const {onPress, title = 'Save'} = props;
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <CustomText style={styles.text}>{title}</CustomText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: 70,
        height: 70,
        bottom: 15,
        right: 15,
        borderRadius: 50,
        backgroundColor: "#24AFFE"
    },
    text: {
        fontSize: 50,
        lineHeight: 69,
        fontFamily: 'Poppins-Light',
        color: 'white',
    },
});
