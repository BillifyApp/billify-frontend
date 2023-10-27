import {Button, Text, View} from "react-native";
import React from "react";

// @ts-ignore
export default function DiffScreen({navigation}) {
    return (
        <View>
            <Text>Diff Screen</Text>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )
}
