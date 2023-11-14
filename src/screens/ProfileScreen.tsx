import {Button, SafeAreaView, Text, View} from "react-native";
import * as React from "react";
import CustomSafeAreaView from "../components/CustomSafeAreaView";
import {settingsName} from "../stores/route_names";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../context/AuthContext";


// @ts-ignore
export default function ProfileScreen({navigation}) {
    const { onLogout } = useAuth();

const logout = async () => {
    const result = await onLogout!();
    if (result && result.error) {
      alert(result.msg);
    }
  };
    return (
        <CustomSafeAreaView>
            <Text>Profile Screen</Text>
            <Button
                title="Go to Settings"
                onPress={() => navigation.navigate(settingsName)}
            />
             <CustomButton title="Logout" onPress={logout} />
        </CustomSafeAreaView>
    )
}