import {Button, Text, View} from "react-native";
import * as React from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import {homeNavName} from "../stores/route_names";
import CustomText from "../components/atom/CustomText";
import CustomButton from "../components/atom/CustomButton";
import { styles } from "../styles/styles";
import { rh } from "../utils/responsiveDimenstions";

// @ts-ignore
export default function SettingsScreen({navigation}) {
    return (
        <CustomSafeAreaView>
            <View style={{minHeight: rh(100)}}>
            <View style={styles.headingMargin}>
            <CustomText style={styles.h1}>Settings Screen</CustomText>
            
            </View>
            <CustomText style={[styles.h2, {paddingLeft: 20}]}>Coming soon...</CustomText>
            <CustomButton title="Home" onPress={() => navigation.navigate(homeNavName)}/>
            </View>
        </CustomSafeAreaView>
    )
}