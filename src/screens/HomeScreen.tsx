import {Button, Text, View} from "react-native";
import * as React from "react";

// @ts-ignore
export default function HomeScreen({navigation}) {
    return (
        <View>
            <Text>Home Screen</Text>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Diff')}
            />
        </View>
    )
}