import React from 'react';
import {Text, StyleSheet, Pressable, TouchableOpacity} from 'react-native';

interface Props {
    onPress: any,
    title: string
}

export default function AddReceiptButton(props: any) {
    const {onPress, title = 'Save'} = props;
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
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
        lineHeight: 58,
        fontWeight: "200",
        color: 'white',
    },
});
