// Doc for react nav  https://reactnavigation.org/docs/getting-started/
// Tut: https://www.youtube.com/watch?v=AnjyzruZ36E

import * as React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useAuth} from "../context/AuthContext";
import {NavigationContainer} from "@react-navigation/native";
import BottomBarNavigation from "../navigation/BottomBarNavigation";
import {SafeAreaProvider} from "react-native-safe-area-context";

//Screens
import SettingsScreen from "../screens/SettingsScreen";
import LoginScreen from "../screens/Login&SignIn/LoginScreen";
import SignInScreen from "../screens/Login&SignIn/SignInScreen";
import LoginContainer from "../navigation/LoginContainer";
import UploadNavigator from "../navigation/UploadNavigator";
import UploadScreen from "../screens/UploadScreen";

const Stack = createNativeStackNavigator();

export default function MainContainer() {
    const {authState} = useAuth();
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {authState?.authenticated ? (
                    <>
                        <Stack.Navigator screenOptions={{headerShown: false}}>
                            <Stack.Screen name="BottomBar" component={BottomBarNavigation}/>
                            <Stack.Screen name="Settings" component={SettingsScreen}/>
                            <Stack.Screen name="Upload" component={UploadScreen}/>
                        </Stack.Navigator>
                    </>
                ) : (
                    <>
                        <LoginContainer/>
                    </>
                )}
            </NavigationContainer>
        </SafeAreaProvider>
    )
}