import {Button, SafeAreaView, Text, StyleSheet, View} from "react-native";
import * as React from "react";
import CustomButton from "../components/CustomButton";
import {useAuth} from "../context/AuthContext";
import CustomSafeAreaView from "../components/CustomSafeAreaView";


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
        <CustomSafeAreaView>
            <Text>Home Screen</Text>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate('Settings')}
            />
            <CustomButton
                title="Logout"
                onPress={logout}
            />
            <CustomButton
                title="Upload Bill"
                onPress={() => {
                    navigation.navigate('Upload')
                }}/>
        </CustomSafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red'
    }
});