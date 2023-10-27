// Doc for react nav  https://reactnavigation.org/docs/getting-started/
// Tut: https://www.youtube.com/watch?v=AnjyzruZ36E

import * as React from 'react';
import {Text, View} from "react-native";

import {NavigationContainer} from "@react-navigation/native";

//Screens
import SettingsScreen from "../screens/SettingsScreen";
import {createStackNavigator} from "@react-navigation/stack";
import BottomBarNavigation from "./BottomBarNavigation";

const Stack = createStackNavigator();


export default function MainContainer() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="BottomBar" component={BottomBarNavigation}></Stack.Screen>
                <Stack.Screen name="Settings" component={SettingsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}