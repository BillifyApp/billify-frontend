import {Button, SafeAreaView, Text, View, Image} from "react-native";
import * as React from "react";
import { COLORS } from "../styles/colors";
import CustomText from "../components/atom/CustomText";
import CustomButton from "../components/atom/CustomButton";
import { styles } from "../styles/styles";

// @ts-ignore
export default function SearchScreen({navigation}) {
    return (
        <SafeAreaView>
            <View style={styles.headingMargin}>
            <CustomText style={styles.h1}>Coming soon...</CustomText>
            </View>
        </SafeAreaView>
    )
}