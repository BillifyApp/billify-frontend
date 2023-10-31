import {Button, Text, View} from "react-native";
import * as React from "react";
import CustomButton from "../components/CustomButton";
import {useAuth} from "../context/AuthContext";

// @ts-ignore
export default function HomeScreen({navigation}) {
    const {onLogout} = useAuth();

    const logout = async () => {
        const result = await onLogout!();
        if (result && result.error) {
            alert(result.msg);
        }
    };


    return (
        <View>
            <Text>Home Screen</Text>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings')}
            />
            <CustomButton
                title="Logout"
                onPress={logout}
            />
        </View>
    )
}