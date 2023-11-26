import React from 'react';
import {Text, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import { styles } from '../styles/styles';

interface Props {
    onPress: any,
    title: string
}

export default function CustomButton(props: any) {
    const {onPress, title = 'Save', width, color="#ddd"} = props;
    return (
        <Pressable style={[styles.button, {width: width, backgroundColor:color}]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </Pressable>
    );
}

