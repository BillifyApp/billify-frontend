import {Button, Text, View} from "react-native";
import * as React from "react";

// @ts-ignore
export default function SettingsScreen({navigation}) {
    return (
        <View>
            <Text>Search Screen</Text>
            <Button title="Home" onPress={() => navigation.navigate("Home")}/>
        </View>
    )
}