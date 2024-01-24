import React from "react";
import { Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import { COLORS } from "../../styles/colors";
import { Icon } from "../../styles/fonts";
import { rh } from "../../utils/responsiveDimenstions";

interface Props {
    onPress: Function;
    name: string;
    style?: any;
}

export default function AddReceiptButton(props: Props) {
    const { onPress, name = "Save" } = props;
    return (
        <TouchableOpacity
            onPress={() => {
                onPress();
            }}
            style={[styles.button, props.style]}
        >
            <Icon name={name} color="white" size={25} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        width: rh(8),
        height: rh(8),
        borderRadius: rh(4),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: rh(2),
        right: rh(2),
    },
});
