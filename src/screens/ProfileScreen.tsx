import {Button, SafeAreaView, Text, View} from "react-native";
import * as React from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import {settingsName} from "../stores/route_names";

// @ts-ignore
export default function ProfileScreen({navigation}) {
    return (
        <CustomSafeAreaView>
            <Text>Profile Screen</Text>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate(settingsName)}
            />
        </CustomSafeAreaView>
    )
}