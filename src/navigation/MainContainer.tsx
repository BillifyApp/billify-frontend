// Doc for react nav  https://reactnavigation.org/docs/getting-started/
// Tut: https://www.youtube.com/watch?v=AnjyzruZ36E

import * as React from 'react';

import {NavigationContainer} from "@react-navigation/native";

//Screens
import SettingsScreen from "../screens/SettingsScreen";
import {createStackNavigator} from "@react-navigation/stack";
import BottomBarNavigation from "./BottomBarNavigation";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

function loggedIn() {
    let isLoggedIn: boolean = false
    if (!isLoggedIn) {
        return (
            <>
                <Stack.Navigator screenOptions={{headerShown: true}}>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                </Stack.Navigator>
            </>
        );
    } else {
        return (
            <>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen name="BottomBar" component={BottomBarNavigation}/>
                    <Stack.Screen name="Settings" component={SettingsScreen}/>
                </Stack.Navigator>
            </>
        );
    }

}

export default function MainContainer() {
    return (
        <NavigationContainer>
            {loggedIn()}
        </NavigationContainer>
    )
}