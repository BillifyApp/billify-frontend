import {Button, SafeAreaView, Text, View} from "react-native";
import * as React from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";

// @ts-ignore
export default function SettingsScreen({navigation}) {
    return (
        <CustomSafeAreaView>
            <Text>Search Screen</Text>
            <Button title="Home" onPress={() => navigation.navigate("Home")}/>
        </CustomSafeAreaView>
    )
}