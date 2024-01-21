import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "./CustomText";
import { COLORS } from "../../styles/colors";

export default function CustomSliderToggle() {
    const [isActive, setIsActive] = useState(false);
    const toggleSwitch = () => {
        setIsActive(!isActive);
    };
    return (
        <TouchableOpacity onPress={toggleSwitch}>
            <View style={styles.container}>
                <View style={[styles.slider]}>
                    <View
                        style={[
                            styles.handle,
                            isActive ? styles.handleRight : styles.handleLeft,
                        ]}
                    >
                        <CustomText>
                            {isActive ? "Benutzerdefiniert" : "Gleichmäßig"}
                        </CustomText>
                    </View>
                    <View
                        style={[
                            styles.inactiveText,
                            isActive
                                ? styles.inactiveTextLeft
                                : styles.inactiveTextRight,
                        ]}
                    >
                        <CustomText>
                            {isActive ? "Gleichmäßig" : "Benutzerdefiniert"}
                        </CustomText>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    slider: {
        width: 300,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        backgroundColor: COLORS.gray_mid,
    },
    handle: {
        width: 150,
        height: 58,
        borderRadius: 30,
        backgroundColor: "white",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
        shadowColor: COLORS.gray_darker,
    },
    handleLeft: {
        left: 2,
    },
    handleRight: {
        right: 2,
    },
    inactiveText: {
        position: "absolute",
        color: COLORS.gray_darker,
        justifyContent: "center",
        alignItems: "center",
        width: 150,
    },
    inactiveTextLeft: {
        left: 2,
    },
    inactiveTextRight: {
        right: 2,
    },
});
