import {Button, Text} from "react-native";
import * as React from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import {homeNavName} from "../stores/route_names";

// @ts-ignore
export default function SettingsScreen({navigation}) {
    return (
        <CustomSafeAreaView>
            <Text>Settings Screen</Text>
            <Button title="Home" onPress={() => navigation.navigate(homeNavName)}/>
        </CustomSafeAreaView>
    )
}