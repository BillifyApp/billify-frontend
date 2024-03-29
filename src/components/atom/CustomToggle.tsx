import React, {useState} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import CustomText from "./CustomText";
import {COLORS} from "../../styles/colors";
import { rh, rw } from "../../utils/responsiveDimenstions";

export default function CustomSliderToggle({update}: any) {
    const [isActive, setIsActive] = useState(false);
    const toggleSwitch = () => {
        setIsActive(!isActive);
        update();
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
        width: rw(90),
        height: rh(8),
        borderRadius: rh(4),
        justifyContent: "center",
        backgroundColor: COLORS.gray_mid,
    },
    handle: {
        width: rw(48),
        height: rh(8),
        borderRadius: rh(4),
        backgroundColor: "white",
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
        shadowColor: COLORS.gray_darker,
    },
    handleLeft: {
        left: 0,
    },
    handleRight: {
        right: 0,
    },
    inactiveText: {
        position: "absolute",
        color: COLORS.gray_darker,
        justifyContent: "center",
        alignItems: "center",
        width: rw(45),
    },
    inactiveTextLeft: {
        left: rw(2),
    },
    inactiveTextRight: {
        right: rw(2),
    },
});
